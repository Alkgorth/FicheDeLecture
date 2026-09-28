import Login from "@/pages/Login";
import { createNativeStackNavigator } from "expo-router/build/react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Stack = createNativeStackNavigator();

export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
        <Stack.Navigator>
          <Stack.Screen name='Bienvenue' component={Login}/>
        </Stack.Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
