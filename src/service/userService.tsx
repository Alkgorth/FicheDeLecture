import { User } from "@/types/User";
import { API_BASE_URL } from "./apiConfig";

export type SessionUser = Omit<User, "password">;

export const loginUser = async (
  email: string,
  password: string,
): Promise<SessionUser> => {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email.trim(), password }),
  });

  if (!response.ok) {
    throw new Error("INVALID_CREDENTIALS");
  }

  return response.json();
};

// Ne jamais stocker un mot de passe en clair
// export const hashPassword = (password: string) =>
//   Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, password);

export const registerUser = async (data: {
  pseudo: string;
  email: string;
  password: string;
}): Promise<User> => {
  const response = await fetch(`${API_BASE_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (response.status === 409) {
    throw new Error("EMAIL_EXISTS");
  }
  if (!response.ok) {
    throw new Error("REGISTER_FAILED");
  }

  return response.json();
};

export const deleteUser = async (userId: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
    method: "DELETE",
  });

  if (response.status === 404) {
    throw new Error("USER_NOT_FOUND");
  }
  if (!response.ok) {
    throw new Error("DELETE_FAILED");
  }
};

export const updateUser = async (
  userId: number,
  data: { pseudo?: string; email?: string; password?: string },
): Promise<SessionUser> => {
  const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (response.status === 404) {
    throw new Error("USER_NOT_FOUND");
  }
  if (response.status === 409) {
    throw new Error("EMAIL_EXISTS");
  }
  if (!response.ok) {
    throw new Error("UPDATE_FAILED");
  }

  return response.json();
};

export const uploadAvatar = async (
  userId: number,
  fileUri: string,
): Promise<SessionUser> => {
  const fileName = fileUri.split("/").pop() ?? "avatar.jpg";
  const extension = fileName.split(".").pop()?.toLowerCase();
  const mimeType = extension === "png" ? "image/png" : extension === "webp" ? "image/webp" : "image/jpeg";

  const formData = new FormData();
  formData.append("avatar", {
    uri: fileUri,
    name: fileName,
    type: mimeType,
  } as unknown as Blob);

  const response = await fetch(`${API_BASE_URL}/users/${userId}/avatar`, {
    method: "POST",
    body: formData,
  });

  if (response.status === 404) {
    throw new Error("USER_NOT_FOUND");
  }
  if (!response.ok) {
    throw new Error("AVATAR_UPLOAD_FAILED");
  }

  return response.json();
};