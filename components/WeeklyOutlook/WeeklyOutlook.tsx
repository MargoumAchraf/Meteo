// WeeklyOutlookScroll.tsx
import React from "react";
import { ScrollView, View, Text } from "react-native";
import { styles } from "./StyleWeeklyOutlook";
import { useTenDaysCurrentWeather } from "@/services/weather10DaysApi";
import { getDayLabel } from "@/utils/dayLabel";

type Props = {
    location: { latitude: number; longitude: number } | null;
};

export default function WeeklyOutlookScroll({ location }: Props) {
    console.log(location);
    console.log(location);
    
    const { dailyWeather, loading, errorMsg } = useTenDaysCurrentWeather(location);
console.log(dailyWeather);

    if (loading) return <Text style={styles.message}>Loading...</Text>;
    if (errorMsg) return <Text style={styles.message}>{errorMsg}</Text>;
    if (!dailyWeather) return null;

    return (
        <View style={styles.container}>
            {dailyWeather.map((day) => (
                <View key={day.time} style={styles.card}>
                    <Text style={styles.day}>{getDayLabel(day.time)}</Text>
                    <Text style={styles.temp}>
                        {Math.round(day.temperature_2m_min)}° / {Math.round(day.temperature_2m_max)}°
                    </Text>
                    <Text style={styles.rain}>
                        {day.precipitation_probability_max}% rain
                    </Text>
                </View>
            ))}
       </View>
    );
}