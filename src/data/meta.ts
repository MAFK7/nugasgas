export const META = {
    nama: "Tugas Kuliah",
    judul: "Tugas Kuliah | M. Asad Farhan K",
    deskripsi: "Arsip tugas kuliah Informatics, UIN Sunan Gunung Djati Bandung.",
    warnaTema: "#050A0C",
    gambar: { url: "/og.png", width: 1200, height: 630, alt: "Tugas Kuliah - M. Asad Farhan K" },
};

export const metaFolder = (semester: number, jumlah: number) => ({
    judul: `Semester ${semester} | ${META.nama}`,
    deskripsi: `${jumlah} tugas kuliah Semester ${semester}.`,
});