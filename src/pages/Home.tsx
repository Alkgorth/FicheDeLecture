import {
    Image,
    Text,
    TextInput,
    View
} from "react-native";

export default function Home() {
    return (
        <View>
            <View>
                <View>
                    <Text>⌕</Text>
                    <TextInput
                        accessibilityLabel="Rechercher une ouevre"
                        placeholder="Search"
                        placeholderTextColor="#777777"
                    />
                </View>
            </View>
            <View>
                <Image
                    source={require("../assets/images/logo.jpg")}
                />
                <Text>Pokédex</Text>
            </View>
        </View>
    );
}