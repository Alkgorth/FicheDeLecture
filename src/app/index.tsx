import useThemeColors from "@/hooks/useThemeColors";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import { createNativeStackNavigator } from "expo-router/build/react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Stack = createNativeStackNavigator();

export default function Index() {
  const colors = useThemeColors();
  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors.mainBg}]}>
        <Stack.Navigator>
          <Stack.Screen name='Bienvenue' component={Login}/>
          <Stack.Screen name="Page d'Accueil" component={Home}/>
        </Stack.Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
  },

});
