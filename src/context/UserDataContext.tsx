import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import {
  deleteImage,
  getImageUri,
  loadUserData,
  saveImage,
  saveUserData,
  UserData,
} from "@/service/photoStorage";

type Ctx = {
  getAvatarUri: (pseudo?: string | null) => string | null;
  setAvatar: (pseudo: string, tempUri: string) => Promise<void>;
};

const UserDataContext = createContext<Ctx | null>(null);

export function UserDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<UserData>({ avatars: {} });

  useEffect(() => {
    loadUserData().then(setData);
  }, []);

  const getAvatarUri = (pseudo?: string | null) => {
    const file = pseudo ? data.avatars[pseudo] : undefined;
    return file ? getImageUri(file) : null;
  };

  const setAvatar = async (pseudo: string, tempUri: string) => {
    const newFile = await saveImage(tempUri, "avatar");
    deleteImage(data.avatars[pseudo]); // supprime l'ancienne photo
    const next = { ...data, avatars: { ...data.avatars, [pseudo]: newFile } };
    setData(next);
    saveUserData(next);
  };

  return (
    <UserDataContext.Provider value={{ getAvatarUri, setAvatar }}>
      {children}
    </UserDataContext.Provider>
  );
}

export const useUserData = () => {
  const ctx = useContext(UserDataContext);
  if (!ctx) throw new Error("useUserData doit être utilisé dans <UserDataProvider>");
  return ctx;
};