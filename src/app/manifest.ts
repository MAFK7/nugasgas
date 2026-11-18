import type { MetadataRoute } from "next";
import { META } from "@/data/meta";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: META.nama,
        short_name: "Tugas",
        description: META.deskripsi,
        lang: "id",
        start_url: "/",
        scope: "/",
        display: "standalone",
        background_color: META.warnaTema,
        theme_color: META.warnaTema,
        icons: [
            { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
            { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
            { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
        ],
    };
}