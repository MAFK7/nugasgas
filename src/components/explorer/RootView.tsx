import { FolderIcon } from "@/components/icons";
import Selectable from "./Selectable";
import { keyOf, type Aksi, type Item } from "./types";

type Props = { items: Item[]; aksi: Aksi };

export default function RootView({ items, aksi }: Props) {
    return (
        <div
            data-grid
            role="listbox"
            aria-label="Folder semester"
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
            {items.map((it) =>
                it.kind === "folder" ? (
                    <Selectable
                        key={keyOf(it)}
                        item={it}
                        aksi={aksi}
                        className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4 hover:border-aqua/40"
                    >
                        <FolderIcon className="h-12 w-12 shrink-0" />
                        <span className="min-w-0">
                            <span className="block truncate text-[15px] font-semibold text-text">
                                Semester {it.semester}
                            </span>
                            <span className="block font-mono text-xs text-text-2">{it.jumlah} item</span>
                        </span>
                    </Selectable>
                ) : null,
            )}
        </div>
    );
}