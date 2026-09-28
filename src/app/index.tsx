import useThemeColors from "@/hooks/useThemeColors";
// import Home from "@/pages/Home";
import Login from "@/pages/Login";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// const Stack = createNativeStackNavigator();

export default function Index() {

  const colors = useThemeColors();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.mainBg }]}>
      <View >
        <Login/>
      </View>
    </SafeAreaView>
    // <NavigationContainer>
    //   <Stack.Navigator
    //     initialRouteName="Bienvenue"
    //     screenOptions={{
    //       headerStyle: { backgroundColor: colors.mainBg },
    //     }}
    //   >
    //     <Stack.Screen
    //       name="Connexion"
    //       component={Login}
    //       options={{ title: "Page de connexion" }}
    //     />
    //     <Stack.Screen
    //       name="Bienvenue"
    //       component={Home}
    //       options={{ title: "Accueil" }}
    //     />
    //   </Stack.Navigator>
    // </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:"center",
    alignContent:"center",
    alignItems:"center",
  },
});
