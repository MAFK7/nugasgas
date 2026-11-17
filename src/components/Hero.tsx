"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { scrollToSection } from "@/lib/scroll";
import { useDesktop } from "./DesktopContext";
import DesktopIcons from "./DesktopIcons";
import HeroCharacter from "./HeroCharacter";
import { ArrowDownIcon, ArrowUpRightIcon, FileIcon } from "./icons";
import WindowFrame from "./WindowFrame";

const container: Variants = {
    hidden: {},
    show: { transition: { delayChildren: 0.3, staggerChildren: 0.14 } },
};

const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const brush: Variants = {
    hidden: { pathLength: 0 },
    show: { pathLength: 1, transition: { duration: 0.8, delay: 0.35, ease: "easeOut" } },
};

export default function Hero() {
    const reduce = useReducedMotion();
    const { closed } = useDesktop();
    const profilOpen = !closed.includes("profil");

    return (
        <section id="home" className="relative h-dvh min-h-[700px] overflow-hidden">
            <DesktopIcons />

            <div className="relative z-10 flex h-full items-center px-6 pb-16 sm:px-10 lg:pl-28">
                <motion.div
                    variants={container}
                    initial={reduce ? false : "hidden"}
                    animate="show"
                    className="w-full lg:max-w-[58%]"
                >
                    <motion.div variants={item} className="mb-4 flex items-baseline gap-3 leading-none">
                        <span className="font-serif text-[32px] italic text-lime sm:text-[40px]">Hey,</span>
                        <span className="font-serif text-[44px] italic text-text sm:text-[56px]">I’m</span>
                    </motion.div>

                    <h1 className="font-display text-[clamp(3.25rem,9vw,8rem)] leading-[0.95] tracking-[-0.03em]">
                        <motion.span variants={item} className="block text-text">
                            M. Asad
                        </motion.span>
                        <motion.span variants={item} className="relative inline-block">
                            <span className="bg-accent-gradient bg-clip-text text-transparent">Farhan K</span>
                            <svg
                                viewBox="0 0 520 24"
                                fill="none"
                                aria-hidden="true"
                                className="absolute left-0 top-full -mt-1 w-full"
                            >
                                <defs>
                                    <linearGradient id="brush-grad" x1="0" x2="1" y1="0" y2="0">
                                        <stop offset="0" stopColor="#B8F23A" />
                                        <stop offset="1" stopColor="#2DD4BF" />
                                    </linearGradient>
                                </defs>
                                <motion.path
                                    variants={brush}
                                    d="M4 17C120 7 300 5 470 11c25 1 38-2 46-8"
                                    stroke="url(#brush-grad)"
                                    strokeWidth="5"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </motion.span>
                    </h1>

                    <motion.div
                        variants={item}
                        className={`max-w-[520px] transition-[margin] duration-200 ${profilOpen ? "mt-8" : "mt-6"}`}
                    >
                        <WindowFrame
                            id="profil"
                            title="Profil.txt - Notepad"
                            icon={<FileIcon className="h-4 w-4" />}
                            collapseOnClose
                        >
                            <p className="border-t border-white/10 px-4 py-3 font-mono text-[13px] text-text">
                                Informatics Student • UIN Sunan Gunung Djati Bandung
                            </p>
                        </WindowFrame>
                    </motion.div>

                    <motion.div variants={item} className="mt-7 flex flex-wrap gap-3">
                        <button
                            type="button"
                            onClick={() => scrollToSection("tugas")}
                            className="inline-flex h-[52px] items-center gap-2 whitespace-nowrap rounded-full bg-accent-gradient px-7 text-[15px] font-semibold text-on-accent transition hover:brightness-110 active:scale-[0.98]"
                        >
                            Lihat Tugas
                            <ArrowDownIcon className="h-4 w-4" />
                        </button>
                        <button
                            type="button"
                            onClick={() => scrollToSection("contact")}
                            className="inline-flex h-[52px] items-center gap-2 whitespace-nowrap rounded-full border border-white/20 bg-white/5 px-7 text-[15px] font-semibold text-text backdrop-blur-md transition hover:bg-white/10 active:scale-[0.98]"
                        >
                            Contact
                            <ArrowUpRightIcon className="h-4 w-4" />
                        </button>
                    </motion.div>
                </motion.div>
            </div>

            <HeroCharacter />

            <motion.button
                type="button"
                aria-label="Gulir ke Tugas"
                onClick={() => scrollToSection("tugas")}
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.4, duration: 0.5 }}
                className="absolute bottom-24 left-1/2 z-10 -translate-x-1/2 text-text-2 transition-colors hover:text-text"
            >
                <svg width="24" height="36" viewBox="0 0 24 36" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                    <rect x="2" y="2" width="20" height="32" rx="10" />
                    <path d="M12 9v6" />
                </svg>
            </motion.button>
        </section>
    );
}