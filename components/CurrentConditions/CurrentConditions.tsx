import React from "react";
import { ScrollView, View, Text } from "react-native";
import { styles } from "./StyleCurrentConditions";
import { useCurrentWeather } from "@/services/forecast_hours";

type Props = {
    location: {
        latitude: number;
        longitude: number;
    } | null;
};

function getIcon(wind?: number) {
    if (wind !== undefined && wind > 25) return "💨";
    if (wind !== undefined && wind > 10) return "⛅";
    return "🌤️";
}

export default function CurrentConditions({ location }: Props) {
    const { hourlyWeather, loading, errorMsg } = useCurrentWeather(location);

    if (loading) return <Text style={styles.message}>Loading...</Text>;
    if (errorMsg) return <Text style={styles.message}>{errorMsg}</Text>;
    if (hourlyWeather.length === 0) return <Text style={styles.message}>No weather data</Text>;

    return (
        <View style={styles.section}>
            <Text style={styles.label}>Next 8 hours</Text>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.container}
            >
                {hourlyWeather.slice(0, 8).map((hour, index) => (
                    <View key={hour.time} style={styles.card}>
                        <Text style={styles.hourLabel}>
                            {index === 0 ? "NOW" : hour.time.split("T")[1]}
                        </Text>

                        <Text style={styles.icon}>{getIcon(hour.windspeed_10m)}</Text>

                        <Text style={styles.temp}>
                            {Math.round(hour.temperature_2m)}°
                        </Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}