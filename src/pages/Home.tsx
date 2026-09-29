import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import { Colors } from '@/uiThemes/Colors';
import { Typography } from '@/uiThemes/Fonts';
import { Inputs } from '@/uiThemes/Input';

import BookCard from "@/components/BookCards";
import cardsHome from "@/data/cardsHome.json";
import type { SheetBook } from "@/types/CardsHome";

export default function Home() {
    const books = cardsHome as SheetBook[];

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.logoImageContainer}>
                <View style={styles.logoContainer}>
                    <Image
                        accessibilityLabel="Logo de l'application"
                        style={styles.logoImage}
                        source={require("../assets/images/logo.jpg")}
                    />
                    <Text style={Typography.title}>Libri</Text>
                </View>
                <Image
                    accessibilityLabel="Avatar utilisateur"
                    style={styles.avatarImage}
                    source={require("../assets/images/avatar.jpg")}
                />
            </View>
            <View style={styles.searchContainer}>
                <Ionicons
                    name="search-outline"
                    size={20}
                    color="#6B6B6B"
                    accessibilityElementsHidden={true}
                    importantForAccessibility="no-hide-descendants"
                />
                <TextInput
                    style={[Typography.body, styles.searchInput]}
                    accessibilityLabel="Rechercher une œuvre"
                    placeholder="Rechercher des livres, auteurs, fiches…"
                />
            </View>

            <View>
                <FlatList
                    data={books}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <BookCard book={item} />
                    )}
                    ListHeaderComponent={
                        <Text>Dernières lectures de la communauté</Text>
                    }
                    contentContainerStyle={styles.listContent}
                    ListEmptyComponent={
                        <Text style={styles.emptyText}>
                            Aucune lecture à afficher.
                        </Text>
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
        width: '100%',
        maxWidth: 800,
        alignSelf: 'center',
        backgroundColor: Colors.light.mainBg,
        padding: 16,
    },

    logoImageContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },


    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
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
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: Colors.light.textBg,
        padding: 12,
        marginTop: 16,
    },

    searchInput: {
        flex: 1,
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