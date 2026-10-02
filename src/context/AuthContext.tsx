import {
  deleteUser,
  loginUser,
  SessionUser,
  updateUser,
  uploadAvatar,
} from "@/service/userService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

const SESSION_KEY = "session";

type AuthContextType = {
  user: SessionUser | null; // null = personne n'est connecté
  loading: boolean; // true pendant qu'on relit la session au démarrage
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  deleteAccount: () => Promise<void>;
  updateProfile: (
    data: { pseudo?: string; email?: string; password?: string },
    newAvatarUri?: string,
  ) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Au lancement de l'app : y avait-il quelqu'un de connecté avant ?
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const stored = await AsyncStorage.getItem(SESSION_KEY);

        if (stored)
          setUser(JSON.parse(stored));
      } catch (error) {
        console.error("Erreur lors de la restauration de la session :", error);
      } finally {
        setLoading(false);
      }
    };
    restoreSession();
  }, []);

  const login = async (email: string, password: string) => {
    const sessionUser = await loginUser(email, password); // lance une erreur si invalide
    await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
    setUser(sessionUser);
  };

  const logout = async () => {
    await AsyncStorage.removeItem(SESSION_KEY);
    setUser(null);
  };

  const deleteAccount = async () => {
    if (!user) {
      throw new Error("Aucun utilisateur connecté");
    }
    await deleteUser(user.id);
    await logout();
  }

  const updateProfile = async (
    data: { pseudo?: string; email?: string; password?: string },
    newAvatarUri?: string,
  ) => {
    if (!user) {
      throw new Error("Aucun utilisateur connecté");
    }

    let updatedUser = await updateUser(user.id, data);
    if (newAvatarUri) {
      updatedUser = await uploadAvatar(updatedUser.id, newAvatarUri);
    }

    await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, logout, deleteAccount, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Raccourci pour utiliser le badge dans n'importe quelle page
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth doit être utilisé à l'intérieur d'un AuthProvider");
  }
  return context;
};