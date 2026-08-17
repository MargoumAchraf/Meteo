class CurrentWeather {
  time: string;
  interval: number;
  temperature: number;
  windspeed: number;
  winddirection: number;
  is_day: number;
  weathercode: number;

  constructor(
    time: string,
    interval: number,
    temperature: number,
    windspeed: number,
    winddirection: number,
    is_day: number,
    weathercode: number
  ) {
    this.time = time;
    this.interval = interval;
    this.temperature = temperature;
    this.windspeed = windspeed;
    this.winddirection = winddirection;
    this.is_day = is_day;
    this.weathercode = weathercode;
  }
}