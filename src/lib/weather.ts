export type WeatherKind = "sun" | "partly" | "cloud" | "rain";
export type DayForecast = { date: string; code: number; max: number; min: number };
export type Weather = { temp: number; code: number; days: DayForecast[] };

const URL =
    "https://api.open-meteo.com/v1/forecast?latitude=-6.9175&longitude=107.6191" +
    "&current=temperature_2m,weather_code" +
    "&daily=weather_code,temperature_2m_max,temperature_2m_min" +
    "&timezone=Asia%2FBangkok&forecast_days=4";
const KEY = "nugas:weather";
const TTL = 15 * 60 * 1000; // cache 15 menit

export function describe(code: number): { label: string; kind: WeatherKind } {
    if (code === 0) return { label: "Cerah", kind: "sun" };
    if (code <= 2) return { label: "Cerah berawan", kind: "partly" };
    if (code === 3) return { label: "Berawan", kind: "cloud" };
    if (code === 45 || code === 48) return { label: "Berkabut", kind: "cloud" };
    if (code >= 51 && code <= 57) return { label: "Gerimis", kind: "rain" };
    if (code >= 61 && code <= 67) return { label: "Hujan", kind: "rain" };
    if (code >= 80 && code <= 82) return { label: "Hujan deras", kind: "rain" };
    if (code >= 95) return { label: "Hujan petir", kind: "rain" };
    return { label: "Berawan", kind: "cloud" };
}

export async function getWeather(): Promise<Weather> {
    try {
        const raw = localStorage.getItem(KEY);
        if (raw) {
            const { t, data } = JSON.parse(raw);
            if (Date.now() - t < TTL) return data as Weather;
        }
    } catch { }

    const res = await fetch(URL);
    if (!res.ok) throw new Error("weather");
    const j = await res.json();
    const data: Weather = {
        temp: Math.round(j.current.temperature_2m),
        code: j.current.weather_code,
        days: j.daily.time.map((d: string, i: number) => ({
            date: d,
            code: j.daily.weather_code[i],
            max: Math.round(j.daily.temperature_2m_max[i]),
            min: Math.round(j.daily.temperature_2m_min[i]),
        })),
    };
    try {
        localStorage.setItem(KEY, JSON.stringify({ t: Date.now(), data }));
    } catch { }
    return data;
}