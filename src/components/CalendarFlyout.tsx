"use client";

import { useState } from "react";

const HARI = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];
const BULAN = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];

export default function CalendarFlyout({ today }: { today: Date }) {
    const [view, setView] = useState({ y: today.getFullYear(), m: today.getMonth() });

    const offset = (new Date(view.y, view.m, 1).getDay() + 6) % 7; // Senin = kolom pertama
    const total = new Date(view.y, view.m + 1, 0).getDate();
    const cells: (number | null)[] = [
        ...Array<null>(offset).fill(null),
        ...Array.from({ length: total }, (_, i) => i + 1),
    ];

    const shift = (d: number) =>
        setView((v) => {
            const dt = new Date(v.y, v.m + d, 1);
            return { y: dt.getFullYear(), m: dt.getMonth() };
        });

    const isToday = (d: number) =>
        d === today.getDate() && view.m === today.getMonth() && view.y === today.getFullYear();

    return (
        <div className="mica flyout absolute bottom-full right-0 mb-3 w-72 rounded-xl p-4 text-text">
            <p className="text-sm font-semibold">
                {today.toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long" })}
            </p>

            <div className="mt-3 flex items-center justify-between">
                <span className="text-[13px] text-text-2">
                    {BULAN[view.m]} {view.y}
                </span>
                <div className="flex gap-1">
                    <button
                        type="button"
                        onClick={() => shift(-1)}
                        aria-label="Bulan sebelumnya"
                        className="grid h-7 w-7 place-items-center rounded-md text-text-2 hover:bg-white/10 hover:text-text coarse:h-10 coarse:w-10"
                    >
                        ‹
                    </button>
                    <button
                        type="button"
                        onClick={() => shift(1)}
                        aria-label="Bulan berikutnya"
                        className="grid h-7 w-7 place-items-center rounded-md text-text-2 hover:bg-white/10 hover:text-text coarse:h-10 coarse:w-10"
                    >
                        ›
                    </button>
                </div>
            </div>

            <div className="mt-2 grid grid-cols-7 gap-y-1 text-center text-[12px]">
                {HARI.map((h) => (
                    <span key={h} className="py-1 text-text-2">
                        {h}
                    </span>
                ))}
                {cells.map((d, i) =>
                    d === null ? (
                        <span key={i} />
                    ) : (
                        <span
                            key={i}
                            className={`mx-auto grid h-8 w-8 place-items-center rounded-full ${isToday(d) ? "bg-accent-gradient font-semibold text-on-accent" : "hover:bg-white/10"
                                }`}
                        >
                            {d}
                        </span>
                    ),
                )}
            </div>
        </div>
    );
}