"use client";

import { useEffect, useState } from "react";
import { URUTAN_WALLPAPER, WALLPAPER } from "@/data/wallpaper";
import { useDesktop } from "./DesktopContext";
import ContextMenu, { type MenuItem } from "./explorer/ContextMenu";

// Klik kanan di elemen-elemen ini punya menu sendiri (atau menu bawaan browser)
const ABAIKAN =
    ".mica, a, button, input, textarea, select, nav, [role=option], [role=menu], [data-no-desktop-menu]";

/** Klik kanan di area desktop kosong membuka pilihan wallpaper. */
export default function MenuDesktop() {
    const { wallpaper, setWallpaper } = useDesktop();
    const [menu, setMenu] = useState<{ x: number; y: number } | null>(null);

    useEffect(() => {
        const onContext = (e: MouseEvent) => {
            if (e.defaultPrevented) return;
            if ((e.target as Element | null)?.closest?.(ABAIKAN)) return;
            e.preventDefault();
            setMenu({ x: e.clientX, y: e.clientY });
        };
        document.addEventListener("contextmenu", onContext);
        return () => document.removeEventListener("contextmenu", onContext);
    }, []);

    if (!menu) return null;

    const items: MenuItem[] = URUTAN_WALLPAPER.map((id) => ({
        label: `Wallpaper ${WALLPAPER[id].nama}`,
        aktif: id === wallpaper,
        onPilih: () => {
            setWallpaper(id);
            setMenu(null);
        },
    }));

    return <ContextMenu x={menu.x} y={menu.y} items={items} onTutup={() => setMenu(null)} />;
}