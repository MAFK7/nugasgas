import { useEffect, useRef, useState, type RefObject } from "react";
import type { UrutMode } from "@/data/tugas";
import {
    CheckIcon,
    ChevronDownIcon,
    GridIcon,
    ListIcon,
    SearchIcon,
    SortIcon,
    XIcon,
} from "@/components/icons";
import type { Tampilan } from "./types";

const OPSI: { mode: UrutMode; label: string }[] = [
    { mode: "nama", label: "Nama A-Z" },
    { mode: "terbaru", label: "Pertemuan terbaru" },
    { mode: "semester", label: "Semester" },
];

const TAMPILAN = [
    { t: "grid", label: "Grid", Ikon: GridIcon },
    { t: "details", label: "Details", Ikon: ListIcon },
] as const;

type Props = {
    urut: UrutMode;
    onUrut: (m: UrutMode) => void;
    tampilan: Tampilan;
    onTampilan: (t: Tampilan) => void;
    kueri: string;
    onKueri: (v: string) => void;
    searchRef: RefObject<HTMLInputElement | null>;
    onKeDaftar: () => void;
};

export default function Toolbar({
    urut,
    onUrut,
    tampilan,
    onTampilan,
    kueri,
    onKueri,
    searchRef,
    onKeDaftar,
}: Props) {
    const [buka, setBuka] = useState(false);
    const dropRef = useRef<HTMLDivElement>(null);

    // Dropdown menutup dengan Esc atau klik di luar
    useEffect(() => {
        if (!buka) return;
        const onDown = (e: PointerEvent) => {
            if (!dropRef.current?.contains(e.target as Node)) setBuka(false);
        };
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setBuka(false);
        };
        document.addEventListener("pointerdown", onDown);
        document.addEventListener("keydown", onKey);
        return () => {
            document.removeEventListener("pointerdown", onDown);
            document.removeEventListener("keydown", onKey);
        };
    }, [buka]);

    return (
        <div className="flex shrink-0 flex-wrap items-center gap-2 border-b border-white/10 px-3 py-2">
            <div ref={dropRef} className="relative">
                <button
                    type="button"
                    aria-haspopup="menu"
                    aria-expanded={buka}
                    onClick={() => setBuka((b) => !b)}
                    className="inline-flex h-8 items-center gap-1.5 rounded-md px-2.5 text-[13px] text-text-2 transition-colors hover:bg-white/10 hover:text-text"
                >
                    <SortIcon className="h-4 w-4" />
                    Urutkan
                    <ChevronDownIcon className="h-3 w-3" />
                </button>

                {buka && (
                    <div role="menu" className="mica flyout absolute left-0 top-full z-30 mt-1 w-52 rounded-lg py-1">
                        {OPSI.map((o) => (
                            <button
                                key={o.mode}
                                type="button"
                                role="menuitemradio"
                                aria-checked={urut === o.mode}
                                onClick={() => {
                                    onUrut(o.mode);
                                    setBuka(false);
                                    onKeDaftar();
                                }}
                                className="flex w-full items-center gap-2 px-3 py-[7px] text-left text-[13px] text-text hover:bg-white/10"
                            >
                                <span className="grid h-4 w-4 place-items-center">
                                    {urut === o.mode && <CheckIcon className="h-3.5 w-3.5 text-aqua" />}
                                </span>
                                {o.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <div role="group" aria-label="Tampilan" className="inline-flex rounded-md bg-white/[0.05] p-0.5">
                {TAMPILAN.map(({ t, label, Ikon }) => (
                    <button
                        key={t}
                        type="button"
                        aria-pressed={tampilan === t}
                        aria-label={label}
                        title={label}
                        onClick={() => onTampilan(t)}
                        className={`grid h-7 w-8 place-items-center rounded transition-colors ${tampilan === t ? "bg-aqua/20 text-text" : "text-text-2 hover:text-text"
                            }`}
                    >
                        <Ikon className="h-4 w-4" />
                    </button>
                ))}
            </div>

            <div className="relative w-full sm:ml-auto sm:w-60">
                <input
                    ref={searchRef}
                    type="text"
                    value={kueri}
                    onChange={(e) => onKueri(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Escape") {
                            e.stopPropagation();
                            if (kueri) onKueri("");
                            else onKeDaftar();
                        } else if (e.key === "ArrowDown") {
                            e.preventDefault();
                            onKeDaftar();
                        }
                    }}
                    placeholder="Cari di Tugas..."
                    aria-label="Cari di Tugas"
                    autoComplete="off"
                    spellCheck={false}
                    className="h-8 w-full rounded-md border border-white/10 bg-white/[0.04] pl-3 pr-8 text-[13px] text-text outline-none transition-colors placeholder:text-text-2 focus:border-aqua/60"
                />
                {kueri ? (
                    <button
                        type="button"
                        aria-label="Hapus pencarian"
                        onClick={() => {
                            onKueri("");
                            searchRef.current?.focus();
                        }}
                        className="absolute right-1.5 top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center rounded text-text-2 hover:bg-white/10 hover:text-text"
                    >
                        <XIcon className="h-3.5 w-3.5" />
                    </button>
                ) : (
                    <SearchIcon className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-2" />
                )}
            </div>
        </div>
    );
}