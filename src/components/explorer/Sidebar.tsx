import type { FolderSemester } from "@/data/tugas";
import { FolderIcon } from "@/components/icons";
import type { Lokasi } from "./types";

type Props = { folders: FolderSemester[]; aktif: Lokasi; onKe: (l: Lokasi) => void };

export default function Sidebar({ folders, aktif, onKe }: Props) {
    const entri: { lokasi: Lokasi; label: string; jumlah?: number }[] = [
        { lokasi: null, label: "Tugas" },
        ...folders.map((f) => ({
            lokasi: f.semester as Lokasi,
            label: `Semester ${f.semester}`,
            jumlah: f.items.length,
        })),
    ];

    return (
        <nav
            aria-label="Folder semester"
            className="scroll-thin flex shrink-0 gap-1 overflow-x-auto border-b border-white/10 p-2 md:w-52 md:flex-col md:overflow-x-hidden md:overflow-y-auto md:border-b-0 md:border-r"
        >
            {entri.map((e) => {
                const on = e.lokasi === aktif;
                return (
                    <button
                        key={e.label}
                        type="button"
                        onClick={() => onKe(e.lokasi)}
                        aria-current={on ? "page" : undefined}
                        className={`relative flex shrink-0 items-center gap-2.5 rounded-lg px-3 py-2 text-left text-[13px] transition-colors md:w-full ${on ? "bg-select text-text" : "text-text-2 hover:bg-white/5 hover:text-text"
                            }`}
                    >
                        {on && (
                            <span
                                aria-hidden="true"
                                className="absolute bottom-1.5 left-0 top-1.5 w-[3px] rounded-full bg-linear-to-b from-lime to-aqua"
                            />
                        )}
                        <FolderIcon className="h-4 w-4 shrink-0" />
                        <span className="whitespace-nowrap">{e.label}</span>
                        {e.jumlah !== undefined && (
                            <span className="ml-auto hidden font-mono text-[11px] text-text-2 md:inline">
                                {e.jumlah} item
                            </span>
                        )}
                    </button>
                );
            })}
        </nav>
    );
}