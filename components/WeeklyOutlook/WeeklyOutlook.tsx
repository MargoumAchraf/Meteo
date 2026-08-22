import React from "react";
import { View, Text } from "react-native";
import { styles } from "./StyleWeeklyOutlook";
import { useTenDaysCurrentWeather } from "@/services/weather10DaysApi";
import { getDayLabel } from "@/utils/dayLabel";

type Props = {
    location: { latitude: number; longitude: number } | null;
};

function getIcon(precipProb?: number) {
    if (precipProb === undefined) return "⛅";
    if (precipProb >= 60) return "🌧️";
    if (precipProb >= 30) return "🌦️";
    if (precipProb > 0) return "⛅";
    return "☀️";
}

export default function WeeklyOutlookScroll({ location }: Props) {
    const { dailyWeather, loading, errorMsg } = useTenDaysCurrentWeather(location);

    if (loading) return <Text style={styles.message}>Loading...</Text>;
    if (errorMsg) return <Text style={styles.message}>{errorMsg}</Text>;
    if (!dailyWeather) return null;

    const days = dailyWeather.slice(0, 7);

    return (
        <View style={styles.section}>
            <Text style={styles.label}>7-Day Outlook</Text>

            <View style={styles.container}>
                {days.map((day, index) => (
                    <View
                        key={day.time}
                        style={[
                            styles.row,
                            index === days.length - 1 && styles.rowLast,
                        ]}
                    >
                        <Text style={styles.day}>{getDayLabel(day.time)}</Text>

                        <Text style={styles.icon}>
                            {getIcon(day.precipitation_probability_max)}
                        </Text>

                        <View style={styles.temps}>
                            <Text style={styles.tempLow}>
                                {Math.round(day.temperature_2m_min)}°
                            </Text>
                            <Text style={styles.tempHigh}>
                                {Math.round(day.temperature_2m_max)}°
                            </Text>
                        </View>
                    </View>
                ))}
            </View>
        </View>
    );
}