import type { Metadata } from "next";
import Link from "next/link";
import { TEKS_404 } from "@/data/teks404";

export const metadata: Metadata = { title: TEKS_404.judulTab };

export default function NotFound() {
    return (
        <main className="fixed inset-0 z-[100] overflow-y-auto bg-[#0067C0] text-white">
            <div className="mx-auto flex min-h-full max-w-3xl flex-col justify-center px-8 py-16 sm:px-12">
                <p className="text-[clamp(5rem,16vw,9rem)] leading-none" aria-hidden="true">
                    :(
                </p>
                <h1 className="mt-6 text-2xl font-light leading-snug sm:text-3xl">{TEKS_404.judul}</h1>
                <p className="mt-4 max-w-xl text-base text-white/90 sm:text-lg">{TEKS_404.isi}</p>
                <Link
                    href="/"
                    className="mt-8 inline-flex h-12 w-fit items-center rounded-md bg-white px-6 text-[15px] font-semibold text-[#0067C0] transition-colors hover:bg-white/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                    {TEKS_404.tombol}
                </Link>
                <p className="mt-10 font-mono text-xs text-white/80">{TEKS_404.kode}</p>
            </div>
            <main data-no-desktop-menu className="fixed inset-0 z-[100] overflow-y-auto bg-[#0067C0] text-white"></main>
        </main>
    );
}