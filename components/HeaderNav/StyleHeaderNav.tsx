import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 24,
        paddingTop: 20,
        paddingBottom: 16,
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },

    city: {
        fontSize: 20,
        fontStyle: "italic",
        fontWeight: "600",
        color: "#F8FAFC", // slate-50
    },

    time: {
        fontSize: 11,
        letterSpacing: 1,
        color: "#94A3B8", // slate-400
        fontFamily: "monospace",
    },

    temperature: {
        marginTop: 8,
        fontSize: 48,
        fontWeight: "700",
        color: "#F8FAFC",

    },

    windspeed: {
        marginTop: 2,
        fontSize: 12,
        color: "#94A3B8", // slate-400
        fontFamily: "monospace",
    },

    detail: {
        marginTop: 6,
        fontSize: 12,
        color: "#94A3B8", // slate-400
        fontFamily: "monospace",
    },

    message: {
        color: "#F8FAFC",
        padding: 24,
        fontSize: 14,
    },

    current: {
        alignItems: "center",

    }
});