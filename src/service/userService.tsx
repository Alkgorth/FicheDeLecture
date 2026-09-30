import AsyncStorage from "@react-native-async-storage/async-storage";
import usersSeed from "../data/users.json";
import { User } from "@/types/User";

const STORAGE_KEY = "users";

// Le "badge" : l'utilisateur SANS son mot de passe
export type SessionUser = Omit<User, "password">;

const seedUsers = usersSeed.users as User[];

// Lit les utilisateurs. Au premier lancement, on initialise avec le JSON.
export const getUsers = async (): Promise<User[]> => {
  await AsyncStorage.removeItem("users")
  const stored = await AsyncStorage.getItem(STORAGE_KEY);
  if (stored) return JSON.parse(stored) as User[];

  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(seedUsers));
  return seedUsers;
};

export const loginUser = async (
  email: string,
  password: string,
): Promise<SessionUser> => {
  const users = await getUsers();

  const found = users.find(
    (u) =>
      u.email.toLowerCase() === email.trim().toLowerCase() &&
      u.password === password,
  );

  if (!found) throw new Error("INVALID_CREDENTIALS");

  // On retire le mot de passe : inutile (et risqué) de le garder en mémoire
  const { password: _password, ...sessionUser } = found;
  return sessionUser;
};

// Ne jamais stocker un mot de passe en clair
// export const hashPassword = (password: string) =>
//   Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, password);

export const registerUser = async (data: {
  pseudo: string;
  email: string;
  password: string;
}): Promise<User> => {
  const users = await getUsers();

  const emailTaken = users.some(
    (u) => u.email.toLowerCase() === data.email.toLowerCase(),
  );
  if (emailTaken) throw new Error("EMAIL_EXISTS");

  const newUser: User = {
    id: users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1,
    role:"user",
    pseudo: data.pseudo.trim(),
    email: data.email.trim().toLowerCase(),
    password: data.password,
    // await hashPassword(data.password),
  };

  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify([...users, newUser]));
  return newUser;
};