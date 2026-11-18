"use client";

import { useEffect } from "react";

/** Mendaftarkan service worker (hanya di produksi). */
export default function RegistrasiSW() {
    useEffect(() => {
        if (process.env.NODE_ENV !== "production") return;
        if (!("serviceWorker" in navigator)) return;
        navigator.serviceWorker.register("/sw.js").catch(() => { });
    }, []);

    return null;
}