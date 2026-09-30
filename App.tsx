import HeaderTitle from "@/components/HeaderTitle";
import { AuthProvider } from "@/context/AuthContext";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { Colors } from "@/uiThemes/Colors";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.light.mainBg, // fond de tous les écrans en mode light
  },
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export type RootStackParamList = {
  HomePage: undefined;
  LoginPage: undefined;
  RegisterPage: undefined;
};

export default function App() {
  return (
    <AuthProvider>
    <NavigationContainer theme={AppTheme}>
      <Stack.Navigator initialRouteName="LoginPage">
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
          options={{
            headerShown:false
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </AuthProvider>
  );
}