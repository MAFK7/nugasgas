"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

export type WindowId = "profil" | "tugas" | "contact";

type DesktopState = {
    closed: WindowId[];
    close: (id: WindowId) => void;
    reopen: (id: WindowId) => void;
};

const Ctx = createContext<DesktopState | null>(null);

export function DesktopProvider({ children }: { children: ReactNode }) {
    const [closed, setClosed] = useState<WindowId[]>([]);

    const close = useCallback(
        (id: WindowId) => setClosed((c) => (c.includes(id) ? c : [...c, id])),
        [],
    );
    const reopen = useCallback((id: WindowId) => setClosed((c) => c.filter((x) => x !== id)), []);

    const value = useMemo(() => ({ closed, close, reopen }), [closed, close, reopen]);
    return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useDesktop() {
    const v = useContext(Ctx);
    if (!v) throw new Error("useDesktop harus dipakai di dalam DesktopProvider");
    return v;
}