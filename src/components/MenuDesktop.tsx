"use client";

import { useEffect, useState } from "react";
import { URUTAN_WALLPAPER, WALLPAPER } from "@/data/wallpaper";
import { useDesktop } from "./DesktopContext";
import ContextMenu, { type MenuItem } from "./explorer/ContextMenu";

// Klik kanan / tekan lama di elemen-elemen ini punya menu sendiri (atau menu bawaan browser)
const ABAIKAN =
    ".mica, a, button, input, textarea, select, nav, [role=option], [role=menu], [data-no-desktop-menu]";

const WAKTU_TEKAN_LAMA = 500;

const kosong = (e: EventTarget | null) => !(e as Element | null)?.closest?.(ABAIKAN);

/** Klik kanan (atau tekan lama di layar sentuh) di area desktop kosong membuka pilihan wallpaper. */
export default function MenuDesktop() {
    const { wallpaper, setWallpaper } = useDesktop();
    const [menu, setMenu] = useState<{ x: number; y: number } | null>(null);

    useEffect(() => {
        const onContext = (e: MouseEvent) => {
            if (e.defaultPrevented || !kosong(e.target)) return;
            e.preventDefault();
            setMenu({ x: e.clientX, y: e.clientY });
        };

        // Layar sentuh: tahan jari ±0,5 detik tanpa bergeser
        let timer: ReturnType<typeof setTimeout> | undefined;
        let awal: { x: number; y: number } | null = null;
        const batal = () => {
            clearTimeout(timer);
            timer = undefined;
            awal = null;
        };
        const onDown = (e: PointerEvent) => {
            if (e.pointerType !== "touch" || !kosong(e.target)) return;
            awal = { x: e.clientX, y: e.clientY };
            const { x, y } = awal;
            clearTimeout(timer);
            timer = setTimeout(() => setMenu({ x, y }), WAKTU_TEKAN_LAMA);
        };
        const onMove = (e: PointerEvent) => {
            if (awal && Math.hypot(e.clientX - awal.x, e.clientY - awal.y) > 10) batal();
        };

        document.addEventListener("contextmenu", onContext);
        document.addEventListener("pointerdown", onDown);
        document.addEventListener("pointermove", onMove);
        document.addEventListener("pointerup", batal);
        document.addEventListener("pointercancel", batal);
        return () => {
            batal();
            document.removeEventListener("contextmenu", onContext);
            document.removeEventListener("pointerdown", onDown);
            document.removeEventListener("pointermove", onMove);
            document.removeEventListener("pointerup", batal);
            document.removeEventListener("pointercancel", batal);
        };
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