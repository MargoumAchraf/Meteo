import React from "react";
import { Text, View } from "react-native";
import useCurrentWeather from "@/services/api";
import { styles } from "./StyleHeaderNav";

type Props = {
    city: string | null;
    region?: string | null;
    location: { latitude: number; longitude: number };
};

function getConditionText(windspeed?: number, precipitation?: number) {
    if (precipitation !== undefined && precipitation > 0.2) return "Rainy conditions";
    if (windspeed !== undefined && windspeed > 25) return "Windy, gusty conditions";
    if (windspeed !== undefined && windspeed > 10) return "Light breeze";
    return "Clear and calm";
}

export default function HeaderNav({ city, region, location }: Props) {
    const { weather, loading, errorMsg } = useCurrentWeather(location);

    if (loading) return <Text style={styles.message}>Loading...</Text>;
    if (errorMsg) return <Text style={styles.message}>{errorMsg}</Text>;

    return (
        <View style={styles.container}>
            <View pointerEvents="none" style={styles.arcOuter} />
            <View pointerEvents="none" style={styles.arcInner} />

            <View style={styles.row}>
                <View>
                    <Text style={styles.city}>{city}</Text>
                    {region ? <Text style={styles.region}>{region}</Text> : null}
                </View>
                <Text style={styles.time}>{weather?.time}</Text>
            </View>

            <View style={styles.current}>
                <Text style={styles.temperature}>
                    {Math.round(weather?.temperature ?? 0)}°
                </Text>

                <Text style={styles.description}>
                    {getConditionText(weather?.windspeed, weather?.precipitation)}
                </Text>

                <View style={styles.row2}>
                    <Text style={styles.detail}>💧 {weather?.humidity}% humidity</Text>
                    <Text style={styles.detail}>🌧 {weather?.precipitation} mm</Text>
                </View>
            </View>
        </View>
    );
}