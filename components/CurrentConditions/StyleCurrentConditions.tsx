import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    section: {
        marginTop: 8,
    },

    label: {
        marginLeft: 24,
        marginBottom: 8,
        fontSize: 11,
        letterSpacing: 1.5,
        color: "#94A3B8",
        fontFamily: "monospace",
        textTransform: "uppercase",
    },

    container: {
        paddingHorizontal: 24,
        gap: 8,
    },

    card: {
        width: 68,
        paddingVertical: 14,
        borderRadius: 16,
        backgroundColor: "rgba(255,255,255,0.06)",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.08)",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 8,
    },

    hourLabel: {
        fontSize: 10,
        letterSpacing: 0.5,
        color: "#94A3B8",
        fontFamily: "monospace",
        textTransform: "uppercase",
    },

    icon: {
        fontSize: 18,
    },

    temp: {
        fontSize: 15,
        fontWeight: "700",
        color: "#F8FAFC",
    },

    message: {
        color: "#F8FAFC",
        padding: 24,
        fontSize: 14,
    },
});