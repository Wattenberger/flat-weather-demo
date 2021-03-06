// Helper library written for useful postprocessing tasks with Flat Data
// Has helper functions for manipulating csv, txt, json, excel, zip, and image files
// You can test this script locally on your computer by runinng `deno run -A --unstable postprocess.ts data.json`
import { readJSON, writeJSON } from "https://deno.land/x/flat@0.0.15/mod.ts";

// Get the data filename as the first argument
const filename = Deno.args[0];
const data = await readJSON(filename);

// Postprocess steps

const weatherIcons = {
  "01d": "âī¸", // clear sky
  "02d": "đ¤", // few clouds
  "03d": "âī¸", // scattered clouds
  "04d": "âī¸", // broken clouds
  "09d": "đ§", // shower rain
  "10d": "đĻ", // rain
  "11d": "đŠī¸", //	thunderstorm
  "13d": "âī¸", //	snow
  "50d": "", //
} as Record<string, string>;

const processedData = data.list.map((day: Day) => {
  return {
    date: day.dt,
    icon: weatherIcons[day.weather[0].icon] || "",
    temp: day.temp.day,
    min: day.temp.min,
    max: day.temp.max,
    feelsLike: day.feels_like.day,
    pressure: day.pressure,
    humidity: day.humidity,
    windSpeed: day.speed,
    windDirection: day.deg,
    clouds: day.clouds,
    windGust: day.gust,
    sunrise: day.sunrise,
    sunset: day.sunset,
  };
});

await writeJSON(`data-processed.json`, processedData);

type Day = {
  dt: number;
  temp: {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
  };
  feels_like: {
    day: number;
    night: number;
    eve: number;
    morn: number;
  };
  pressure: number;
  humidity: number;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  speed: number;
  deg: number;
  clouds: number;
  pop: number;
  gust: number;
  sunrise: number;
  sunset: number;
};
