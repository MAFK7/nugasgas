import {
    semuaTugas,
    kelompokPerSemester,
    urutkan,
    cari,
    isBaru,
    validasiTugas,
} from "../src/data/tugas";

const judul = (list: typeof semuaTugas) => list.map((t) => t.judul);
const hari = new Date("2026-11-17T12:00:00");

console.log("Folder:");
for (const f of kelompokPerSemester()) {
    console.log(`  Semester ${f.semester}: ${f.items.length} item`);
}

console.log("\nUrut nama     :", judul(urutkan(semuaTugas, "nama")));
console.log("Urut terbaru  :", judul(urutkan(semuaTugas, "terbaru")));
console.log("Urut semester :", judul(urutkan(semuaTugas, "semester")));

console.log("\nCari 'pdf'            :", judul(cari(semuaTugas, "pdf")));
console.log("Cari 'aplikasi web'   :", judul(cari(semuaTugas, "aplikasi web")));
console.log("Cari 'pertemuan 3'    :", judul(cari(semuaTugas, "pertemuan 3")));
console.log("Cari 'zzz'            :", judul(cari(semuaTugas, "zzz")));

console.log("\nLabel Baru (hari ini = 17 Nov 2026):");
for (const t of semuaTugas) {
    console.log(`  ${t.judul} (${t.ditambahkan}): ${isBaru(t, hari) ? "BARU" : "-"}`);
}

console.log("\nValidasi (semua harus ditolak):");
const dasar = semuaTugas[0];
const coba = (nama: string, entri: unknown) => {
    try {
        validasiTugas([entri]);
        console.log(`  ${nama}: LOLOS (seharusnya ditolak!)`);
    } catch (e) {
        console.log(`  ${nama}: ditolak -> ${(e as Error).message}`);
    }
};
coba("web dengan path", { ...dasar, url: "/tugas-kuliah-app" });
coba("pdf di luar /files/", { ...dasar, tipe: "pdf", url: "/lain/x.pdf" });
coba("tanggal salah", { ...dasar, ditambahkan: "16-11-2026" });