import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { FileIcon, XIcon } from "@/components/icons";
import type { Tugas } from "@/data/tugas";

const TIPE: Record<Tugas["tipe"], string> = {
    web: "Situs web (WEB)",
    pdf: "Dokumen PDF (PDF)",
    link: "Tautan (LINK)",
};

type Props = { tugas: Tugas; onTutup: () => void };

/** Dialog Properti gaya Windows: judul, mata kuliah, semester, pertemuan, tipe file. */
export default function PropertiDialog({ tugas, onTutup }: Props) {
    const kotak = useRef<HTMLDivElement>(null);
    const okRef = useRef<HTMLButtonElement>(null);
    const tutup = useRef(onTutup);

    useEffect(() => {
        tutup.current = onTutup;
    });

    useEffect(() => {
        okRef.current?.focus();

        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                e.preventDefault();
                tutup.current();
                return;
            }
            if (e.key === "Tab") {
                // Fokus tetap berputar di dalam dialog
                const f = Array.from(kotak.current?.querySelectorAll<HTMLElement>("button") ?? []);
                if (f.length === 0) return;
                const i = f.indexOf(document.activeElement as HTMLElement);
                const n = e.shiftKey ? (i <= 0 ? f.length - 1 : i - 1) : i === f.length - 1 ? 0 : i + 1;
                e.preventDefault();
                f[n].focus();
            }
        };
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, []);

    const baris: [string, string][] = [
        ["Judul", tugas.judul],
        ["Mata kuliah", tugas.matkul],
        ["Semester", String(tugas.semester)],
        ["Pertemuan", String(tugas.pertemuan)],
        ["Tipe file", TIPE[tugas.tipe]],
    ];

    return createPortal(
        <div
            data-no-desktop-menu
            className="fixed inset-0 z-[80] grid place-items-center bg-black/45 p-4"
            onMouseDown={(e) => {
                // Hanya klik kiri di luar kotak yang menutup (klik kanan dibiarkan)
                if (e.button === 0 && e.target === e.currentTarget) onTutup();
            }}
        >
            <div
                ref={kotak}
                role="dialog"
                aria-modal="true"
                aria-label={`Properti: ${tugas.judul}`}
                className="mica mica-solid flyout w-full max-w-[400px] overflow-hidden rounded-xl"
            >
                <div className="flex h-9 items-center justify-between bg-black/25 pl-3 text-xs text-text-2">
                    <span className="truncate">Properti: {tugas.judul}</span>
                    <button
                        type="button"
                        aria-label="Tutup"
                        onClick={onTutup}
                        className="grid h-9 w-11 place-items-center transition-colors hover:!bg-[#c42b1c] hover:!text-white"
                    >
                        <XIcon className="h-3 w-3" />
                    </button>
                </div>

                <div className="px-5 pt-5">
                    <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                        <FileIcon className="h-10 w-10 shrink-0" />
                        <p className="min-w-0 break-words text-[15px] font-semibold text-text">{tugas.judul}</p>
                    </div>

                    <dl className="mt-4 grid grid-cols-[96px_minmax(0,1fr)] gap-x-3 gap-y-2.5 pb-5 text-[13px]">
                        {baris.map(([label, nilai]) => (
                            <div key={label} className="contents">
                                <dt className="text-text-2">{label}</dt>
                                <dd className="break-words text-text">{nilai}</dd>
                            </div>
                        ))}
                    </dl>
                </div>

                <div className="flex justify-end gap-2 border-t border-white/10 bg-black/20 px-4 py-3">
                    <button
                        ref={okRef}
                        type="button"
                        onClick={onTutup}
                        className="h-8 rounded-md bg-accent-gradient px-6 text-[13px] font-semibold text-on-accent transition hover:brightness-110"
                    >
                        OK
                    </button>
                    <button
                        type="button"
                        onClick={onTutup}
                        className="h-8 rounded-md border border-white/15 px-5 text-[13px] text-text transition-colors hover:bg-white/10"
                    >
                        Batal
                    </button>
                </div>
            </div>
        </div>,
        document.body,
    );
}