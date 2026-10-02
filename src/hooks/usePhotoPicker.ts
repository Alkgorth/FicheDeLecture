import * as ImagePicker from "expo-image-picker";
import { Alert, Linking } from "react-native";

type Options = {
  title: string;
  camera: "front" | "back";
  aspect: [number, number];
  onPicked: (tempUri: string) => void;
};

export function usePhotoPicker({ title, camera, aspect, onPicked }: Options) {
  const handle = (result: ImagePicker.ImagePickerResult) => {
    if (!result.canceled) onPicked(result.assets[0].uri);
  };

  const ensureCameraPermission = async (): Promise<boolean> => {
    const current = await ImagePicker.getCameraPermissionsAsync();
    if (current.granted) return true;

    if (current.canAskAgain) {
      const asked = await ImagePicker.requestCameraPermissionsAsync();
      if (asked.granted) return true;
      if (asked.canAskAgain) return false;
    }

    Alert.alert(
      "Caméra désactivée",
      "Pour prendre une photo, autorisez l'accès à la caméra dans les réglages de votre téléphone.",
      [
        { text: "Annuler", style: "cancel" },
        { text: "Ouvrir les réglages", onPress: () => Linking.openSettings() },
      ],
    );
    return false;
  };

  const takePhoto = async () => {
    if (!(await ensureCameraPermission())) return;

    handle(
      await ImagePicker.launchCameraAsync({
        mediaTypes: ["images"],
        cameraType: camera === "front" ? ImagePicker.CameraType.front : ImagePicker.CameraType.back,
        allowsEditing: true,
        aspect,
        quality: 0.7,
      }),
    );
  };

  const pickFromLibrary = async () => {
    handle(
      await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect,
        quality: 0.7,
      }),
    );
  };

  const openMenu = () =>
    Alert.alert(title, undefined, [
      {
        text:
          camera === "front" ? "Prendre un selfie" : "Photographier le livre",
        onPress: takePhoto,
      },
      { text: "Choisir dans la galerie", onPress: pickFromLibrary },
      { text: "Annuler", style: "cancel" },
    ]);

  return { openMenu };
}
