"use client";

import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";
import { useDesktop, type WindowId } from "./DesktopContext";
import { FileIcon, FolderIcon } from "./icons";

const META: Record<WindowId, { label: string; icon: ReactNode }> = {
    profil: { label: "Profil.txt", icon: <FileIcon className="h-9 w-9" /> },
    tugas: { label: "Tugas", icon: <FolderIcon className="h-9 w-9" /> },
    contact: { label: "Contact.lnk", icon: <FileIcon className="h-9 w-9" /> },
};

export default function DesktopIcons() {
    const { closed, reopen } = useDesktop();

    return (
        <div className="absolute left-3 top-4 z-20 flex w-24 flex-col gap-1">
            <AnimatePresence>
                {closed.map((id) => (
                    <motion.button
                        key={id}
                        type="button"
                        title="Buka"
                        onClick={() => reopen(id)}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.18 }}
                        className="flex w-20 flex-col items-center gap-1 rounded-md border border-transparent p-2 text-[12px] text-text [text-shadow:0_1px_4px_rgb(0_0_0/0.8)] transition-colors hover:border-aqua hover:bg-select"
                    >
                        {META[id].icon}
                        <span className="max-w-full truncate">{META[id].label}</span>
                    </motion.button>
                ))}
            </AnimatePresence>
        </div>
    );
}