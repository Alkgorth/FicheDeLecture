import { Text, TextInput, View } from "react-native";

const Login = () => {

  return (
    <View>
        
      <View>
        <Text nativeID="email">Email</Text>
        <TextInput
          accessibilityLabel="input"
          accessibilityLabelledBy="email"
          placeholder="Entrez votre adresse email"
          defaultValue={""}
        />
        <Text nativeID="mot de passe">Mot de passe</Text>
        <TextInput
          accessibilityLabel="input"
          accessibilityLabelledBy="mot de passe"
          placeholder="Entrez votre mot de passe"
          secureTextEntry={true}
        />
      </View>
    </View>
  );
};

export default Login;
