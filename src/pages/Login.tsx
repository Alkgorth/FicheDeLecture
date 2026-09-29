import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Inputs } from "../uiThemes/Input";
// import { Button } from "expo-router/build/react-navigation";
import Logo from '../assets/images/LogoLight.svg'
import useThemeColors from "@/hooks/useThemeColors";
import { Buttons } from "@/uiThemes/Buttons";

// type Props={
//   navigation:any
// }

const Login = () => {
  
  const colors = useThemeColors();

  return (
    <View style={styles.container}>
      <Logo width={200} height={220} />
      <Text>Votre journal de lecture social</Text>
      <View>
        <Text nativeID="email">Email</Text>
        <TextInput
          accessibilityLabel="input"
          accessibilityLabelledBy="email"
          placeholder="Entrez votre adresse email"
          defaultValue={""}
          style={[Inputs, {borderColor:'#E7E5E4', borderWidth:1, borderRadius:12, color:'#A8A29E'}]}
        />
        <Text nativeID="mot de passe">Mot de passe</Text>
        <TextInput
          accessibilityLabel="input"
          accessibilityLabelledBy="mot de passe"
          placeholder="Entrez votre mot de passe"
          secureTextEntry={true}
          style={[Inputs, {borderColor:'#E7E5E4', borderWidth:1, borderRadius:12, color:'#A8A29E'}]}
        />
      </View>
      <View style={styles.buttons}>
        <Pressable style={[Buttons, {backgroundColor:colors.buttonBg}]}>
          <Text style={styles.textBtnConnect}>
            Se Connecter
          </Text>
        </Pressable>
        <Pressable style={[Buttons, {borderColor:colors.buttonBg, borderWidth:2}]}>
          <Text style={styles.textBtnAccount}>
            Créer un compte
          </Text>
        </Pressable>
        
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    gap: 32,
    justifyContent: "center",
  },
  buttons:{
    gap:16,
  },
  textBtnConnect:{
    fontSize:18,
    textAlign:"center",
    color:'#fff',
    fontWeight:'bold',
  },
  textBtnAccount:{
    fontSize:18,
    textAlign:"center",
    color:'#C2410C',
    fontWeight:'bold',
  }

});
