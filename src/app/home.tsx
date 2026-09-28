import Home from "@/pages/Home";
import { createNativeStackNavigator } from "expo-router/build/react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";


const Stack = createNativeStackNavigator();

export default function Index() {
  return (
    <SafeAreaView>
        <Stack.Navigator>
          <Stack.Screen name="welcome" component={Home}/>
        </Stack.Navigator>
    </SafeAreaView>
  );
}