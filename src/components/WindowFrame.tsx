"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState, type ReactNode } from "react";
import { useDesktop, type WindowId } from "./DesktopContext";

type Props = {
    id: WindowId;
    title: string;
    icon: ReactNode;
    children: ReactNode;
    className?: string;
    collapseOnClose?: boolean;
};

const ctrl =
    "grid h-9 w-11 place-items-center text-text-2 transition-colors hover:bg-white/10 hover:text-text";

export default function WindowFrame({
    id,
    title,
    icon,
    children,
    className = "",
    collapseOnClose = false,
}: Props) {
    const { closed, close } = useDesktop();
    const [collapsed, setCollapsed] = useState(false);
    const isOpen = !closed.includes(id);
    const h0 = collapseOnClose ? { height: 0 } : {};

    return (
        <AnimatePresence initial={false}>
            {isOpen && (
                <motion.div
                    key={id}
                    initial={{ opacity: 0, scale: 0.95, ...h0 }}
                    animate={{ opacity: 1, scale: 1, ...(collapseOnClose ? { height: "auto" } : {}) }}
                    exit={{ opacity: 0, scale: 0.95, ...h0 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className={`mica overflow-hidden rounded-xl ${className}`}
                >
                    <div className="flex h-9 items-center justify-between pl-3 text-xs">
                        <div className="flex min-w-0 items-center gap-2 text-text-2">
                            {icon}
                            <span className="truncate font-mono">{title}</span>
                        </div>
                        <div className="flex h-full">
                            <button
                                type="button"
                                aria-label={collapsed ? "Pulihkan" : "Kecilkan"}
                                onClick={() => setCollapsed((c) => !c)}
                                className={ctrl}
                            >
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                    <path d="M5 12h14" />
                                </svg>
                            </button>
                            <button
                                type="button"
                                aria-label="Tutup"
                                onClick={() => {
                                    setCollapsed(false);
                                    close(id);
                                }}
                                className={`${ctrl} hover:!bg-[#c42b1c] hover:!text-white`}
                            >
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                    <path d="M6 6l12 12M18 6 6 18" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <motion.div
                        initial={false}
                        animate={{ height: collapsed ? 0 : "auto", opacity: collapsed ? 0 : 1 }}
                        transition={{ duration: 0.18 }}
                        className="overflow-hidden"
                    >
                        {children}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}