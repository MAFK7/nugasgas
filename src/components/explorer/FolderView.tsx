import { isBaru, type Tugas } from "@/data/tugas";
import Selectable from "./Selectable";
import Thumb from "./Thumb";
import { keyOf, type Aksi, type Item } from "./types";

function Tile({ tugas, baru, aksi }: { tugas: Tugas; baru: boolean; aksi: Aksi }) {
    return (
        <Selectable
            item={{ kind: "tugas", tugas }}
            aksi={aksi}
            className="group rounded-xl border border-transparent p-2.5"
        >
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-white/[0.04]">
                <Thumb
                    src={tugas.thumbnail}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <span className="absolute left-2 top-2 rounded-md bg-[#101619] px-1.5 py-0.5 font-mono text-[10px] font-semibold text-text">
                    {tugas.tipe.toUpperCase()}
                </span>
                {baru && (
                    <span className="absolute right-2 top-2 rounded-full bg-lime px-2 py-0.5 text-[11px] font-semibold text-on-accent">
                        Baru
                    </span>
                )}
            </div>
            <p className="mt-2.5 truncate text-sm font-semibold text-text">{tugas.judul}</p>
            <p className="truncate text-xs text-text-2">
                {tugas.matkul} • Pertemuan {tugas.pertemuan}
            </p>
        </Selectable>
    );
}

type Props = { items: Item[]; now: Date | null; aksi: Aksi };

export default function FolderView({ items, now, aksi }: Props) {
    return (
        <div
            data-grid
            role="listbox"
            aria-label="Daftar tugas"
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
            {items.map((it) =>
                it.kind === "tugas" ? (
                    <Tile
                        key={keyOf(it)}
                        tugas={it.tugas}
                        baru={now !== null && isBaru(it.tugas, now)}
                        aksi={aksi}
                    />
                ) : null,
            )}
        </div>
    );
}