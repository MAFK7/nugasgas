"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { WALLPAPER } from "@/data/wallpaper";
import { useDesktop } from "./DesktopContext";

export default function Wallpaper() {
    const ref = useRef<HTMLDivElement>(null);
    const { wallpaper } = useDesktop();
    const layers = WALLPAPER[wallpaper].layers;

    // Parallax mouse ringan (hanya untuk mouse, dimatikan jika reduced motion)
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        if (!window.matchMedia("(pointer: fine)").matches) return;

        const onMove = (e: MouseEvent) => {
            el.style.setProperty("--mx", (e.clientX / window.innerWidth - 0.5).toFixed(3));
            el.style.setProperty("--my", (e.clientY / window.innerHeight - 0.5).toFixed(3));
        };
        window.addEventListener("mousemove", onMove, { passive: true });
        return () => window.removeEventListener("mousemove", onMove);
    }, []);

    return (
        <div ref={ref} className="wallpaper" aria-hidden="true">
            {/* key: ganti wallpaper = lapisan dibuat ulang dan memudar masuk */}
            <div key={wallpaper} className="wp-fade" data-wallpaper={wallpaper}>
                {layers.map((layer, i) => (
                    <div key={i} className="wp-layer" style={{ "--depth": layer.depth } as CSSProperties}>
                        {layer.bands.map((b, j) => (
                            <div
                                key={j}
                                className="wp-band"
                                style={
                                    {
                                        left: `${b.left}%`,
                                        top: `${b.top}%`,
                                        width: `${b.w}%`,
                                        height: `${b.h}%`,
                                        "--c": b.color,
                                        "--rot": `${b.rot}deg`,
                                        "--dx": b.dx,
                                        "--dy": b.dy,
                                        "--dur": `${b.dur}s`,
                                        "--blur": `${layer.blur}px`,
                                    } as CSSProperties
                                }
                            />
                        ))}
                    </div>
                ))}
            </div>
            <div className="wp-vignette" />
            <div className="wp-grain" />
        </div>
    );
}