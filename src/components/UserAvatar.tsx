import useThemeColors from "@/hooks/useThemeColors";
import { SessionUser } from "@/service/userService";
import { Image, ImageSourcePropType, Text, View } from "react-native";

// texte du JSON  →  image réelle
const avatars: Record<string, ImageSourcePropType> = {
  "assets/images/avatarsUsers/user1.png": require("@/assets/images/avatarsUsers/user1.png"),
  "assets/images/avatarsUsers/user2.png": require("@/assets/images/avatarsUsers/user2.png"),
  "assets/images/avatarsUsers/user3.png": require("@/assets/images/avatarsUsers/user3.png"),
  "assets/images/avatarsUsers/user4.png": require("@/assets/images/avatarsUsers/user4.png"),
};

type Props = {
  user: SessionUser | null;
  size?: number;
};

const UserAvatar = ({ user, size = 48 }: Props) => {
  const colors = useThemeColors();
  const label = `Avatar de ${user?.pseudo ?? "l'utilisateur"}`;
  const source = user?.avatar ? avatars[user.avatar] : undefined;

  // Cas 1 : l'utilisateur a un avatar connu
  if (source) {
    return (
      <Image
        source={source}
        accessibilityRole="image"
        accessibilityLabel={label}
        style={{ width: size, height: size, borderRadius: size / 2 }}
      />
    );
  }

  // Cas 2 : pas d'avatar (ex. un nouvel inscrit) → un rond avec l'initiale
  return (
    <View
      accessible
      accessibilityRole="image"
      accessibilityLabel={label}
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: colors.buttonBg,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ color: "#fff", fontWeight: "bold", fontSize: size * 0.4 }}>
        {user?.pseudo?.charAt(0).toUpperCase() ?? "?"}
      </Text>
    </View>
  );
};

export default UserAvatar;