import {
    ArrowLeftIcon,
    ArrowRightIcon,
    ArrowUpIcon,
    ChevronRightIcon,
    ComputerIcon,
} from "@/components/icons";
import type { ReactNode } from "react";
import type { Lokasi } from "./types";

type Props = {
    lokasi: Lokasi;
    hasil: boolean; // sedang menampilkan hasil pencarian di root
    bisaMundur: boolean;
    bisaMaju: boolean;
    onMundur: () => void;
    onMaju: () => void;
    onNaik: () => void;
    onKe: (l: Lokasi) => void;
};

const navBtn =
    "grid h-8 w-8 place-items-center rounded-md text-text-2 transition-colors hover:bg-white/10 hover:text-text disabled:pointer-events-none disabled:opacity-35";

function Crumb({ onClick, children }: { onClick: () => void; children: ReactNode }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="rounded px-1.5 py-0.5 text-text-2 transition-colors hover:bg-white/10 hover:text-text"
        >
            {children}
        </button>
    );
}

const Sep = () => <ChevronRightIcon className="h-3 w-3 shrink-0 text-text-2" />;

export default function AddressBar({
    lokasi,
    hasil,
    bisaMundur,
    bisaMaju,
    onMundur,
    onMaju,
    onNaik,
    onKe,
}: Props) {
    return (
        <div className="flex shrink-0 items-center gap-1 border-b border-white/10 px-3 py-2">
            <button type="button" aria-label="Mundur" disabled={!bisaMundur} onClick={onMundur} className={navBtn}>
                <ArrowLeftIcon className="h-4 w-4" />
            </button>
            <button type="button" aria-label="Maju" disabled={!bisaMaju} onClick={onMaju} className={navBtn}>
                <ArrowRightIcon className="h-4 w-4" />
            </button>
            <button type="button" aria-label="Naik satu folder" disabled={lokasi === null} onClick={onNaik} className={navBtn}>
                <ArrowUpIcon className="h-4 w-4" />
            </button>

            <div className="ml-1 flex h-8 min-w-0 flex-1 items-center gap-1 overflow-hidden whitespace-nowrap rounded-md border border-white/10 bg-white/[0.03] px-2.5 text-[13px]">
                <ComputerIcon className="mr-1 h-3.5 w-3.5 shrink-0 text-aqua" />
                <Crumb onClick={() => onKe(null)}>Komputer Ini</Crumb>
                <Sep />
                {lokasi === null && !hasil ? (
                    <span className="px-1.5 text-text">Tugas</span>
                ) : (
                    <>
                        <Crumb onClick={() => onKe(null)}>Tugas</Crumb>
                        <Sep />
                        <span className="px-1.5 text-text">
                            {lokasi === null ? "Hasil pencarian" : `Semester ${lokasi}`}
                        </span>
                    </>
                )}
            </div>
        </div>
    );
}