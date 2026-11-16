"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { scrollToSection, type SectionId } from "@/lib/scroll";
import { describe, getWeather, type Weather } from "@/lib/weather";
import { FolderIcon, MailIcon, WeatherIcon } from "./icons";
import CalendarFlyout from "./CalendarFlyout";
import WeatherFlyout from "./WeatherFlyout";

type Flyout = "weather" | "calendar" | null;
const SECTIONS: SectionId[] = ["home", "tugas", "contact"];
const pad = (n: number) => String(n).padStart(2, "0");

const itemCls =
    "relative flex h-9 items-center gap-1.5 rounded-lg px-2.5 text-[13px] transition-colors hover:bg-white/10 hover:text-text";

function Divider() {
    return <span className="mx-1 h-5 w-px bg-white/12" aria-hidden="true" />;
}

export default function Taskbar() {
    const [active, setActive] = useState<SectionId>("home");
    const [now, setNow] = useState<Date | null>(null);
    const [weather, setWeather] = useState<Weather | null>(null);
    const [flyout, setFlyout] = useState<Flyout>(null);
    const rootRef = useRef<HTMLDivElement>(null);

    // Jam live
    useEffect(() => {
        const tick = () => setNow(new Date());
        const t0 = setTimeout(tick, 0);
        const id = setInterval(tick, 1000);
        return () => {
            clearTimeout(t0);
            clearInterval(id);
        };
    }, []);

    // Cuaca (gagal = item disembunyikan)
    useEffect(() => {
        let alive = true;
        const load = () =>
            getWeather()
                .then((w) => alive && setWeather(w))
                .catch(() => { });
        load();
        const id = setInterval(load, 15 * 60 * 1000);
        return () => {
            alive = false;
            clearInterval(id);
        };
    }, []);

    // Item aktif mengikuti scroll
    useEffect(() => {
        let raf = 0;
        const update = () => {
            raf = 0;
            const atBottom =
                window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
            if (atBottom) {
                setActive("contact");
                return;
            }
            const mid = window.innerHeight * 0.4;
            let current: SectionId = "home";
            for (const id of SECTIONS) {
                const el = document.getElementById(id);
                if (el && el.getBoundingClientRect().top <= mid) current = id;
            }
            setActive(current);
        };
        const onScroll = () => {
            if (!raf) raf = requestAnimationFrame(update);
        };
        raf = requestAnimationFrame(update);
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, []);

    // Esc / klik di luar menutup flyout
    useEffect(() => {
        if (!flyout) return;
        const onDown = (e: PointerEvent) => {
            if (!rootRef.current?.contains(e.target as Node)) setFlyout(null);
        };
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setFlyout(null);
        };
        document.addEventListener("pointerdown", onDown);
        document.addEventListener("keydown", onKey);
        return () => {
            document.removeEventListener("pointerdown", onDown);
            document.removeEventListener("keydown", onKey);
        };
    }, [flyout]);

    const toggle = (f: Exclude<Flyout, null>) => setFlyout((cur) => (cur === f ? null : f));

    const navItem = (id: SectionId, label: string, icon?: ReactNode) => (
        <button
            key={id}
            type="button"
            onClick={() => {
                setFlyout(null);
                scrollToSection(id);
            }}
            aria-current={active === id ? "page" : undefined}
            className={`${itemCls} ${active === id ? "bg-white/[0.07] text-text" : "text-text-2"}`}
        >
            {icon}
            {label}
            {active === id && (
                <span className="absolute bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-aqua" />
            )}
        </button>
    );

    const time = now ? `${pad(now.getHours())}:${pad(now.getMinutes())}` : "00:00";
    const date = now ? now.toLocaleDateString("id-ID", { day: "numeric", month: "short" }) : "";

    return (
        <div className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex justify-center px-3 sm:bottom-6">
            <div ref={rootRef} className="pointer-events-auto relative">
                {flyout === "weather" && weather && <WeatherFlyout weather={weather} />}
                {flyout === "calendar" && now && <CalendarFlyout today={now} />}

                <nav aria-label="Taskbar" className="mica flex h-12 items-center rounded-full px-2">
                    {weather && (
                        <>
                            <button
                                type="button"
                                onClick={() => toggle("weather")}
                                aria-expanded={flyout === "weather"}
                                className={`${itemCls} text-text-2`}
                            >
                                <WeatherIcon kind={describe(weather.code).kind} className="h-4 w-4 text-lime" />
                                <span>
                                    {weather.temp}°C<span className="hidden sm:inline"> Bandung</span>
                                </span>
                            </button>
                            <Divider />
                        </>
                    )}

                    {navItem("home", "Home")}
                    {navItem("tugas", "Tugas", <FolderIcon className="h-4 w-4" />)}
                    {navItem("contact", "Contact", <MailIcon className="h-4 w-4" />)}

                    <Divider />

                    <button
                        type="button"
                        onClick={() => toggle("calendar")}
                        aria-expanded={flyout === "calendar"}
                        className={`${itemCls} text-text-2 ${now ? "" : "invisible"}`}
                    >
                        {time}
                        <span className="hidden sm:inline"> · {date}</span>
                    </button>
                </nav>
            </div>
        </div>
    );
}