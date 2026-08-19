export interface DailyWeatherRaw {
    time: string;
    temperature_2m_max: number;
    temperature_2m_min: number;
    precipitation_probability_max: number;
}

export interface DailyWeatherApiResponse {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_probability_max: number[];
}

// Converts the API's parallel-array response into DailyWeatherRaw[],
// one object per day, ready to .map() over in WeeklyOutlook
export function mapDailyWeather(
    raw: DailyWeatherApiResponse
): DailyWeatherRaw[] {

    return raw.time.map((date, i) => ({
        time: date,
        temperature_2m_max: raw.temperature_2m_max[i],
        temperature_2m_min: raw.temperature_2m_min[i],
        precipitation_probability_max:
            raw.precipitation_probability_max[i],
    }));
}