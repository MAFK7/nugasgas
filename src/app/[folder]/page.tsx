import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Beranda from "@/components/Beranda";
import { META, metaFolder } from "@/data/meta";
import { kelompokPerSemester } from "@/data/tugas";

export function generateStaticParams() {
    return kelompokPerSemester().map((f) => ({ folder: `semester-${f.semester}` }));
}

/** Judul dan preview tautan khusus tiap folder. */
export async function generateMetadata({
    params,
}: {
    params: Promise<{ folder: string }>;
}): Promise<Metadata> {
    const { folder } = await params;
    const cocok = /^semester-(\d+)$/.exec(folder);
    const data = cocok ? kelompokPerSemester().find((f) => f.semester === Number(cocok[1])) : undefined;
    if (!data) return {};

    const { judul, deskripsi } = metaFolder(data.semester, data.items.length);
    return {
        title: judul,
        description: deskripsi,
        alternates: { canonical: `/semester-${data.semester}` },
        // openGraph dan twitter di sini menggantikan milik layout secara utuh, jadi diisi lengkap
        openGraph: {
            type: "website",
            locale: "id_ID",
            siteName: META.nama,
            title: judul,
            description: deskripsi,
            url: `/semester-${data.semester}`,
            images: [META.gambar],
        },
        twitter: {
            card: "summary_large_image",
            title: judul,
            description: deskripsi,
            images: [META.gambar.url],
        },
    };
}

export default async function HalamanFolder({ params }: { params: Promise<{ folder: string }> }) {
    const { folder } = await params;
    const cocok = /^semester-(\d+)$/.exec(folder);
    const semester = cocok ? Number(cocok[1]) : null;

    if (semester === null || !kelompokPerSemester().some((f) => f.semester === semester)) {
        notFound();
    }

    return <Beranda semesterAwal={semester} />;
}