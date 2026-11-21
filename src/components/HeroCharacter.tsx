"use client";

import { motion, useReducedMotion, useSpring } from "motion/react";
import { useEffect } from "react";
import { scrollToSection } from "@/lib/scroll";

export default function HeroCharacter() {
    const reduce = useReducedMotion();
    const tilt = useSpring(0, { stiffness: 70, damping: 16 });

    // Condong halus ke arah kursor, tetap menempel di tepi kanan
    useEffect(() => {
        if (reduce) return;
        const onMove = (e: MouseEvent) => {
            const x = (e.clientX / window.innerWidth) * 2 - 1; // -1 kiri ... 1 kanan
            tilt.set(x < 0 ? x * 3 : x * 0.8);
        };
        window.addEventListener("mousemove", onMove, { passive: true });
        return () => window.removeEventListener("mousemove", onMove);
    }, [reduce, tilt]);

    return (
        <motion.div
            className="pointer-events-none absolute right-0 top-4 z-0 h-[clamp(220px,72vw,320px)] md:h-[360px] lg:bottom-0 lg:top-auto lg:z-10 lg:h-[80%]"
            style={{ transformOrigin: "100% 100%" }}
            initial={reduce ? false : { x: "105%" }}
            animate={{ x: 0 }}
            transition={{ duration: 0.9, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
            {/* Goyang kecil sekali setelah masuk */}
            <motion.div
                className="h-full"
                style={{ transformOrigin: "100% 100%" }}
                animate={reduce ? undefined : { rotate: [0, -3, 2.5, -2, 1, 0] }}
                transition={{ delay: 2.1, duration: 1.4, ease: "easeInOut" }}
            >
                <motion.div
                    className="relative h-full"
                    style={{ rotate: reduce ? 0 : tilt, transformOrigin: "100% 100%" }}
                >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="/karakter-hero.png"
                        alt="Karakter kartun M. Asad Farhan K sedang melambai"
                        draggable={false}
                        className="h-full w-auto max-w-none select-none"
                    />

                    <motion.button
                        type="button"
                        onClick={() => scrollToSection("tugas")}
                        initial={reduce ? false : { opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ delay: 2.0, duration: 0.3 }}
                        className="pointer-events-auto absolute right-full top-[14%] mr-2 hidden whitespace-nowrap rounded-2xl bg-text px-4 py-2.5 text-sm font-semibold text-on-accent shadow-lg lg:block"
                    >
                        Yuk, lihat tugas saya!
                        <span
                            aria-hidden="true"
                            className="absolute -right-1.5 top-1/2 h-3 w-3 -translate-y-1/2 rotate-45 bg-text"
                        />
                    </motion.button>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}