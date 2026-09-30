import { images } from "@/data/images";
import type { SheetBook } from "@/types/SheetBook";
import { Colors } from '@/uiThemes/Colors';
import { Typography } from "@/uiThemes/Fonts";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import StarRating from "@/components/StarRating";
import { Inputs } from "@/uiThemes/Input";

type BookCardProps = {
    book: SheetBook;
};

export default function BookCard({ book }: BookCardProps) {
    const avatar = images[book.userAvatar];
    const cover = images[book.bookImage];

    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <View style={styles.userInfo}>
                    <Image
                        source={avatar}
                        style={styles.avatar}
                        accessible={false}
                    />
                    <Text
                        style={styles.userName}
                        numberOfLines={1}
                    >
                        {book.userName}
                    </Text>
                </View>
                <StarRating rating={book.rating} />
            </View>

            <View style={styles.bookContainer}>
                <Image
                    source={cover}
                    style={styles.cover}
                    resizeMode="cover"
                    accessibilityLabel={`Couverture de ${book.bookTitle}`}
                    accessible={true}
                />

                <View style={styles.bookDetails}>
                    <Text style={styles.bookTitle}>{book.bookTitle}</Text>
                    <Text style={styles.author}>
                        {book.author}
                    </Text>


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
                "{book.comment}"
            </Text>
            <Pressable
                onPress={() => { }}
                accessibilityRole="link"
                accessibilityLabel={`Voir plus sur sur l'avis de ${book.userName} sur ${book.bookTitle}`}
                hitSlop={10}
            >
                <Text style={styles.genreText}>Voir Plus</Text>
            </Pressable>
        </View>
    );

}

const styles = StyleSheet.create({
    card: {
        ...Inputs,
        backgroundColor: Colors.light.white,
        borderRadius: 12,
        padding: 16,
        gap: 12,
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 8,
    },

    userInfo: {
        flexDirection: "row",
        flexShrink: 1,
        alignItems: "center",
        gap: 8,
    },

    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
    },

    userName: {
        ...Typography.subtitle
    },

    bookContainer: {
        flexDirection: "row",
        gap: 12,
    },

    cover: {
        width: 100,
        height: 140,
        borderRadius: 6,
    },

    bookDetails: {
        flex: 1,
        gap: 6,
    },

    bookTitle: {
        ...Typography.title,
    },

    author: {
        ...Typography.caption,
        color: Colors.light.textColorSub,
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
        ...Typography.caption,
        color: Colors.light.textColorSecondary,
    },

    comment: {
        ...Typography.quote,
        color: Colors.light.textColor,
        borderLeftWidth: 3,
        borderLeftColor: Colors.light.buttonBg,
        paddingLeft: 16,
    },
});