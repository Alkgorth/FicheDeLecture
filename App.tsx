import useThemeColors from "@/hooks/useThemeColors";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SplashScreen from "expo-splash-screen";
import { StyleSheet } from "react-native";

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

export default function App() {
  const colors = useThemeColors();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Connexion"
        screenOptions={{
          headerStyle: { backgroundColor: colors.mainBg },
        }}
      >
        <Stack.Screen
          name="Connexion"
          component={Login}
          options={{ title: "Page de connexion" }}
        />
        <Stack.Screen
          name="Bienvenue"
          component={Home}
          options={{ title: "Accueil" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
});

// export default function RootLayout() {

//   const [loaded, error] = useFonts({
//     Poppins_400Regular,
//     Poppins_500Medium,
//     Poppins_600SemiBold,
//     Poppins_700Bold
//   });

//   useEffect(() => {
//     if (loaded || error) {
//       SplashScreen.hideAsync();
//     }
//   }, [loaded, error]);

//   if (!loaded && !error) {
//     return null;
//   }
// }
