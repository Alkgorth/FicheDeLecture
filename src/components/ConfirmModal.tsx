import {
    ActivityIndicator,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

import { Colors } from "@/uiThemes/Colors";
import { Typography } from "@/uiThemes/Fonts";

type ConfirmModalProps = {
    visible: boolean;
    title: string;
    message: string;
    confirmLabel: string;
    cancelLabel?: string;
    loading?: boolean;
    errorMessage?: string | null;
    onConfirm: () => void;
    onCancel: () => void;
};

export default function ConfirmModal({
    visible,
    title,
    message,
    confirmLabel,
    cancelLabel = "Non, annuler",
    loading = false,
    errorMessage = null,
    onConfirm,
    onCancel,
}: ConfirmModalProps) {
    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={onCancel}
        >
            <View style={styles.overlay}>
                <View style={styles.dialog} accessibilityViewIsModal={true}>
                    <Text style={styles.title} accessibilityRole="header">
                        {title}
                    </Text>
                    <Text style={styles.message}>{message}</Text>

                    {errorMessage ? (
                        <Text style={styles.error} accessibilityRole="alert">
                            {errorMessage}
                        </Text>
                    ) : null}

                    <View style={styles.buttons}>
                        <Pressable
                            style={[
                                styles.button,
                                styles.cancelButton,
                                loading && styles.disabled,
                            ]}
                            accessibilityRole="button"
                            onPress={onCancel}
                            disabled={loading}
                        >
                            <Text style={styles.cancelButtonText}>
                                {cancelLabel}
                            </Text>
                        </Pressable>

                        <Pressable
                            style={[
                                styles.button,
                                styles.confirmButton,
                                loading && styles.disabled,
                            ]}
                            accessibilityRole="button"
                            accessibilityLabel={loading ? "Action en cours" : confirmLabel}
                            accessibilityState={{ disabled: loading, busy: loading }}
                            onPress={onConfirm}
                            disabled={loading}
                        >
                            {loading ? (
                                <ActivityIndicator color={Colors.light.DANGER_COLOR} />
                            ) : (
                                <Text style={styles.confirmButtonText}>
                                    {confirmLabel}
                                </Text>
                            )}
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
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
        maxWidth: 400,
        backgroundColor: Colors.light.white,
        borderRadius: 12,
        padding: 20,
        gap: 12,
    },

    title: {
        ...Typography.subtitle,
        color: Colors.light.textColor,
    },

    message: {
        ...Typography.body,
        color: Colors.light.textColor,
    },

    error: {
        ...Typography.caption,
        color: Colors.light.DANGER_COLOR,
    },

    buttons: {
        flexDirection: "row",
        gap: 8,
        marginTop: 8,
    },

    button: {
        flex: 1,
        minHeight: 44,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
    },

    cancelButton: {
        backgroundColor: Colors.light.buttonBg,
    },

    cancelButtonText: {
        ...Typography.button,
        color: Colors.light.white,
        textAlign: "center",
    },

    confirmButton: {
        borderWidth: 1,
        borderColor: Colors.light.DANGER_COLOR,
    },

    confirmButtonText: {
        ...Typography.button,
        color: Colors.light.DANGER_COLOR,
        textAlign: "center",
    },

    disabled: {
        opacity: 0.6,
    },
});