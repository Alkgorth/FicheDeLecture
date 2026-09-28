import { useColorScheme } from "react-native";
import { Colors } from "../uiThemes/Colors";

type Theme = "light" | "dark";

export default function useThemeColors() {
    const theme = (useColorScheme() ?? "light") as Theme;
    return Colors[theme];
}