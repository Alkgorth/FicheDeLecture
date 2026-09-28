import { Text, TextInput, View } from "react-native";
import {Inputs} from '../uiThemes/Input' 

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
          style={Inputs}
        />
        <Text nativeID="mot de passe">Mot de passe</Text>
        <TextInput
          accessibilityLabel="input"
          accessibilityLabelledBy="mot de passe"
          placeholder="Entrez votre mot de passe"
          secureTextEntry={true}
          style={Inputs}
        />
      </View>
    </View>
  );
};

export default Login;
