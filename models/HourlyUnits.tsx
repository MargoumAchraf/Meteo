export interface HourlyWeatherRaw {
    time: string;
    temperature_2m: number;
    weathercode: number;
    windspeed_10m: number;
}

export interface HourlyWeatherApiResponse {
    time: string[];
    temperature_2m: number[];
    weathercode: number[];
    windspeed_10m: number[];
}

export function mapHourlyWeather(
    raw: HourlyWeatherApiResponse
): HourlyWeatherRaw[] {

    return raw.time.map((time, i) => ({
        time: time,
        temperature_2m: raw.temperature_2m[i],
        weathercode: raw.weathercode[i],
        windspeed_10m: raw.windspeed_10m[i],
    }));
}