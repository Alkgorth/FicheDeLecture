import { useState } from "react";
import { Text, TextInput, View } from "react-native";

const Login = () => {
    const [text, setText] = useState<string>('');
    return (
        <View>
            <TextInput
            placeholder="Entrez votre adresse email"
            defaultValue={text}
            />
            <Text>

            </Text>
        </View>
    )
}
 
export default Login ;