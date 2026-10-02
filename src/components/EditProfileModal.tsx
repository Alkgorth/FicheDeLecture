import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRef, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Image,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

import UserAvatar from "@/components/UserAvatar";
import { useAuth } from "@/context/AuthContext";
import useThemeColors from "@/hooks/useThemeColors";
import { SessionUser } from "@/service/userService";
import { Buttons } from "@/uiThemes/Buttons";
import { Colors } from "@/uiThemes/Colors";
import { Typography } from "@/uiThemes/Fonts";
import { Inputs } from "@/uiThemes/Input";

type EditProfileModalProps = {
    visible: boolean;
    onClose: () => void;
};

type Errors = {
    pseudo?: string;
    email?: string;
    password?: string;
    confirm?: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const errorColor = "#B91C1C";

export default function EditProfileModal({ visible, onClose }: EditProfileModalProps) {
    const { user } = useAuth();

    return (
        <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
            <View style={styles.overlay}>
                <View style={styles.dialog} accessibilityViewIsModal>
                    {/* La clé force un nouveau montage à chaque ouverture : le formulaire
                        repart toujours des données actuelles de l'utilisateur, sans effet. */}
                    {visible && user ? (
                        <EditProfileForm key={user.id} user={user} onClose={onClose} />
                    ) : null}
                </View>
            </View>
        </Modal>
    );
}

type EditProfileFormProps = {
    user: SessionUser;
    onClose: () => void;
};

function EditProfileForm({ user, onClose }: EditProfileFormProps) {
    const { updateProfile } = useAuth();
    const colors = useThemeColors();

    const [pseudo, setPseudo] = useState(user.pseudo);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [avatarUri, setAvatarUri] = useState<string | null>(null);
    const [errors, setErrors] = useState<Errors>({});
    const [loading, setLoading] = useState(false);

    const emailRef = useRef<TextInput>(null);
    const passwordRef = useRef<TextInput>(null);
    const confirmRef = useRef<TextInput>(null);

    const validate = (): boolean => {
        const e: Errors = {};
        if (!pseudo.trim()) e.pseudo = "Le pseudo est obligatoire.";
        if (!EMAIL_REGEX.test(email.trim())) e.email = "Entrez une adresse email valide.";
        if (password.length > 0) {
            if (password.length < 8) {
                e.password = "Le mot de passe doit contenir au moins 8 caractères.";
            }
            if (confirm !== password) {
                e.confirm = "Les mots de passe ne correspondent pas.";
            }
        }
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handlePickFromLibrary = async () => {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permission.granted) {
            Alert.alert("Permission requise", "L'accès à vos photos est nécessaire pour choisir un avatar.");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.7,
        });

        if (!result.canceled) {
            setAvatarUri(result.assets[0].uri);
        }
    };

    const handleTakePhoto = async () => {
        const permission = await ImagePicker.requestCameraPermissionsAsync();
        if (!permission.granted) {
            Alert.alert("Permission requise", "L'accès à votre caméra est nécessaire pour prendre une photo.");
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.7,
        });

        if (!result.canceled) {
            setAvatarUri(result.assets[0].uri);
        }
    };

    const handleSubmit = async () => {
        if (loading || !validate()) return;
        setLoading(true);

        try {
            await updateProfile(
                {
                    pseudo: pseudo.trim(),
                    email: email.trim(),
                    ...(password ? { password } : {}),
                },
                avatarUri ?? undefined,
            );
            onClose();
        } catch (err) {
            if (err instanceof Error && err.message === "EMAIL_EXISTS") {
                setErrors({ email: "Cette adresse email est déjà utilisée." });
                emailRef.current?.focus();
            } else {
                Alert.alert("Erreur", "La mise à jour a échoué. Veuillez réessayer.");
            }
        } finally {
            setLoading(false);
        }
    };

    const renderError = (message?: string) =>
        message ? (
            <Text accessibilityRole="alert" accessibilityLiveRegion="polite" style={[styles.error, { color: errorColor }]}>
                {message}
            </Text>
        ) : null;

    return (
        <KeyboardAwareScrollView
            keyboardShouldPersistTaps="handled"
            bottomOffset={24}
            contentContainerStyle={styles.form}
        >
            <Text style={styles.title} accessibilityRole="header">
                Mettre à jour mes données
            </Text>

            <View style={styles.avatarSection}>
                {avatarUri ? (
                    <Image source={{ uri: avatarUri }} style={styles.avatarPreview} />
                ) : (
                    <UserAvatar user={user} size={80} />
                )}

                <View style={styles.avatarButtons}>
                    <Pressable
                        style={styles.avatarButton}
                        accessibilityRole="button"
                        accessibilityLabel="Prendre une photo"
                        onPress={handleTakePhoto}
                    >
                        <Ionicons name="camera-outline" size={18} color={colors.buttonBg} />
                        <Text style={styles.avatarButtonText}>Prendre une photo</Text>
                    </Pressable>

                    <Pressable
                        style={styles.avatarButton}
                        accessibilityRole="button"
                        accessibilityLabel="Choisir une photo dans la galerie"
                        onPress={handlePickFromLibrary}
                    >
                        <Ionicons name="image-outline" size={18} color={colors.buttonBg} />
                        <Text style={styles.avatarButtonText}>Choisir dans la galerie</Text>
                    </Pressable>
                </View>
            </View>

            <View style={styles.field}>
                <Text style={{ color: colors.textColorSub }}>PSEUDO*</Text>
                <TextInput
                    accessibilityLabel="Votre pseudo"
                    value={pseudo}
                    onChangeText={setPseudo}
                    autoCapitalize="none"
                    returnKeyType="next"
                    onSubmitEditing={() => emailRef.current?.focus()}
                    style={[Inputs, errors.pseudo && { borderColor: errorColor }]}
                />
                {renderError(errors.pseudo)}
            </View>

            <View style={styles.field}>
                <Text style={{ color: colors.textColorSub }}>EMAIL*</Text>
                <TextInput
                    ref={emailRef}
                    accessibilityLabel="Votre adresse email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="next"
                    onSubmitEditing={() => passwordRef.current?.focus()}
                    style={[Inputs, errors.email && { borderColor: errorColor }]}
                />
                {renderError(errors.email)}
            </View>

            <View style={styles.field}>
                <Text style={{ color: colors.textColorSub }}>NOUVEAU MOT DE PASSE</Text>
                <TextInput
                    ref={passwordRef}
                    accessibilityLabel="Nouveau mot de passe, laisser vide pour ne pas le changer"
                    placeholder="Laisser vide pour ne pas le changer"
                    placeholderTextColor={colors.textColorSub}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    autoCapitalize="none"
                    returnKeyType="next"
                    onSubmitEditing={() => confirmRef.current?.focus()}
                    style={[Inputs, errors.password && { borderColor: errorColor }]}
                />
                {renderError(errors.password)}
            </View>

            <View style={styles.field}>
                <Text style={{ color: colors.textColorSub }}>CONFIRMER LE MOT DE PASSE</Text>
                <TextInput
                    ref={confirmRef}
                    accessibilityLabel="Confirmation du nouveau mot de passe"
                    value={confirm}
                    onChangeText={setConfirm}
                    secureTextEntry
                    autoCapitalize="none"
                    returnKeyType="done"
                    onSubmitEditing={handleSubmit}
                    style={[Inputs, errors.confirm && { borderColor: errorColor }]}
                />
                {renderError(errors.confirm)}
            </View>

            <View style={styles.buttons}>
                <Pressable
                    style={[styles.cancelButton, loading && styles.disabled]}
                    accessibilityRole="button"
                    onPress={onClose}
                    disabled={loading}
                >
                    <Text style={styles.cancelButtonText}>Annuler</Text>
                </Pressable>

                <Pressable
                    style={[Buttons.primary, styles.submitButton, loading && styles.disabled]}
                    accessibilityRole="button"
                    accessibilityLabel={loading ? "Enregistrement en cours" : "Enregistrer"}
                    accessibilityState={{ disabled: loading, busy: loading }}
                    onPress={handleSubmit}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color={Colors.light.white} />
                    ) : (
                        <Text style={styles.submitButtonText}>Enregistrer</Text>
                    )}
                </Pressable>
            </View>
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
    },

    dialog: {
        width: "100%",
        maxWidth: 420,
        maxHeight: "85%",
        backgroundColor: Colors.light.white,
        borderRadius: 12,
        padding: 20,
    },

    form: {
        gap: 12,
    },

    title: {
        ...Typography.subtitle,
        color: Colors.light.textColor,
    },

    avatarSection: {
        alignItems: "center",
        gap: 12,
    },

    avatarPreview: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },

    avatarButtons: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 8,
    },

    avatarButton: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Colors.light.buttonBg,
    },

    avatarButtonText: {
        ...Typography.caption,
        color: Colors.light.buttonBg,
    },

    field: {
        gap: 4,
    },

    error: {
        ...Typography.caption,
    },

    buttons: {
        flexDirection: "row",
        gap: 8,
        marginTop: 8,
    },

    cancelButton: {
        flex: 1,
        minHeight: 44,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.light.mainBg,
    },

    cancelButtonText: {
        ...Typography.button,
        color: Colors.light.textColor,
    },

    submitButton: {
        flex: 1,
        minHeight: 44,
        alignItems: "center",
        justifyContent: "center",
    },

    submitButtonText: {
        ...Typography.button,
        color: Colors.light.white,
    },

    disabled: {
        opacity: 0.6,
    },
});
