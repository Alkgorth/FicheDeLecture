import Logo from "@/assets/images/LogoLight.svg";
import { useAuth } from "@/context/AuthContext";
import useThemeColors from "@/hooks/useThemeColors";
import { Buttons } from "@/uiThemes/Buttons";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useRef, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { RootStackParamList } from "../../App";
import { Inputs } from "../uiThemes/Input";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type Errors = {
  email?: string;
  password?: string;
  general?: string;
};

const Login = () => {
  const navigation = useNavigation<NavigationProp>();
  const colors = useThemeColors();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  const passwordRef = useRef<TextInput>(null);
  const errorColor = "#B91C1C";

  const validate = (): boolean => {
    const e: Errors = {};
    if (!email.trim()) e.email = "L'adresse email est obligatoire.";
    if (!password) e.password = "Le mot de passe est obligatoire.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleLogin = async () => {
    if (loading || !validate()) return;
    setLoading(true);
    try {
      await login(email, password);
      // reset : on efface l'historique pour que "retour" ne ramène pas au login
      navigation.reset({ index: 0, routes: [{ name: "HomePage" }] });
    } catch (err) {
      if (err instanceof Error && err.message === "INVALID_CREDENTIALS") {
        setErrors({ general: "Email ou mot de passe incorrect." });
      } else {
        setErrors({ general: "Une erreur est survenue. Veuillez réessayer." });
      }
    } finally {
      setLoading(false);
    }
  };

  const renderError = (message?: string) =>
    message ? (
      <Text
        accessibilityRole="alert"
        accessibilityLiveRegion="polite"
        style={[styles.error, { color: errorColor }]}
      >
        {message}
      </Text>
    ) : null;

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.header}>
        <Logo width={150} height={170} />
        <Text style={{ color: colors.textColorSub, fontSize: 16 }}>
          Votre journal de lecture social
        </Text>
      </View>
      <View style={styles.form}>
        {renderError(errors.general) && (
          <View style={styles.formContent}>{renderError(errors.general)}</View>
        )}
        {/* EMAIL */}
        <View style={styles.formContent}>
          <Text style={{ color: colors.textColorSub }}>EMAIL</Text>
          <TextInput
            accessibilityLabel="Adresse email"
            accessibilityHint="Entrez votre adresse email de connexion"
            placeholder="Entrez votre adresse email"
            placeholderTextColor={colors.textColorSub}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoComplete="email"
            textContentType="emailAddress"
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current?.focus()}
            style={[Inputs, errors.email && { borderColor: errorColor }]}
          />
          {renderError(errors.email)}
        </View>
        {/* MOT DE PASSE */}
        <View style={styles.formContent}>
          <Text style={{ color: colors.textColorSub }}>MOT DE PASSE</Text>
          <View style={styles.passwordWrapper}>
            <TextInput
              ref={passwordRef}
              accessibilityLabel="Mot de passe"
              accessibilityHint="Entrez votre mot de passe de connexion"
              placeholder="Entrez votre mot de passe"
              placeholderTextColor={colors.textColorSub}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoComplete="current-password"
              textContentType="password"
              autoCapitalize="none"
              returnKeyType="done"
              onSubmitEditing={handleLogin}
              style={[Inputs, errors.password && { borderColor: errorColor }]}
            />
            <Pressable
              onPress={() => setShowPassword((prev) => !prev)}
              style={styles.eye}
              hitSlop={12}
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
            {renderError(errors.password)}
          </View>
        </View>
      </View>

      <View style={styles.buttonGroup}>
        <Pressable
          style={Buttons.primary}
          onPress={() => navigation.navigate("HomePage")}
        >
          <Text style={styles.textBtnConnect}>Se Connecter</Text>
        </Pressable>
        <Pressable
          style={Buttons.secondary}
          onPress={() => navigation.navigate("RegisterPage")}
        >
          <Text style={styles.textBtnAccount}>Créer un compte</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    gap: 32,
    flexGrow: 1,
    maxWidth: 800,
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
  passwordWrapper: {
    position: "relative",
    justifyContent: "center",
  },
  eye: {
    position: "absolute",
    right: 14,
    marginTop: 10,
  },
  error: {
    marginTop: 4,
    fontSize: 13,
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
