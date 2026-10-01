    //récupérer l'avatar de l'utilisateur
    //récupérer le nom de l'utilisateur
    //récupérer le rôle de l'utilisateur
    //récupérer les livres lus par l'utilisateur
    //récupérer les fiches créées par l'utilisateur
    //ajouter un bouton pour modifier les données personnelles, en ouvrant une modal

import {
    ActivityIndicator,
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import UserAvatar from "@/components/UserAvatar";
import { useAuth } from "@/context/AuthContext";
import type { SheetBook } from "@/types/SheetBook";
import { Colors } from "@/uiThemes/Colors";
import { Typography } from "@/uiThemes/Fonts";

// TODO : remplacer par les fiches de l'utilisateur (futur fichier JSON),
// filtrées sur l'identifiant de l'utilisateur connecté.
const userSheets: SheetBook[] = [];

export default function Profile() {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <SafeAreaView style={styles.centered}>
                <ActivityIndicator
                    size="large"
                    color={Colors.light.buttonBg}
                    accessibilityLabel="Chargement du profil"
                />
            </SafeAreaView>
        );
    }

    if (!user) {
        return (null);
    }

    const header = (
        <View style={styles.header}>
            <UserAvatar user={user} size={96} />
            <Text style={styles.name} accessibilityRole="header">
                {user.pseudo}
            </Text>

            <View style={styles.actions}>
                <Pressable
                    style={styles.primaryButton}
                    accessibilityRole="button"
                    onPress={() => {
                        // TODO : ouvrir la modale de mise à jour des données
                    }}
                >
                    <Text style={styles.primaryButtonText}>
                        Mettre à jour mes données
                    </Text>
                </Pressable>

                <Pressable
                    style={styles.secondaryButton}
                    accessibilityRole="button"
                    onPress={() => {
                        // TODO : demander une confirmation, puis supprimer le compte
                    }}
                >
                    <Text style={styles.secondaryButtonText}>
                        Supprimer mon compte
                    </Text>
                </Pressable>
            </View>

            <Text style={styles.sectionTitle} accessibilityRole="header">
                Mes fiches ({userSheets.length})
            </Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={userSheets}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    // TODO : remplacer par un composant carte compacte
                    <View style={styles.sheetItem}>
                        <Text style={Typography.subtitle}>{item.bookTitle}</Text>
                        <Text style={styles.sheetAuthor}>{item.author}</Text>
                    </View>
                )}
                ListHeaderComponent={header}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>
                        Vous n'avez pas encore créé de fiche.
                    </Text>
                }
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.mainBg,
    },

    centered: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.light.mainBg,
    },

    listContent: {
        padding: 16,
        gap: 12,
        paddingBottom: 24,
    },

    header: {
        alignItems: "center",
        gap: 12,
    },

    name: {
        ...Typography.title,
        color: Colors.light.textColor,
    },

    actions: {
        flexDirection: "row",
        alignSelf: "center",
        gap: 8,
        marginTop: 8,
    },

    primaryButton: {
        backgroundColor: Colors.light.buttonBg,
        borderRadius: 8,
        padding: 12,
        alignItems: "center",
    },

    primaryButtonText: {
        ...Typography.button,
        color: Colors.light.white,
    },

    // TODO : une couleur dédiée aux actions destructrices (rouge)
    secondaryButton: {
        borderWidth: 1,
        borderColor: Colors.light.buttonBg,
        borderRadius: 8,
        padding: 12,
        alignItems: "center",
    },

    secondaryButtonText: {
        ...Typography.button,
        color: Colors.light.buttonBg,
    },

    sectionTitle: {
        ...Typography.subtitle,
        color: Colors.light.textColor,
        alignSelf: "flex-start",
        marginTop: 16,
    },

    sheetItem: {
        backgroundColor: Colors.light.white,
        borderRadius: 12,
        padding: 16,
        gap: 4,
    },

    sheetAuthor: {
        ...Typography.caption,
        color: Colors.light.textColorSub,
    },

    emptyText: {
        ...Typography.body,
        color: Colors.light.textColorSub,
        textAlign: "center",
        marginTop: 24,
    },
});