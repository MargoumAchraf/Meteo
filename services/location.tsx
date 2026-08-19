// services/location.tsx
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';

export default function useCurrentLocation() {
  const [location, setLocation] =
    useState<Location.LocationObjectCoords | null>(null);

  const [city, setCity] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getLocation() {
      try {
        const { status } =
          await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
          setErrorMsg('Permission denied');
          return;
        }

        const result = await Location.getCurrentPositionAsync({});

        setLocation(result.coords);

        const address = await Location.reverseGeocodeAsync({
          latitude: result.coords.latitude,
          longitude: result.coords.longitude,
        });

        setCity(address[0]?.city ?? null);
      } catch (error) {
        setErrorMsg('Could not get location');
      } finally {
        setLoading(false);
      }
    }

    getLocation();
  }, []);

  return {
    location,
    city,
    errorMsg,
    loading,
  };
}