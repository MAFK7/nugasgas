"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { WALLPAPER, type WallpaperId } from "@/data/wallpaper";

export type WindowId = "profil" | "tugas" | "contact" | "sampah";

type DesktopState = {
    closed: WindowId[];
    close: (id: WindowId) => void;
    reopen: (id: WindowId) => void;
    wallpaper: WallpaperId;
    setWallpaper: (w: WallpaperId) => void;
};

const Ctx = createContext<DesktopState | null>(null);
const KUNCI_WALLPAPER = "nugas:wallpaper";

export function DesktopProvider({ children }: { children: ReactNode }) {
    // Recycle Bin tertutup sampai ikonnya diklik
    const [closed, setClosed] = useState<WindowId[]>(["sampah"]);
    const [wallpaper, setWp] = useState<WallpaperId>("aurora");

    const close = useCallback(
        (id: WindowId) => setClosed((c) => (c.includes(id) ? c : [...c, id])),
        [],
    );
    const reopen = useCallback((id: WindowId) => setClosed((c) => c.filter((x) => x !== id)), []);

    // Pilihan wallpaper dibaca setelah halaman aktif (supaya HTML server dan klien sama)
    useEffect(() => {
        const t = setTimeout(() => {
            try {
                const v = localStorage.getItem(KUNCI_WALLPAPER);
                if (v && v in WALLPAPER) setWp(v as WallpaperId);
            } catch { }
        }, 0);
        return () => clearTimeout(t);
    }, []);

    const setWallpaper = useCallback((w: WallpaperId) => {
        setWp(w);
        try {
            localStorage.setItem(KUNCI_WALLPAPER, w);
        } catch { }
    }, []);

    const value = useMemo(
        () => ({ closed, close, reopen, wallpaper, setWallpaper }),
        [closed, close, reopen, wallpaper, setWallpaper],
    );
    return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useDesktop() {
    const v = useContext(Ctx);
    if (!v) throw new Error("useDesktop harus dipakai di dalam DesktopProvider");
    return v;
}