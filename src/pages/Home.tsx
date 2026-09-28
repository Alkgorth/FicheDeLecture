import { View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export default function Home() {
    return (
    <View style={styles.container}>
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.light.mainBg }} />
            <View>
                <Text>Home</Text>
            </View>
        </SafeAreaView>
    </View >
  );
}