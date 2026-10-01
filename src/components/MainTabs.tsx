import useThemeColors from "@/hooks/useThemeColors";
import Home from "@/pages/Home";
import Profile from "@/pages/Profil";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BlurView } from "expo-blur";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export type TabParamList = {
  HomeTab: undefined;
  ProfileTab: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const MainTabs = () => {
  const colors = useThemeColors();
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.buttonBg,
        tabBarInactiveTintColor: colors.textColorSub,
        tabBarStyle: {
          borderTopWidth: 0,
          justifyContent: "space-evenly",
          height: 56 + insets.bottom,
          paddingBottom: insets.bottom,
          paddingTop: 5,
        },
        animation: "shift",
        tabBarPosition: "bottom",
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={Home}
        options={{
          title: "Accueil",
          tabBarAccessibilityLabel: "Accueil",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={Profile}
        options={{
          title: "Profil",
          tabBarAccessibilityLabel: "Profil",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabs;
