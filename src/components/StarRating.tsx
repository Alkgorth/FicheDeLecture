import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";

import { Colors } from "@/uiThemes/Colors";

const STARS = [1, 2, 3, 4, 5];
const STAR_SIZE = 16;

type StarRatingProps = {
    rating: number;
}

export default function StarRating({ rating }: StarRatingProps) {
    return (
        <View
            style={styles.container}
            accessible={true}
            accessibilityRole="image"
            accessibilityLabel={`Note : ${rating} sur ${STARS.length}`}
        >
            {STARS.map((starNumber) => (
                <Ionicons
                    key={starNumber}
                    name={starNumber <= rating ? "star" : "star-outline"}
                    size={STAR_SIZE}
                    color={Colors.light.textStarNotation}
                />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        gap: 2,
    },
});