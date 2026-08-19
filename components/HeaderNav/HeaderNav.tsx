import useCurrentWeather from "@/services/api";
import { Text, View } from "react-native";
import { styles } from "./StyleHeaderNav";

type Props = {
    city: string | null;
    location: { latitude: number; longitude: number };
};
export default function HeaderNav( { city ,location ,}: Props) {
    const { weather, loading, errorMsg } = useCurrentWeather(location);

    if (loading) return <Text style={styles.message}>Loading...</Text>;
    if (errorMsg) return <Text style={styles.message}>{errorMsg}</Text>;

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.city}>{city}</Text>
                <Text style={styles.time}>{weather?.time}</Text>
            </View>
            <View style={styles.current} >
                <Text style={styles.temperature}>{weather?.temperature}°C</Text>
                <Text style={styles.windspeed}>{weather?.windspeed} km/h wind</Text>
                <View style={styles.row}>
                    <Text style={styles.detail}>💧 {weather?.humidity}% humidity   </Text>
                    <Text style={styles.detail}>  🌧 {weather?.precipitation} mm</Text>
                </View>
            </View>
        </View>
    );
}