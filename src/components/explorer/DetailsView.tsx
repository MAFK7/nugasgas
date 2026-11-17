import { isBaru } from "@/data/tugas";
import { FolderIcon } from "@/components/icons";
import Selectable from "./Selectable";
import Thumb from "./Thumb";
import { keyOf, type Aksi, type Item } from "./types";

type Props = { items: Item[]; now: Date | null; aksi: Aksi };

export default function DetailsView({ items, now, aksi }: Props) {
    const folder = items[0]?.kind === "folder";
    const kolom = folder
        ? "grid-cols-[minmax(0,1fr)_96px]"
        : "grid-cols-[minmax(0,1fr)_72px] sm:grid-cols-[minmax(0,2fr)_minmax(0,1.5fr)_88px]";

    return (
        <div role="listbox" aria-label="Daftar item">
            <div className={`grid ${kolom} gap-3 border-b border-white/10 px-3 pb-2 text-xs text-text-2`}>
                <span>Nama</span>
                {folder ? (
                    <span>Jumlah</span>
                ) : (
                    <>
                        <span className="hidden sm:block">Mata Kuliah</span>
                        <span>Pertemuan</span>
                    </>
                )}
            </div>

            <div className="mt-1">
                {items.map((it) => (
                    <Selectable
                        key={keyOf(it)}
                        item={it}
                        aksi={aksi}
                        className={`grid ${kolom} items-center gap-3 rounded-md border border-transparent px-3 py-1.5 text-[13px] odd:bg-white/[0.03]`}
                    >
                        {it.kind === "folder" ? (
                            <>
                                <span className="flex min-w-0 items-center gap-2.5">
                                    <FolderIcon className="h-6 w-6 shrink-0" />
                                    <span className="truncate font-semibold text-text">Semester {it.semester}</span>
                                </span>
                                <span className="font-mono text-xs text-text-2">{it.jumlah} item</span>
                            </>
                        ) : (
                            <>
                                <span className="flex min-w-0 items-center gap-2.5">
                                    <Thumb
                                        src={it.tugas.thumbnail}
                                        iconClass="h-4 w-4"
                                        className="h-8 w-10 shrink-0 rounded object-cover"
                                    />
                                    <span className="truncate font-semibold text-text">{it.tugas.judul}</span>
                                    {now !== null && isBaru(it.tugas, now) && (
                                        <span className="shrink-0 rounded-full bg-lime px-1.5 py-px text-[10px] font-semibold text-on-accent">
                                            Baru
                                        </span>
                                    )}
                                </span>
                                <span className="hidden truncate text-text-2 sm:block">{it.tugas.matkul}</span>
                                <span className="text-text-2">{it.tugas.pertemuan}</span>
                            </>
                        )}
                    </Selectable>
                ))}
            </div>
        </div>
    );
}