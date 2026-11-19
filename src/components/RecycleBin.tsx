"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { RefObject } from "react";
import { ISI_SAMPAH } from "@/data/sampah";
import { BinIcon, FileIcon } from "./icons";
import WindowFrame from "./WindowFrame";

const daftar: Variants = {
    hidden: {},
    show: { transition: { delayChildren: 0.25, staggerChildren: 0.4 } },
};

const baris: Variants = {
    hidden: { opacity: 0, height: 0, x: -14 },
    show: { opacity: 1, height: "auto", x: 0, transition: { duration: 0.28, ease: "easeOut" } },
};

/** Jendela Recycle Bin: isinya muncul satu per satu setiap kali dibuka. */
export default function RecycleBin({ batas }: { batas: RefObject<HTMLElement | null> }) {
    const reduce = useReducedMotion();

    return (
        <WindowFrame
            id="sampah"
            title="Recycle Bin"
            icon={<BinIcon className="h-4 w-4" />}
            tab
            draggable
            dragConstraints={batas}
            className="absolute left-28 top-16 z-30 w-[min(440px,calc(100%-2rem))]"
        >
            <motion.ul
                variants={daftar}
                initial={reduce ? false : "hidden"}
                animate="show"
                className="min-h-[120px] px-2 py-2"
            >
                {ISI_SAMPAH.map((nama) => (
                    <motion.li key={nama} variants={baris} className="overflow-hidden">
                        <div className="flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-[13px] text-text">
                            <FileIcon className="h-5 w-5 shrink-0" />
                            <span className="truncate">{nama}</span>
                        </div>
                    </motion.li>
                ))}
            </motion.ul>
        </WindowFrame>
    );
}