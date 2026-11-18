export type Kontak = {
    id: "email" | "instagram" | "github" | "linkedin";
    nama: string;
    detail: string; // baris kecil abu-abu di bawah nama
    href: string;
};

/** Teks baris kaki di jendela Contact. */
export const DOMAIN = "nugasgas.my.id";

export const kontak: Kontak[] = [
    {
        id: "email",
        nama: "Email",
        detail: "m.asadfarhan@student.uinsgd.ac.id",
        href: "mailto:m.asadfarhan@student.uinsgd.ac.id",
    },
    {
        id: "instagram",
        nama: "Instagram",
        detail: "@asadfarhank",
        href: "https://www.instagram.com/asadfarhank",
    },
    {
        id: "github",
        nama: "GitHub",
        detail: "github.com/asadfarhank",
        href: "https://github.com/asadfarhank",
    },
    {
        id: "linkedin",
        nama: "LinkedIn",
        detail: "M. Asad Farhan K",
        href: "https://www.linkedin.com/in/GANTI-DENGAN-USERNAME-LINKEDIN",
    },
];