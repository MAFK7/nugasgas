"use client";

import { useRef } from "react";
import { DOMAIN, kontak } from "@/data/kontak";
import ContactIcon from "../data/ContactIcon";
import { FileIcon } from "./icons";
import WindowFrame from "./WindowFrame";

export default function ContactSection() {
    const ref = useRef<HTMLElement>(null);

    return (
        <section
            id="contact"
            ref={ref}
            className="relative flex min-h-dvh items-center justify-center px-4 py-24 sm:px-8"
        >
            <WindowFrame
                id="contact"
                title="Contact.lnk - Pintasan Desktop"
                icon={<FileIcon className="h-4 w-4" />}
                maximizable
                draggable
                dragConstraints={ref}
                className="w-full max-w-[900px]"
            >
                <div className="flex h-full flex-col items-center justify-center px-6 py-10 sm:px-10">
                    <h2 className="text-center font-display text-3xl text-text sm:text-4xl">
                        Mau tau lebih lanjut tentang saya?
                    </h2>
                    <p className="mt-2 text-center text-sm text-text-2">Klik salah satu untuk terhubung.</p>

                    <ul className="mt-8 grid w-full grid-cols-2 gap-4 sm:grid-cols-4">
                        {kontak.map((k) => (
                            <li key={k.id} className="min-w-0">
                                <ContactIcon k={k} />
                            </li>
                        ))}
                    </ul>

                    <p className="mt-8 font-mono text-xs text-text-2">{DOMAIN}</p>
                </div>
            </WindowFrame>
        </section>
    );
}