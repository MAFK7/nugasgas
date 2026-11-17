import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export type MenuItem = { label: string; onPilih: () => void };

type Props = { x: number; y: number; items: MenuItem[]; onTutup: () => void };

const LEBAR = 224;
const TINGGI_ITEM = 34;

export default function ContextMenu({ x, y, items, onTutup }: Props) {
    const ref = useRef<HTMLDivElement>(null);
    const tutup = useRef(onTutup);

    useEffect(() => {
        tutup.current = onTutup;
    });

    useEffect(() => {
        const tombol = () =>
            Array.from(ref.current?.querySelectorAll<HTMLButtonElement>("button") ?? []);
        tombol()[0]?.focus();

        const onDown = (e: PointerEvent) => {
            if (!ref.current?.contains(e.target as Node)) tutup.current();
        };
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                e.preventDefault();
                tutup.current();
                return;
            }
            if (e.key === "ArrowDown" || e.key === "ArrowUp") {
                e.preventDefault();
                const list = tombol();
                const i = list.indexOf(document.activeElement as HTMLButtonElement);
                const n = e.key === "ArrowDown" ? (i + 1) % list.length : (i - 1 + list.length) % list.length;
                list[n]?.focus();
            }
        };
        const onResize = () => tutup.current();

        document.addEventListener("pointerdown", onDown);
        document.addEventListener("keydown", onKey);
        window.addEventListener("resize", onResize);
        return () => {
            document.removeEventListener("pointerdown", onDown);
            document.removeEventListener("keydown", onKey);
            window.removeEventListener("resize", onResize);
        };
    }, []);

    const tinggi = items.length * TINGGI_ITEM + 8;
    const left = Math.max(8, Math.min(x, window.innerWidth - LEBAR - 8));
    const top = Math.max(8, Math.min(y, window.innerHeight - tinggi - 8));

    return createPortal(
        <div
            ref={ref}
            role="menu"
            style={{ left, top, width: LEBAR }}
            className="mica flyout fixed z-[60] rounded-lg py-1"
        >
            {items.map((it) => (
                <button
                    key={it.label}
                    type="button"
                    role="menuitem"
                    onClick={it.onPilih}
                    className="block w-full px-3 py-[7px] text-left text-[13px] text-text outline-none hover:bg-white/10 focus-visible:bg-white/10"
                >
                    {it.label}
                </button>
            ))}
        </div>,
        document.body,
    );
}