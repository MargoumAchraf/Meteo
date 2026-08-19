// services/useCurrentWeather.tsx
import { useEffect, useState } from 'react';
import { CurrentWeather } from '@/models/CurrentWeather';

interface Location {
    latitude: number;
    longitude: number;
}

export default function useCurrentWeather(location: Location | null) {

  const [weather, setWeather] = useState<CurrentWeather | null>(null);
  const [weatherError, setWeatherError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!location) return;

    async function fetchWeather() {
      setLoading(true);
      setWeatherError(null);
      try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${location!.latitude}&longitude=${location!.longitude}&current=temperature_2m,relative_humidity_2m,precipitation,weathercode,windspeed_10m&timezone=auto`;
        const res = await fetch(url);

        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }
        const data = await res.json();

        const current: CurrentWeather = {
          temperature: data.current.temperature_2m,
          humidity: data.current.relative_humidity_2m,
          precipitation: data.current.precipitation,
          windspeed: data.current.windspeed_10m,
          weathercode: data.current.weathercode,
          time: data.current.time,
        };
        setWeather(current);
      } catch (err) {
        setWeatherError(
          err instanceof Error ? err.message : 'Could not fetch weather'
        );
      } finally {
        setLoading(false);
      }
    }

    fetchWeather();
  }, [location]);

  return {
    weather,
    loading,
    errorMsg: weatherError,
  };
}