import { useEffect, useState } from 'react';
import {
    DailyWeatherApiResponse,
    DailyWeatherRaw,
    mapDailyWeather,
} from '@/models/DailyUnits';

interface TenDaysCurrentWeatherResult {
    dailyWeather: DailyWeatherRaw[];
    loading: boolean;
    errorMsg: string | null;
}

interface Location {
    latitude: number;
    longitude: number;
}

export function useTenDaysCurrentWeather(
    location: Location | null
): TenDaysCurrentWeatherResult {

    const [dailyWeather, setDailyWeather] = useState<any[]>([]);
    const [weatherError, setWeatherError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        if (!location) {
            return;
        }

        async function fetchWeather() {

            try {

                setLoading(true);
                setWeatherError(null);

                const toLocalDateString = (d: Date) => {
                    const year = d.getFullYear();
                    const month = String(d.getMonth() + 1).padStart(2, '0');
                    const day = String(d.getDate()).padStart(2, '0');

                    return `${year}-${month}-${day}`;
                };

                const startDate = toLocalDateString(new Date());

                const endDateObj = new Date();
                endDateObj.setDate(endDateObj.getDate() + 10);

                const endDate = toLocalDateString(endDateObj);

                console.log('Start date:', startDate);
                console.log('End date:', endDate);

                const url =
                    `https://api.open-meteo.com/v1/forecast` +
                    `?latitude=${location!.latitude}` +
                    `&longitude=${location!.longitude}` +
                    `&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max` +
                    `&timezone=auto` +
                    `&start_date=${startDate}` +
                    `&end_date=${endDate}`;

                console.log('Fetching weather...');

                const res = await fetch(url);

                if (!res.ok) {
                    throw new Error(
                        `Request failed with status ${res.status}`
                    );
                }

                const data: {
                    daily: DailyWeatherApiResponse;
                } = await res.json();

                console.log('API data:', data);

                const days = mapDailyWeather(data.daily);

                console.log('days:', days);

                setDailyWeather(days);
                console.log(dailyWeather);
                
            } catch (err) {

                console.error('Weather error:', err);

                setWeatherError(
                    err instanceof Error
                        ? err.message
                        : 'Could not fetch weather'
                );

            } finally {

                setLoading(false);
            }
        }

        fetchWeather();

    }, [location?.latitude, location?.longitude]);


    // This is the correct place to observe the updated state



    return {
        dailyWeather,
        loading,
        errorMsg: weatherError,
    };
}