import { Text, View } from "react-native";
import LogoLight from "../assets/images/LogoLight.svg";

export default function HeaderTitle({ text}: { text: string}) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
      <LogoLight width={30} height={45} />
      <Text style={{ fontWeight: "bold", fontSize: 18 }}>{text}</Text>
    </View>
  );
}
