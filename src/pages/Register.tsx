import Logo from "@/assets/images/LogoLight.svg";
import useThemeColors from "@/hooks/useThemeColors";
import { registerUser } from "@/service/userService";
import { Buttons } from "@/uiThemes/Buttons";
import { Inputs } from "@/uiThemes/Input";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { RootStackParamList } from "../../App";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type Errors = {
  email?: string;
  password?: string;
  pseudo?: string;
  confirm?: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Register = () => {
  const navigation = useNavigation<NavigationProp>();
  const colors = useThemeColors();

  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const confirmRef = useRef<TextInput>(null);

  const errorColor = "#B91C1C";

  const validate = (): boolean => {
    const e: Errors = {};
    if (!pseudo.trim()) e.pseudo = "Le pseudo est obligatoire.";
    if (!EMAIL_REGEX.test(email.trim()))
      e.email = "Entrez une adresse email valide.";
    if (password.length < 8)
      e.password = "Le mot de passe doit contenir au moins 8 caractères.";
    if (confirm !== password)
      e.confirm = "Les mots de passe ne correspondent pas.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (loading || !validate()) return;
    setLoading(true);
    try {
      await registerUser({ email, password, pseudo });
      Alert.alert(
        "Inscription réussie",
        "Vous pouvez maintenant vous connecter.",
        [{ text: "OK", onPress: () => navigation.navigate("LoginPage") }],
      );
    } catch (err) {
      if (err instanceof Error && err.message === "EMAIL_EXISTS") {
        setErrors({ email: "Cette adresse email est déjà utilisée." });
        emailRef.current?.focus();
      } else {
        Alert.alert("Erreur", "Une erreur est survenue. Veuillez réessayer.");
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

  const renderToggle = (
    visible: boolean,
    toggle: () => void,
    label: string,
  ) => (
    <Pressable
      onPress={toggle}
      style={styles.eye}
      hitSlop={12}
      accessibilityRole="button"
      accessibilityLabel={visible ? `Masquer ${label}` : `Afficher ${label}`}
    >
      <Ionicons
        name={visible ? "eye-off-outline" : "eye-outline"}
        size={20}
        color={colors.textColorSub}
      />
    </Pressable>
  );

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
      bottomOffset={24}
    >
      <Logo width={100} height={120} style={{ alignSelf: "center" }} />
      <View style={styles.form}>
        {/* PSEUDO */}
        <View style={styles.formContent}>
          <Text
            nativeID="pseudo"
            style={{ color: colors.textColorSub, alignItems: "center" }}
          >
            VOTRE SURNOM*
          </Text>

          <TextInput
            accessibilityLabel="Votre surnom, obligatoire"
            accessibilityHint="Entrez le surnom qui sera affiché"
            placeholder="Entrez votre pseudo"
            placeholderTextColor={colors.textColorSub}
            value={pseudo}
            onChangeText={setPseudo}
            autoComplete="username"
            textContentType="username"
            autoCapitalize="none"
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current?.focus()}
            style={[Inputs, errors.pseudo && { borderColor: errorColor }]}
          />
          {renderError(errors.pseudo)}
        </View>
        {/* EMAIL */}
        <View style={styles.formContent}>
          <Text nativeID="email" style={{ color: colors.textColorSub }}>
            EMAIL*
          </Text>
          <TextInput
            ref={emailRef}
            accessibilityLabel="Adresse email, obligatoire"
            accessibilityHint="Entrez une adresse email valide"
            placeholder="Entrez une adresse email valide"
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
        {/* PASSWORD */}
        <View style={styles.formContent}>
          <Text nativeID="motDePasse" style={{ color: colors.textColorSub }}>
            MOT DE PASSE*
          </Text>
          <View style={{ position: "relative", justifyContent: "center" }}>
            <TextInput
              ref={passwordRef}
              accessibilityLabel="Mot de passe, obligatoire"
              accessibilityHint="Au moins 8 caractères"
              placeholder="Entrez votre mot de passe"
              placeholderTextColor={colors.textColorSub}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoComplete="new-password"
              textContentType="newPassword"
              autoCapitalize="none"
              returnKeyType="next"
              onSubmitEditing={() => confirmRef.current?.focus()}
              style={[Inputs, errors.password && { borderColor: errorColor }]}
            />
            {renderToggle(
              showPassword,
              () => setShowPassword((p) => !p),
              "le mot de passe",
            )}
          </View>
          {renderError(errors.password)}
        </View>
        {/* CONFIRM PASSWORD */}
        <View style={styles.formContent}>
          <Text nativeID="motDePasse" style={{ color: colors.textColorSub }}>
            CONFIRMER VOTRE MOT DE PASSE*
          </Text>
          <View style={{ position: "relative", justifyContent: "center" }}>
            <TextInput
              ref={confirmRef}
              accessibilityLabel="Confirmation du mot de passe, obligatoire"
              accessibilityHint="Saisissez à nouveau le même mot de passe"
              placeholder="Entrez à nouveau votre mot de passe"
              placeholderTextColor={colors.textColorSub}
              value={confirm}
              onChangeText={setConfirm}
              secureTextEntry={!showConfirm}
              autoComplete="new-password"
              textContentType="newPassword"
              autoCapitalize="none"
              returnKeyType="done"
              onSubmitEditing={handleSubmit}
              style={[Inputs, errors.confirm && { borderColor: errorColor }]}
            />
            {renderToggle(
              showConfirm,
              () => setShowConfirm((p) => !p),
              "la confirmation",
            )}
          </View>
          {renderError(errors.confirm)}
        </View>
      </View>

      <View style={styles.buttonGroup}>
        <Pressable
          style={[
            Buttons.primary,
            { backgroundColor: colors.buttonBg },
            loading && { opacity: 0.6 },
          ]}
          onPress={handleSubmit}
          disabled={loading}
          accessibilityRole="button"
          accessibilityLabel="Confirmer l'inscription"
          accessibilityState={{ disabled: loading, busy: loading }}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.textBtnConnect}>S'inscrire</Text>
          )}
        </Pressable>
        <Pressable
          style={[Buttons.secondary, loading && { opacity: 0.6 }]}
          onPress={() => navigation.navigate("LoginPage")}
        >
          <Text style={styles.textBtnAccount}>
            Déjà un compte? Se connecter
          </Text>
        </Pressable>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    gap: 32,
    flexGrow: 1,
    width: "100%",
    maxWidth: 800,
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 24,
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
    marginBottom: 80,
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
  error: {
    marginTop: 4,
    fontSize: 13,
  },
  eye: {
    position: "absolute",
    right: 14,
    marginTop: 10,
  },
});
