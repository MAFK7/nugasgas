import data from "./tugas.json";

export type TipeTugas = "web" | "pdf" | "link";
export type UrutMode = "nama" | "terbaru" | "semester";

export type Tugas = {
    judul: string;
    matkul: string;
    semester: number;
    pertemuan: number;
    tipe: TipeTugas;
    url: string; // web: URL lengkap subdomain | pdf: path /files/... | link: URL lengkap
    thumbnail: string;
    ditambahkan: string; // format YYYY-MM-DD
};

export type FolderSemester = { semester: number; items: Tugas[] };

/* ---------- Validasi (data diedit bot, jadi dicek saat build) ---------- */

const TIPE: readonly string[] = ["web", "pdf", "link"];

export function validasiTugas(raw: unknown): Tugas[] {
    if (!Array.isArray(raw)) throw new Error("tugas.json harus berupa array");

    const gagal = (i: number, pesan: string): never => {
        throw new Error(`tugas.json entri #${i + 1}: ${pesan}`);
    };

    raw.forEach((t, i) => {
        for (const k of ["judul", "matkul", "url", "thumbnail"] as const) {
            if (typeof t?.[k] !== "string" || t[k].trim() === "") {
                gagal(i, `"${k}" harus teks dan tidak boleh kosong`);
            }
        }
        for (const k of ["semester", "pertemuan"] as const) {
            if (!Number.isInteger(t[k]) || t[k] < 1) {
                gagal(i, `"${k}" harus bilangan bulat mulai dari 1`);
            }
        }
        if (!TIPE.includes(t.tipe)) gagal(i, `"tipe" harus web, pdf, atau link`);

        if (t.tipe === "web" && !/^https:\/\/\S+$/.test(t.url)) {
            gagal(i, `tipe "web": "url" harus URL lengkap berawalan https:// (contoh https://nama-tugas.nugasgas.my.id)`);
        }
        if (t.tipe === "link" && !/^https?:\/\/\S+$/.test(t.url)) {
            gagal(i, `tipe "link": "url" harus URL lengkap berawalan https://`);
        }
        if (t.tipe === "pdf" && !t.url.startsWith("/files/")) {
            gagal(i, `tipe "pdf": "url" harus berupa path yang diawali /files/`);
        }

        if (
            typeof t.ditambahkan !== "string" ||
            !/^\d{4}-\d{2}-\d{2}$/.test(t.ditambahkan) ||
            Number.isNaN(Date.parse(t.ditambahkan))
        ) {
            gagal(i, `"ditambahkan" harus tanggal valid berformat YYYY-MM-DD`);
        }
    });

    const urls = raw.map((t) => t.url as string);
    const kembar = urls.find((u, i) => urls.indexOf(u) !== i);
    if (kembar) throw new Error(`tugas.json: url "${kembar}" muncul lebih dari sekali`);

    return raw as Tugas[];
}

export const semuaTugas: Tugas[] = validasiTugas(data);

/* ---------- Fungsi bantu ---------- */

const collator = new Intl.Collator("id", { sensitivity: "base", numeric: true });

/** Folder semester dibentuk otomatis dari data, diurutkan naik. */
export function kelompokPerSemester(daftar: Tugas[] = semuaTugas): FolderSemester[] {
    const peta = new Map<number, Tugas[]>();
    for (const t of daftar) {
        const list = peta.get(t.semester);
        if (list) list.push(t);
        else peta.set(t.semester, [t]);
    }
    return [...peta.entries()]
        .sort(([a], [b]) => a - b)
        .map(([semester, items]) => ({ semester, items }));
}

/** Mengembalikan salinan yang sudah diurutkan. */
export function urutkan(daftar: Tugas[], mode: UrutMode): Tugas[] {
    const salin = [...daftar];
    switch (mode) {
        case "nama": // Nama A-Z
            return salin.sort((a, b) => collator.compare(a.judul, b.judul));
        case "terbaru": // Pertemuan terbaru (nomor terbesar dulu)
            return salin.sort(
                (a, b) =>
                    b.pertemuan - a.pertemuan ||
                    b.ditambahkan.localeCompare(a.ditambahkan) ||
                    collator.compare(a.judul, b.judul),
            );
        case "semester": // Semester naik, lalu mata kuliah, lalu pertemuan
            return salin.sort(
                (a, b) =>
                    a.semester - b.semester ||
                    collator.compare(a.matkul, b.matkul) ||
                    a.pertemuan - b.pertemuan,
            );
    }
}

/** Setiap kata kunci harus cocok di judul, mata kuliah, "pertemuan N", atau tipe. */
export function cari(daftar: Tugas[], kueri: string): Tugas[] {
    const kata = kueri.toLowerCase().split(/\s+/).filter(Boolean);
    if (kata.length === 0) return daftar;
    return daftar.filter((t) => {
        const teks = `${t.judul} ${t.matkul} pertemuan ${t.pertemuan} ${t.tipe}`.toLowerCase();
        return kata.every((k) => teks.includes(k));
    });
}

export const HARI_BARU = 14;
const MS_HARI = 24 * 60 * 60 * 1000;

/** "Baru" = ditambahkan dalam 14 hari terakhir (hari ini + 13 hari sebelumnya). */
export function isBaru(t: Tugas, sekarang: Date = new Date()): boolean {
    const [y, m, d] = t.ditambahkan.split("-").map(Number);
    const tambah = new Date(y, m - 1, d);
    const hariIni = new Date(sekarang.getFullYear(), sekarang.getMonth(), sekarang.getDate());
    const selisih = Math.round((hariIni.getTime() - tambah.getTime()) / MS_HARI);
    return selisih < HARI_BARU;
}