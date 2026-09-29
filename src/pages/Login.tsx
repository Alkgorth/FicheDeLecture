import useThemeColors from "@/hooks/useThemeColors";
import { Buttons } from "@/uiThemes/Buttons";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import Logo from "../assets/images/LogoLight.svg";
import { Inputs } from "../uiThemes/Input";
import { useNavigation} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>

const Login = () => {
  const navigation = useNavigation<NavigationProp>();
  const colors = useThemeColors();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Logo width={150} height={170} />
        <Text style={{ color: colors.textColorSub, fontSize: 16 }}>
          Votre journal de lecture social
        </Text>
      </View>
      <View style={styles.form}>
        <View style={styles.formContent}>
          <Text nativeID="email" style={{ color: colors.textColorSub }}>
            EMAIL
          </Text>
          <TextInput
            accessibilityLabel="input"
            accessibilityLabelledBy="email"
            placeholder="Entrez votre adresse email"
            placeholderTextColor={colors.textColorSub}
            defaultValue={""}
            style={Inputs}
          />
        </View>
        <View style={styles.formContent}>
          <Text nativeID="motDePasse" style={{ color: colors.textColorSub }}>
            MOT DE PASSE
          </Text>
          <View style={{ position: "relative", justifyContent: "center" }}>
            <TextInput
              accessibilityLabel="input"
              accessibilityLabelledBy="motDePasse"
              placeholder="Entrez votre mot de passe"
              placeholderTextColor={colors.textColorSub}
              secureTextEntry={!showPassword}
              style={Inputs}
            />
            <Pressable
              onPress={() => setShowPassword((prev) => !prev)}
              style={{position:"absolute", right:14, marginTop:10}}
              hitSlop={10}
              accessibilityRole="button"
              accessibilityLabel={
                showPassword
                  ? "Masquer le mot de passe"
                  : "Afficher le mot de passe"
              }
            >
              <Ionicons
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={20}
                color={colors.textColorSub}
              />
            </Pressable>
          </View>
        </View>
      </View>

      <View style={styles.buttonGroup}>
        <Pressable style={[Buttons, { backgroundColor: colors.buttonBg }]}
        onPress={() => navigation.navigate('HomePage')}
        >
          <Text style={styles.textBtnConnect}>Se Connecter</Text>
        </Pressable>
        <Pressable
          style={[Buttons, { borderColor: colors.buttonBg, borderWidth: 2 }]}
          onPress={() => navigation.navigate('RegisterPage')}
        >
          <Text style={styles.textBtnAccount}>Créer un compte</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    gap: 32,
    flex: 1,
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    gap: 12,
  },
  form: {
    gap: 14,
  },
  formContent: {
    marginHorizontal: 24,
  },
  buttonGroup: {
    gap: 12,
    marginHorizontal: 24,
  },
  textBtnConnect: {
    fontSize: 16,
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
  },
  textBtnAccount: {
    fontSize: 16,
    textAlign: "center",
    color: "#C2410C",
    fontWeight: "bold",
  },
});
