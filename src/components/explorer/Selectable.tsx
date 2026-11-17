import { useRef, type ReactNode } from "react";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { keyOf, type Aksi, type Item } from "./types";

type Props = { item: Item; aksi: Aksi; className?: string; children: ReactNode };

/**
 * Pembungkus item yang bisa dipilih:
 * klik = pilih, klik dua kali = buka, klik kanan = menu,
 * di HP: tap = buka, tekan lama = menu.
 */
export default function Selectable({ item, aksi, className = "", children }: Props) {
    const sentuh = useMediaQuery("(pointer: coarse)");
    const key = keyOf(item);
    const terpilih = aksi.terpilih === key;

    const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
    const awal = useRef<{ x: number; y: number } | null>(null);
    const panjang = useRef(false);

    const batal = () => {
        clearTimeout(timer.current);
        timer.current = undefined;
        awal.current = null;
    };

    return (
        <div
            role="option"
            aria-selected={terpilih}
            data-key={key}
            title="Buka"
            onClick={(e) => {
                e.stopPropagation();
                if (panjang.current) {
                    panjang.current = false;
                    return;
                }
                if (sentuh) aksi.onBuka(item);
                else aksi.onPilih(key);
            }}
            onDoubleClick={() => {
                if (!sentuh) aksi.onBuka(item);
            }}
            onContextMenu={(e) => {
                e.preventDefault();
                e.stopPropagation();
                aksi.onPilih(key);
                aksi.onMenu(item, e.clientX, e.clientY);
            }}
            onPointerDown={(e) => {
                if (e.pointerType !== "touch") return;
                panjang.current = false;
                const { clientX: x, clientY: y } = e;
                awal.current = { x, y };
                clearTimeout(timer.current);
                timer.current = setTimeout(() => {
                    panjang.current = true;
                    aksi.onPilih(key);
                    aksi.onMenu(item, x, y);
                }, 500);
            }}
            onPointerMove={(e) => {
                const a = awal.current;
                if (a && Math.hypot(e.clientX - a.x, e.clientY - a.y) > 10) batal();
            }}
            onPointerUp={batal}
            onPointerCancel={batal}
            className={`cursor-default select-none [-webkit-touch-callout:none] ${className} ${terpilih ? "!border-aqua !bg-select" : "hover:bg-aqua/10"
                }`}
        >
            {children}
        </div>
    );
}