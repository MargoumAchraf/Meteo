import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 12,
        paddingVertical: 20,
        gap: 12,
    },
 
    card: {
        width: 130,
        height: 130,
        borderRadius: 16,
        backgroundColor: "#1c2138",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.05)",
        padding: 14,
        alignItems: "center",
        justifyContent: "space-between",
    },
 
    day: {
        fontSize: 13,
        fontWeight: "600",
        color: "#F8FAFC",
    },
 
    temp: {
        fontSize: 14,
        color: "#F8FAFC",
    },
 
    rain: {
        fontSize: 11,
        color: "#94A3B8",
        fontFamily: "monospace",
    },
 
    message: {
        color: "#F8FAFC",
        padding: 24,
        fontSize: 14,
    },
});