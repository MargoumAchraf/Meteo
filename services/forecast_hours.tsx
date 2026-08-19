import { useEffect, useState } from 'react';

import {
    HourlyWeatherApiResponse,
    HourlyWeatherRaw,
    mapHourlyWeather,
} from '@/models/HourlyUnits';

interface ForecastHoursResult {
    hourlyWeather: HourlyWeatherRaw[];
    loading: boolean;
    errorMsg: string | null;
}

interface Location {
    latitude: number;
    longitude: number;
}

export function useCurrentWeather(
    location: Location | null
): ForecastHoursResult {

    const [hourlyWeather, setHourlyWeather] =
        useState<any[]>([]);

    const [weatherError, setWeatherError] =
        useState<string | null>(null);

    const [loading, setLoading] =
        useState(false);

    useEffect(() => {

        if (!location) {
            console.log("❌ No location");
            return;
        }

        console.log(
            "📍 Location changed:",
            location.latitude,
            location.longitude
        );

        async function fetchWeather() {

            try {

                setLoading(true);
                setWeatherError(null);

                const url =
                    `https://api.open-meteo.com/v1/forecast` +
                    `?latitude=${location!.latitude}` +
                    `&longitude=${location!.longitude}` +
                    `&hourly=temperature_2m,weathercode,windspeed_10m` +
                    `&timezone=auto` +
                    `&forecast_hours=11`;

                console.log("🌤 Fetching hourly weather...");
                console.log("URL:", url);

                const res = await fetch(url);

                console.log("STATUS:", res.status);

                if (!res.ok) {
                    throw new Error(
                        `Request failed with status ${res.status}`
                    );
                }

                const data: {
                    hourly: HourlyWeatherApiResponse;
                } = await res.json();

                console.log(
                    "API hourly:",
                    data.hourly
                );

                const hours = mapHourlyWeather(
                    data.hourly
                );

                console.log(
                    "✅ HOURS LENGTH:",
                    hours.length
                );

                console.log(
                    "✅ HOURS:",
                    hours
                );

                setHourlyWeather(hours);


                console.log("eeeeeeeeeeeeeeeeee",hourlyWeather);
                

            } catch (err) {

                console.error(
                    "❌ Weather error:",
                    err
                );

                setWeatherError(
                    err instanceof Error
                        ? err.message
                        : "Could not fetch weather"
                );

            } finally {

                setLoading(false);

            }
        }

        fetchWeather();

    }, [
       location?.latitude,
        location?.longitude
    ]);


   


    return {
        hourlyWeather,
        loading,
        errorMsg: weatherError,
    };
}