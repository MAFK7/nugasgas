"use client";

import { useEffect, useRef } from "react";
import Explorer from "./explorer/Explorer";
import { FolderIcon } from "./icons";
import WindowFrame from "./WindowFrame";

export default function TugasSection({ semesterAwal = null }: { semesterAwal?: number | null }) {
    const ref = useRef<HTMLElement>(null);

    // Dibuka lewat alamat /semester-N: langsung gulir ke jendela Tugas
    useEffect(() => {
        if (semesterAwal === null) return;
        const t = setTimeout(() => {
            document.getElementById("tugas")?.scrollIntoView({ behavior: "auto", block: "start" });
        }, 0);
        return () => clearTimeout(t);
    }, [semesterAwal]);

    return (
        <section
            id="tugas"
            ref={ref}
            className="relative flex min-h-dvh flex-col items-center justify-center px-2 py-20 sm:px-8"
        >
            <h2 className="mb-8 text-center font-display text-3xl text-text sm:text-4xl">Tugas Kuliah</h2>

            <WindowFrame
                id="tugas"
                title="Tugas"
                icon={<FolderIcon className="h-4 w-4" />}
                tab
                maximizable
                draggable
                dragConstraints={ref}
                className="w-full max-w-[1200px]"
            >
                <Explorer semesterAwal={semesterAwal} />
            </WindowFrame>
        </section>
    );
}