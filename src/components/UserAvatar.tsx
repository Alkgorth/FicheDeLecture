import { images } from "@/data/images";
import useThemeColors from "@/hooks/useThemeColors";
import { API_ORIGIN } from "@/service/apiConfig";
import { SessionUser } from "@/service/userService";
import { Image, Text, View } from "react-native";

type Props = {
  user: SessionUser | null;
  size?: number;
  photoUri?: string | null; 
};

const UserAvatar = ({ user, size = 48, photoUri }: Props) => {
  const colors = useThemeColors();
  const label = `Avatar de ${user?.pseudo ?? "l'utilisateur"}`;
  const avatar = user?.avatar;

  // Cas 1 : photo personnelle hébergée par le serveur local
  if (avatar?.startsWith("/avatars/")) {
    return (
      <Image
        source={{ uri: `${API_ORIGIN}${avatar}` }}
        accessibilityRole="image"
        accessibilityLabel={label}
        style={{ width: size, height: size, borderRadius: size / 2 }}
      />
    );
  }

  // Cas 2 : avatar prédéfini connu (comptes de démonstration)
  const source = avatar ? images[avatar] : undefined;
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

  // Cas 3 : pas d'avatar (ex. un nouvel inscrit) → un rond avec l'initiale
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
