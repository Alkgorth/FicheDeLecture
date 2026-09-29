import useThemeColors from "@/hooks/useThemeColors";
import { Buttons } from "@/uiThemes/Buttons";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import Logo from "../assets/images/LogoLight.svg";
import { Inputs } from "../uiThemes/Input";

const Login = () => {
  const colors = useThemeColors();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Logo width={150} height={170} />
        <Text style={{color: colors.textColorSub}}>Votre journal de lecture social</Text>
      </View>

      <View style={styles.formContent}>
        <Text nativeID="email">Email</Text>
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
        <Text nativeID="mot de passe">Mot de passe</Text>
        <TextInput
          accessibilityLabel="input"
          accessibilityLabelledBy="mot de passe"
          placeholder="Entrez votre mot de passe"
          placeholderTextColor={colors.textColorSub}
          secureTextEntry={true}
          style={Inputs}
        />
      </View>

      <View style={styles.buttonGroup}>
        <Pressable style={[Buttons, { backgroundColor: colors.buttonBg }]}>
          <Text style={styles.textBtnConnect}>Se Connecter</Text>
        </Pressable>
        <Pressable
          style={[Buttons, { borderColor: colors.buttonBg, borderWidth: 2 }]}
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
    gap: 16,
    justifyContent: "center",
    flex: 2,
  },
  header: {
    alignItems: "center",
    gap:12,
  },
  formContent: {
    marginHorizontal: 18,
    marginVertical: 12,
  },
  buttonGroup: {
    gap: 16,
    margin: 16,
  },
  textBtnConnect: {
    fontSize: 18,
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
  },
  textBtnAccount: {
    fontSize: 18,
    textAlign: "center",
    color: "#C2410C",
    fontWeight: "bold",
  },
});
