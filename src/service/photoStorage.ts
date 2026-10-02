import { Directory, File, Paths } from "expo-file-system";

const imagesDir = new Directory(Paths.document, "images");
const dataFile = new File(Paths.document, "userData.json");

// ---------- Images ----------
// Copie la photo temporaire dans le stockage permanent. Retourne seulement le NOM du fichier.
export async function saveImage(tempUri: string, prefix: string): Promise<string> {
  if (!imagesDir.exists) imagesDir.create();
  const name = `${prefix}-${Date.now()}.jpg`;
  await new File(tempUri).copy(new File(imagesDir, name));
  return name;
}

export const getImageUri = (name: string): string => new File(imagesDir, name).uri;

export function deleteImage(name?: string | null) {
  if (!name) return;
  const file = new File(imagesDir, name);
  if (file.exists) file.delete();
}

// ---------- JSON utilisateur ----------
export type UserData = { avatars: Record<string, string> };

const EMPTY: UserData = { avatars: {} };

export async function loadUserData(): Promise<UserData> {
  try {
    if (!dataFile.exists) return EMPTY;
    return { ...EMPTY, ...JSON.parse(await dataFile.text()) };
  } catch {
    return EMPTY;
  }
}

export function saveUserData(data: UserData) {
  if (!dataFile.exists) dataFile.create();
  dataFile.write(JSON.stringify(data));
}