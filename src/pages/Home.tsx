import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

import BookCard from "@/components/BookCard";
import SearchingBooks from "@/components/SearchingBooks";
import UserAvatar from "@/components/UserAvatar";
import { useAuth } from "@/context/AuthContext";
import { BookData, searchBooks } from "@/data/bookData";
import { default as cardsHome, default as fiches } from "@/data/cardsHome.json";
import type { SheetBook } from "@/types/SheetBook";
import { Buttons } from "@/uiThemes/Buttons";
import { Colors } from "@/uiThemes/Colors";
import { Typography } from "@/uiThemes/Fonts";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useMemo, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "../../App";

const books: SheetBook[] = cardsHome;

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function Home() {
  const { user, logout } = useAuth();
  const navigation = useNavigation<NavigationProp>();
  const [query, setQuery] = useState("");
  const isSearching = query.trim().length > 0;

  const results = useMemo(
    () => (isSearching ? searchBooks(fiches as BookData[], query) : []),
    [query, isSearching],
  );

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
      <SearchingBooks value={query} onChangeText={setQuery} />
      {/* AFFICHAGE FICHE DE LECTURE */}
      <View style={styles.flatlist}>
        {isSearching ? (
          <FlatList
            data={results}
            keyExtractor={(item) => item.id}
            keyboardShouldPersistTaps="handled"
            renderItem={({ item }) => <BookCard book={item} />}
            ListEmptyComponent={
              <Text style={{ padding: 16, textAlign: "center" }}>
                Aucun résultat pour « {query} »
              </Text>
            }
          />
        ) : (
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
        )}
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
