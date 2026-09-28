import { useColorScheme } from "react-native";
import { Colors } from "../uiThemes/Colors";

type Theme = "light";

export default function useThemeColors(){
  const theme = useColorScheme() as Theme;
  return Colors[theme];
}