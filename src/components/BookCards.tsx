import type { SheetBook } from "@/types/SheetBook";
import { Colors } from '@/uiThemes/Colors';
import { Image, StyleSheet, Text, View } from "react-native";

type BookCardProps = {
    book: SheetBook;
};

const images = {
    "assets/images/avatarsUsers/user1.png":
        require("../assets/images/avatarsUsers/user1.png"),
    "assets/images/avatarsUsers/user2.png":
        require("../assets/images/avatarsUsers/user2.png"),
    "assets/images/avatarsUsers/user3.png":
        require("../assets/images/avatarsUsers/user3.png"),
    "assets/images/avatarsUsers/user4.png":
        require("../assets/images/avatarsUsers/user4.png"),
    "assets/images/avatarsUsers/user5.png":
        require("../assets/images/avatarsUsers/user5.png"),

    "assets/images/coversBooks/harry-potter-a-lecole-des-sorciers1.png":
        require("../assets/images/coversBooks/harry-potter-a-lecole-des-sorciers1.png"),
    "assets/images/coversBooks/le-seigneur-des-anneaux.png":
        require("../assets/images/coversBooks/le-seigneur-des-anneaux.png"),
    "assets/images/coversBooks/1984.png":
        require("../assets/images/coversBooks/1984.png"),
    "assets/images/coversBooks/le-petit-prince.png":
        require("../assets/images/coversBooks/le-petit-prince.png"),
    "assets/images/coversBooks/Dune.png":
        require("../assets/images/coversBooks/Dune.png"),
    "assets/images/coversBooks/Orgueil-et-prejuges.png":
        require("../assets/images/coversBooks/Orgueil-et-prejuges.png"),

};

export default function BookCard({ book }: BookCardProps) {
    const avatar = images[book.userAvatar as keyof typeof images];
    const cover = images[book.bookImage as keyof typeof images];

    return (
        <View style={styles.card}>
            <View style={styles.userContainer}>
                <Image source={avatar} style={styles.avatar} />
                <Text style={styles.userName}>{book.userName}</Text>
                <Text style={styles.rating}>
                    {"★".repeat(book.rating)}
                    {"☆".repeat(5 - book.rating)}
                </Text>
            </View>

            <View style={styles.bookContainer}>
                <Image source={cover} style={styles.cover} />

                <View style={styles.bookDetails}>
                    <Text style={styles.bookTitle}>{book.bookTitle}</Text>
                    <Text style={styles.author}>{book.author}</Text>


                    <View style={styles.genres}>
                        {book.genres.map((genre) => (
                            <View key={genre} style={styles.genreBadge}>
                                <Text style={styles.genreText}>{genre}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </View>

            <Text style={styles.comment} numberOfLines={2}>
                {book.comment}
            </Text>
        </View>
    );

}

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.light.white,
        borderRadius: 12,
        padding: 16,
        gap: 12,
        elevation: 2,
    },

    userContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },

    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
    },

    userName: {
        fontSize: 14,
        fontWeight: "600",
    },

    bookContainer: {
        flexDirection: "row",
        gap: 12,
    },

    cover: {
        width: 100,
        height: 140,
        borderRadius: 6,
        resizeMode: "cover",
    },

    bookDetails: {
        flex: 1,
        gap: 6,
    },

    bookTitle: {
        fontSize: 16,
        fontWeight: "bold",
    },

    author: {
        fontSize: 14,
        color: Colors.light.textColorSub,
    },

    rating: {
        fontSize: 18,
        color: Colors.light.textStarNotation,
    },

    genres: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 6,
    },

    genreBadge: {
        backgroundColor: Colors.light.mainBg,
        borderRadius: 12,
        paddingHorizontal: 10,
        paddingVertical: 4,
    },

    genreText: {
        fontSize: 12,
        color: Colors.light.textColorSecondary,
    },

    comment: {
        fontSize: 13,
        lineHeight: 19,
        color: Colors.light.textColor,
    },

});