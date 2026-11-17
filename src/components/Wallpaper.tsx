"use client";

import { useEffect, useRef, type CSSProperties } from "react";

type Band = {
    left: number; top: number; w: number; h: number;
    color: string; rot: number; dx: string; dy: string; dur: number;
};

const LAYERS: { depth: number; blur: number; bands: Band[] }[] = [
    {
        depth: 12,
        blur: 110,
        bands: [
            { left: -10, top: 4, w: 80, h: 40, color: "rgb(11 127 134 / .6)", rot: -16, dx: "6%", dy: "8%", dur: 80 },
            { left: 30, top: 50, w: 75, h: 40, color: "rgb(24 181 138 / .35)", rot: -20, dx: "-6%", dy: "-6%", dur: 95 },
        ],
    },
    {
        depth: 26,
        blur: 70,
        bands: [
            { left: -12, top: 58, w: 60, h: 20, color: "rgb(24 181 138 / .5)", rot: -14, dx: "8%", dy: "-10%", dur: 65 },
            { left: 50, top: 26, w: 50, h: 18, color: "rgb(184 242 58 / .3)", rot: -22, dx: "-8%", dy: "10%", dur: 75 },
        ],
    },
    {
        depth: 44,
        blur: 36,
        bands: [
            { left: 8, top: 20, w: 55, h: 6, color: "rgb(45 212 191 / .35)", rot: -19, dx: "5%", dy: "40%", dur: 55 },
            { left: 52, top: 66, w: 38, h: 5, color: "rgb(184 242 58 / .35)", rot: -21, dx: "-6%", dy: "-50%", dur: 60 },
        ],
    },
];

export default function Wallpaper() {
    const ref = useRef<HTMLDivElement>(null);

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
            {LAYERS.map((layer, i) => (
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
            <div className="wp-vignette" />
            <div className="wp-grain" />
        </div>
    );
}