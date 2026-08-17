import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Button } from 'react-native';
import * as Location from 'expo-location';

export default function WeatherScreen() {
  const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null);
  const [city, setCity] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchLocation = async () => {
    setLoading(true);
    setErrorMsg(null);

    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      setLoading(false);
      return;
    }

    try {
      const loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      setLocation(loc.coords);

      // Reverse geocode → get city name
      const results = await Location.reverseGeocodeAsync({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });

      if (results.length > 0) {
        const place = results[0];
        setCity(place.city ?? place.subregion ?? place.region ?? 'Unknown location');
      }
    } catch (err) {
      setErrorMsg('Could not fetch location');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  if (loading) return <ActivityIndicator />;
  if (errorMsg)
    return (
      <View>
        <Text>{errorMsg}</Text>
        <Button title="Retry" onPress={fetchLocation} />
      </View>
    );

  return (
    <View>
      {city && <Text>City: {city}</Text>}
      {location && (
        <Text>
          Lat: {location.latitude.toFixed(4)}, Lon: {location.longitude.toFixed(4)}
        </Text>
      )}
    </View>
  );
}