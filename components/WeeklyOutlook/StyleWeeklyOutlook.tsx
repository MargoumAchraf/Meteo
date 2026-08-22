import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    section: {
        marginTop: 24,
    },

    label: {
        marginLeft: 24,
        marginBottom: 4,
        fontSize: 11,
        letterSpacing: 1.5,
        color: "#94A3B8",
        fontFamily: "monospace",
        textTransform: "uppercase",
    },

    container: {
        paddingHorizontal: 24,
    },

    row: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "rgba(255,255,255,0.06)",
    },

    rowLast: {
        borderBottomWidth: 0,
    },

    day: {
        width: 70,
        fontSize: 15,
        fontWeight: "500",
        color: "#F8FAFC",
    },

    icon: {
        flex: 1,
        fontSize: 16,
        textAlign: "center",
    },

    temps: {
        flexDirection: "row",
        width: 80,
        justifyContent: "flex-end",
        gap: 12,
    },

    tempLow: {
        fontSize: 14,
        color: "#94A3B8",
        fontFamily: "monospace",
    },

    tempHigh: {
        fontSize: 14,
        fontWeight: "600",
        color: "#F8FAFC",
        fontFamily: "monospace",
    },

    message: {
        color: "#F8FAFC",
        padding: 24,
        fontSize: 14,
    },
});