import { useState } from "react";
import { FileIcon } from "@/components/icons";

type Props = { src: string; className?: string; iconClass?: string };

/** Gambar pratinjau; jika file tidak ada, tampil ikon file sebagai pengganti. */
export default function Thumb({ src, className = "", iconClass = "h-12 w-12" }: Props) {
    const [gagal, setGagal] = useState(false);

    if (gagal) {
        return (
            <div className={`grid place-items-center bg-white/[0.04] ${className}`}>
                <FileIcon className={`${iconClass} opacity-80`} />
            </div>
        );
    }

    return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
            src={src}
            alt=""
            loading="lazy"
            draggable={false}
            onError={() => setGagal(true)}
            className={className}
        />
    );
}