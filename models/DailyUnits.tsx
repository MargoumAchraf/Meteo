class DailyUnits {
  time: string;
  temperature_2m_max: string;
  temperature_2m_min: string;
  precipitation_probability_max: string;

  constructor(
    time: string,
    temperature_2m_max: string,
    temperature_2m_min: string,
    precipitation_probability_max: string
  ) {
    this.time = time;
    this.temperature_2m_max = temperature_2m_max;
    this.temperature_2m_min = temperature_2m_min;
    this.precipitation_probability_max = precipitation_probability_max;
  }

  static fromJson(json: any): DailyUnits {
    return new DailyUnits(
      json.time,
      json.temperature_2m_max,
      json.temperature_2m_min,
      json.precipitation_probability_max
    );
  }
}