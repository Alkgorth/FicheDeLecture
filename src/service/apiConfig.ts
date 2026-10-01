import Constants from "expo-constants";

const API_PORT = 4000;

// Utilise l'hôte Metro d'Expo pour que l'app sur un appareil physique atteigne l'API locale
const resolveHost = (): string => {
  const hostUri = Constants.expoConfig?.hostUri;
  return hostUri ? hostUri.split(":")[0] : "localhost";
};

export const API_ORIGIN = `http://${resolveHost()}:${API_PORT}`;
export const API_BASE_URL = `${API_ORIGIN}/api`;
