import UserAvatar from "@/components/UserAvatar";
import { usePhotoPicker } from "@/hooks/usePhotoPicker";
import useThemeColors from "@/hooks/useThemeColors";
import { SessionUser } from "@/service/userService";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, View } from "react-native";

type Props = {
  user: SessionUser | null;
  photoUri: string | null;
  onChange: (tempUri: string) => void;
  size?: number;
};

const EditableAvatar = ({ user, photoUri, onChange, size = 120 }: Props) => {
  const colors = useThemeColors();
  const { openMenu } = usePhotoPicker({
    title: photoUri ? "Modifier ma photo" : "Ajouter ma photo",
    camera: "front",
    aspect: [1, 1],
    onPicked: onChange,
  });

  return (
    <Pressable
      onPress={openMenu}
      accessibilityRole="button"
      accessibilityLabel="Modifier la photo de profil"
      style={{ width: size, height: size }}
    >
      <UserAvatar user={user} size={size} photoUri={photoUri} />
      <View
        style={{
          position: "absolute",
          right: 0,
          bottom: 0,
          backgroundColor: colors.buttonBg,
          borderRadius: 14,
          padding: 6,
        }}
      >
        <Ionicons name="camera" size={16} color="#fff" />
      </View>
    </Pressable>
  );
};

export default EditableAvatar;