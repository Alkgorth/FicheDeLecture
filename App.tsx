import useThemeColors from "@/hooks/useThemeColors";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import { Colors } from "@/uiThemes/Colors";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SplashScreen from "expo-splash-screen";
import { StyleSheet } from "react-native";

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.light.mainBg, // fond de tous les écrans
    // primary: Colors.primary,
    // card: Colors.card,             // fond des headers / tab bars
    // text: Colors.text,
    // border: Colors.border,
  },
};

export default function App() {

  return (
    <NavigationContainer theme={AppTheme}>
      <Stack.Navigator
        initialRouteName="Connexion"
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
