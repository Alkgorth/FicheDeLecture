import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Buttons } from "@/uiThemes/Buttons";
import { Colors } from "@/uiThemes/Colors";
import { Typography } from "@/uiThemes/Fonts";
import { Inputs } from "@/uiThemes/Input";

import BookCard from "@/components/BookCard";
import UserAvatar from "@/components/UserAvatar";
import { useAuth } from "@/context/AuthContext";

import cardsHome from "@/data/cardsHome.json";

import type { SheetBook } from "@/types/SheetBook";

import { RootStackParamList } from "../../App";

const books: SheetBook[] = cardsHome;

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function Home() {
  const { user, logout } = useAuth();
  const navigation = useNavigation<NavigationProp>();

  const handleLogout = async () => {
    await logout();
    navigation.reset({ index: 0, routes: [{ name: "LoginPage" }] });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          <UserAvatar user={user} size={48} />
          <Text>Bonjour {user?.pseudo}</Text>
        </View>
        <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
          {/* Affichage conditionnel selon le rôle */}
          {user?.role === "admin" && (
            <Pressable
              style={Buttons.secondary}
              accessibilityRole="button"
              accessibilityLabel="Ouvrir l'espace administration"
            >
              <Text>
                <Ionicons
                  name="briefcase-outline"
                  size={18}
                  color={Colors.light.buttonBg}
                />
              </Text>
            </Pressable>
          )}
          <Pressable
            style={Buttons.primary}
            onPress={handleLogout}
            accessibilityRole="button"
            accessibilityLabel="Se déconnecter"
          >
            <Text>
              <Ionicons
                name="power-outline"
                size={18}
                color={Colors.light.textBg}
              />
            </Text>
          </Pressable>
        </View>
      </View>
      {/* SEARCHBAR */}
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
        />
      </View>
      <View style={styles.flatlist}>
        <FlatList
          data={books}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <BookCard book={item} />}
          ListHeaderComponent={
            <Text style={styles.titlePage}>
              Dernières lectures de la communauté
            </Text>
          }
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Aucune lecture à afficher.</Text>
          }
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    maxWidth: 800,
    alignSelf: "center",
    backgroundColor: Colors.light.mainBg,
    padding: 16,
  },

  logoImageContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  logoImage: {
    width: 47,
    height: 47,
  },

  avatarImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },

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

  flatlist: {
    flex: 1,
  },

  titlePage: {
    ...Typography.title,
    marginVertical: 16,
  },

  listContent: {
    gap: 16,
    paddingBottom: 24,
  },

  emptyText: {
    ...Typography.body,
    textAlign: "center",
    marginTop: 24,
  },
});
