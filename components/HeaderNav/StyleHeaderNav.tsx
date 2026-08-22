import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 16,
        overflow: "hidden",
    },

    arcOuter: {
        position: "absolute",
        top: -60,
        right: -60,
        width: 220,
        height: 220,
        borderRadius: 110,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.06)",
    },

    arcInner: {
        position: "absolute",
        top: -20,
        right: -20,
        width: 160,
        height: 160,
        borderRadius: 80,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.06)",
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },

    row2: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 16,
        marginTop: 8,
    },

    city: {
        fontSize: 20,
        fontStyle: "italic",
        fontFamily: "serif",
        fontWeight: "600",
        color: "#F8FAFC",
    },

    region: {
        marginTop: 2,
        fontSize: 11,
        letterSpacing: 1,
        color: "#94A3B8",
        fontFamily: "monospace",
        textTransform: "uppercase",
    },

    time: {
        fontSize: 11,
        letterSpacing: 1,
        color: "#94A3B8",
        fontFamily: "monospace",
        textAlign: "right",
    },

    current: {
        alignItems: "center",
        marginTop: 24,
    },

    temperature: {
        fontSize: 88,
        fontWeight: "800",
        fontFamily: "serif",
        color: "#F8FAFC",
    },

    description: {
        marginTop: 8,
        fontSize: 15,
        color: "#F8FAFC",
        textAlign: "center",
    },

    detail: {
        fontSize: 12,
        color: "#94A3B8",
        fontFamily: "monospace",
    },

    message: {
        color: "#F8FAFC",
        padding: 24,
        fontSize: 14,
    },
});