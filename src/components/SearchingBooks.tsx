// components/SearchBar.tsx
import { Colors } from "@/uiThemes/Colors";
import { Typography } from "@/uiThemes/Fonts";
import { Inputs } from "@/uiThemes/Input";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TextInput, View } from "react-native";

type Props = {
  value: string;
  onChangeText: (text: string) => void;
};

export default function SearchingBooks({ value, onChangeText }: Props) {
  return (
    <View style={styles.searchContainer}>
      <Ionicons
        name="search-outline"
        size={20}
        color={Colors.light.textColorSub}
        accessibilityElementsHidden={true}
        importantForAccessibility="no-hide-descendants"
      />
      <TextInput
        style={[Typography.body, styles.searchInput]}
        accessibilityLabel="Rechercher une œuvre"
        placeholderTextColor={Colors.light.textColorSub}
        placeholder="Rechercher des livres, auteurs, fiches…"
        value={value}
        onChangeText={onChangeText}
        returnKeyType="search"
        autoCorrect={false}
        autoCapitalize="none"
        clearButtonMode="while-editing"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    ...Inputs,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: Colors.light.textBg,
    marginTop: 16,
    marginBottom: 8,
  },

  searchInput: {
    flex: 1,
  },
});
