import { AuthProvider, useAuth } from "@/context/AuthContext";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { Colors } from "@/uiThemes/Colors";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { KeyboardProvider } from "react-native-keyboard-controller";

SplashScreen.preventAutoHideAsync();

const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.light.mainBg, // fond de tous les écrans en mode light
  },
};

export type RootStackParamList = {
  HomePage: undefined;
  LoginPage: undefined;
  RegisterPage: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppContent = () => {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      SplashScreen.hideAsync();
    }
  }, [loading]);

  if (loading) return null;

  return (
    <NavigationContainer theme={AppTheme}>
      <Stack.Navigator initialRouteName={user ? "HomePage" : "LoginPage"}>
        <Stack.Screen
          name="LoginPage"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomePage"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RegisterPage"
          component={Register}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <KeyboardProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </KeyboardProvider>
  );
}
