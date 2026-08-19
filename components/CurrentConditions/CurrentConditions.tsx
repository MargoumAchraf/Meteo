// WeeklyOutlookScroll.tsx
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

export default function CurrentConditions({ location }: Props) {

    const {
        hourlyWeather,
        loading,
        errorMsg,
    } = useCurrentWeather(location);

    console.log("location:", location);
    console.log("hourlyWeather:", hourlyWeather);

    if (loading) {
        return (
            <Text style={styles.message}>
                Loading...
            </Text>
        );
    }

    if (errorMsg) {
        return (
            <Text style={styles.message}>
                {errorMsg}
            </Text>
        );
    }

    if (hourlyWeather.length === 0) {
        return (
            <Text style={styles.message}>
                No weather data
            </Text>
        );
    }

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.container}
        >
            {hourlyWeather.map((hour) => (
                <View
                    key={hour.time}
                    style={styles.card}
                >
                    <Text style={styles.day}>
                          {hour.time.split("T")[1]}
                    </Text>

                    <Text style={styles.temp}>
                        {Math.round(hour.temperature_2m)}°
                    </Text>

                    <Text style={styles.rain}>
                        💨 {Math.round(hour.windspeed_10m)} km/h
                    </Text>

                    {/* <Text style={styles.rain}>
                        Weather code: {hour.weathercode}
                    </Text> */}
                </View>
            ))}
        </ScrollView>
    );
}