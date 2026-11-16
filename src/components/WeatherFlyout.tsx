import { describe, type Weather } from "@/lib/weather";
import { WeatherIcon } from "./icons";

const HARI = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

export default function WeatherFlyout({ weather }: { weather: Weather }) {
    const now = describe(weather.code);
    const today = weather.days[0];

    return (
        <div className="mica flyout absolute bottom-full left-0 mb-3 w-64 rounded-xl p-4 text-text">
            <p className="text-[13px] text-text-2">Bandung</p>
            <div className="mt-2 flex items-center gap-3">
                <WeatherIcon kind={now.kind} className="h-10 w-10 text-lime" />
                <div>
                    <p className="text-3xl font-semibold leading-none">{weather.temp}°C</p>
                    <p className="mt-1 text-[13px] text-text-2">
                        {now.label}
                        {today ? ` · ${today.min}° / ${today.max}°` : ""}
                    </p>
                </div>
            </div>

            <ul className="mt-4 space-y-2 border-t border-white/10 pt-3 text-[13px]">
                {weather.days.slice(1).map((d, i) => {
                    const info = describe(d.code);
                    const hari = i === 0 ? "Besok" : HARI[new Date(`${d.date}T00:00:00`).getDay()];
                    return (
                        <li key={d.date} className="flex items-center gap-2">
                            <span className="w-12">{hari}</span>
                            <WeatherIcon kind={info.kind} className="h-4 w-4 text-lime" />
                            <span className="flex-1 text-text-2">{info.label}</span>
                            <span>
                                {d.min}° / {d.max}°
                            </span>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}