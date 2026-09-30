import AsyncStorage from "@react-native-async-storage/async-storage";
import usersSeed from "./users.json";

export type User = {
  id: number;
  role: string;
  email: string;
  password: string;
  pseudo: string;
  avatar?: string;
};

const STORAGE_KEY = "users";

// Lit les utilisateurs. Au premier lancement, on initialise avec le JSON.
export const getUsers = async (): Promise<User[]> => {
  const stored = await AsyncStorage.getItem(STORAGE_KEY);
  if (stored) return JSON.parse(stored) as User[];

  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(usersSeed));
  return usersSeed.users as User[];
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
