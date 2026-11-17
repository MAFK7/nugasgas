import type { Tugas } from "@/data/tugas";

export type Lokasi = number | null; // null = root "Tugas", angka = nomor semester
export const PER_HALAMAN = 9;

export type Tampilan = "grid" | "details";

/** Item yang bisa dipilih di area isi: folder semester atau tugas. */
export type Item =
    | { kind: "folder"; semester: number; jumlah: number }
    | { kind: "tugas"; tugas: Tugas };

export const keyOf = (it: Item) =>
    it.kind === "folder" ? `folder:${it.semester}` : `tugas:${it.tugas.url}`;

/** Aksi bersama untuk semua tampilan (grid, details, root). */
export type Aksi = {
    terpilih: string | null;
    onPilih: (key: string) => void;
    onBuka: (item: Item) => void;
    onMenu: (item: Item, x: number, y: number) => void;
};