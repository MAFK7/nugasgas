"use client";

import { AnimatePresence, motion, type Variants } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import {
    cari,
    kelompokPerSemester,
    semuaTugas,
    urutkan,
    type FolderSemester,
    type Tugas,
    type UrutMode,
} from "@/data/tugas";
import { salinTeks } from "@/lib/clipboard";
import AddressBar from "./AddressBar";
import ContextMenu, { type MenuItem } from "./ContextMenu";
import DetailsView from "./DetailsView";
import FolderView from "./FolderView";
import RootView from "./RootView";
import Sidebar from "./Sidebar";
import StatusBar from "./StatusBar";
import Toast from "./Toast";
import Toolbar from "./Toolbar";
import { keyOf, PER_HALAMAN, type Aksi, type Item, type Lokasi, type Tampilan } from "./types";

const FOLDERS = kelompokPerSemester();

const slide: Variants = {
    masuk: (d: number) => ({ opacity: 0, x: d * 28 }),
    tengah: { opacity: 1, x: 0 },
    keluar: (d: number) => ({ opacity: 0, x: d * -28 }),
};

const kedalaman = (l: Lokasi) => (l === null ? 0 : 1);

/** Alamat browser untuk sebuah folder: / atau /semester-N. */
const pathDari = (l: Lokasi) => (l === null ? "/" : `/semester-${l}`);

/** Kebalikannya; alamat yang tidak dikenal dianggap root. */
function lokasiDariPath(path: string): Lokasi {
    const m = /^\/semester-(\d+)\/?$/.exec(path);
    if (!m) return null;
    const n = Number(m[1]);
    return FOLDERS.some((f) => f.semester === n) ? n : null;
}

/** Arah geser: masuk lebih dalam / semester lebih besar = dari kanan. */
function arah(dari: Lokasi, ke: Lokasi): 1 | -1 {
    if (kedalaman(dari) !== kedalaman(ke)) return kedalaman(ke) > kedalaman(dari) ? 1 : -1;
    return (ke ?? 0) > (dari ?? 0) ? 1 : -1;
}

/** Urutan folder di root: terbaru = semester terbesar dulu, selain itu naik. */
function urutFolder(folders: FolderSemester[], mode: UrutMode): FolderSemester[] {
    const salin = [...folders];
    return mode === "terbaru"
        ? salin.sort((a, b) => b.semester - a.semester)
        : salin.sort((a, b) => a.semester - b.semester);
}

export default function Explorer({ semesterAwal = null }: { semesterAwal?: number | null }) {
    const [nav, setNav] = useState<{ stack: Lokasi[]; i: number }>({ stack: [semesterAwal], i: 0 });
    const [dir, setDir] = useState<1 | -1>(1);
    const [page, setPage] = useState(1);
    const [now, setNow] = useState<Date | null>(null);
    const [kueri, setKueri] = useState("");
    const [urutPilih, setUrutPilih] = useState<UrutMode | null>(null);
    const [tampilan, setTampilan] = useState<Tampilan>("grid");
    const [terpilih, setTerpilih] = useState<string | null>(null);
    const [menu, setMenu] = useState<{ item: Item; x: number; y: number } | null>(null);
    const [toast, setToast] = useState<string | null>(null);

    const rootRef = useRef<HTMLDivElement>(null);
    const areaRef = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLInputElement>(null);
    const toastTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

    // Label "Baru" dihitung di klien supaya tidak basi di halaman statis
    useEffect(() => {
        const t = setTimeout(() => setNow(new Date()), 0);
        return () => clearTimeout(t);
    }, []);

    useEffect(() => () => clearTimeout(toastTimer.current), []);

    // Riwayat browser: tombol back/forward browser menggerakkan folder
    const navRef = useRef(nav);
    useEffect(() => {
        navRef.current = nav;
    });

    useEffect(() => {
        const onPop = () => {
            const tujuan = lokasiDariPath(window.location.pathname);
            const { stack, i } = navRef.current;
            const sekarang = stack[i];
            if (tujuan === sekarang) return;
            setDir(arah(sekarang, tujuan));
            if (i > 0 && stack[i - 1] === tujuan) setNav({ stack, i: i - 1 });
            else if (i < stack.length - 1 && stack[i + 1] === tujuan) setNav({ stack, i: i + 1 });
            else setNav({ stack: [...stack.slice(0, i + 1), tujuan], i: i + 1 }); // alamat tak dikenal: entri baru
            setKueri("");
            setPage(1);
            setTerpilih(null);
            setMenu(null);
        };
        window.addEventListener("popstate", onPop);
        return () => window.removeEventListener("popstate", onPop);
    }, []);

    const lokasi = nav.stack[nav.i];
    const folder = lokasi === null ? null : (FOLDERS.find((f) => f.semester === lokasi) ?? null);
    const modeHasil = lokasi === null && kueri.trim() !== "";

    // Default urutan: root = semester naik, di dalam folder = pertemuan terbaru
    const urut: UrutMode = urutPilih ?? (lokasi === null ? "semester" : "terbaru");

    const semua = useMemo<Item[]>(() => {
        if (folder || modeHasil) {
            const dasar = folder ? folder.items : semuaTugas;
            return urutkan(cari(dasar, kueri), urut).map((tugas): Item => ({ kind: "tugas", tugas }));
        }
        return urutFolder(FOLDERS, urut).map(
            (f): Item => ({ kind: "folder", semester: f.semester, jumlah: f.items.length }),
        );
    }, [folder, modeHasil, kueri, urut]);

    const berhalaman = folder !== null || modeHasil;
    const jumlahHalaman = berhalaman ? Math.max(1, Math.ceil(semua.length / PER_HALAMAN)) : 1;
    const halaman = Math.min(page, jumlahHalaman);
    const tampil = berhalaman ? semua.slice((halaman - 1) * PER_HALAMAN, halaman * PER_HALAMAN) : semua;
    const itemTerpilih = tampil.find((it) => keyOf(it) === terpilih);

    /* ---------- Navigasi ---------- */

    const reset = () => {
        setKueri("");
        setPage(1);
        setTerpilih(null);
        setMenu(null);
    };

    const ke = (tujuan: Lokasi) => {
        if (tujuan === lokasi) {
            if (kueri) reset(); // klik "Tugas" di breadcrumb menghapus pencarian
            return;
        }
        setDir(arah(lokasi, tujuan));
        setNav(({ stack, i }) => ({ stack: [...stack.slice(0, i + 1), tujuan], i: i + 1 }));
        window.history.pushState(null, "", pathDari(tujuan));
        reset();
    };

    // Mundur dan maju memakai riwayat browser; perubahan state ditangani handler popstate
    const mundur = () => {
        if (nav.i === 0) return;
        window.history.back();
    };

    const maju = () => {
        if (nav.i >= nav.stack.length - 1) return;
        window.history.forward();
    };

    const naik = () => {
        if (lokasi !== null) ke(null);
    };

    const gantiHalaman = (p: number) => {
        setPage(p);
        setTerpilih(null);
        areaRef.current?.scrollTo({ top: 0 });
    };

    const ubahKueri = (v: string) => {
        setKueri(v);
        setPage(1);
        setTerpilih(null);
    };

    /* ---------- Aksi item ---------- */

    const fokusRoot = useCallback(() => rootRef.current?.focus({ preventScroll: true }), []);

    const tutupMenu = useCallback(() => {
        setMenu(null);
        rootRef.current?.focus({ preventScroll: true });
    }, []);

    const bukaItem = (it: Item) => {
        if (it.kind === "folder") ke(it.semester);
        else window.location.assign(it.tugas.url);
    };

    const tampilToast = (pesan: string) => {
        setToast(pesan);
        clearTimeout(toastTimer.current);
        toastTimer.current = setTimeout(() => setToast(null), 2200);
    };

    const salinTautan = async (t: Tugas) => {
        const ok = await salinTeks(new URL(t.url, window.location.origin).href);
        tampilToast(ok ? "Tautan disalin" : "Gagal menyalin tautan");
    };

    const buatMenu = (it: Item): MenuItem[] => {
        if (it.kind === "folder") {
            return [{ label: "Buka", onPilih: () => { tutupMenu(); bukaItem(it); } }];
        }
        const t = it.tugas;
        return [
            { label: "Buka", onPilih: () => { tutupMenu(); bukaItem(it); } },
            {
                label: "Buka di tab baru",
                onPilih: () => {
                    tutupMenu();
                    window.open(t.url, "_blank", "noopener,noreferrer");
                },
            },
            { label: "Salin tautan", onPilih: () => { tutupMenu(); void salinTautan(t); } },
        ];
    };

    const aksi: Aksi = {
        terpilih,
        onPilih: setTerpilih,
        onBuka: bukaItem,
        onMenu: (item, x, y) => setMenu({ item, x, y }),
    };

    /* ---------- Keyboard ---------- */

    const pindah = (tombol: string) => {
        const keys = tampil.map(keyOf);
        if (keys.length === 0) return;
        const idx = terpilih ? keys.indexOf(terpilih) : -1;
        if (idx === -1) {
            setTerpilih(keys[0]);
            return;
        }
        const grid = areaRef.current?.querySelector<HTMLElement>("[data-grid]");
        const kolom = grid ? window.getComputedStyle(grid).gridTemplateColumns.split(" ").length : 1;
        let n = idx;
        if (tombol === "ArrowRight") n = idx + 1;
        else if (tombol === "ArrowLeft") n = idx - 1;
        else if (tombol === "ArrowDown") n = idx + kolom;
        else if (tombol === "ArrowUp") n = idx - kolom;
        if (n >= 0 && n < keys.length) setTerpilih(keys[n]);
    };

    // Seleksi yang digeser lewat keyboard ikut digulirkan ke area terlihat
    useEffect(() => {
        if (!terpilih) return;
        const el = Array.from(areaRef.current?.querySelectorAll<HTMLElement>("[data-key]") ?? []).find(
            (e) => e.dataset.key === terpilih,
        );
        el?.scrollIntoView({ block: "nearest" });
    }, [terpilih]);

    const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
        if (menu) return;

        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "f") {
            e.preventDefault();
            searchRef.current?.focus();
            searchRef.current?.select();
            return;
        }

        // Tombol daftar hanya berlaku saat area Explorer yang fokus (bukan input atau tombol)
        if (e.target !== e.currentTarget) return;

        switch (e.key) {
            case "ArrowRight":
            case "ArrowLeft":
            case "ArrowDown":
            case "ArrowUp":
                e.preventDefault();
                pindah(e.key);
                break;
            case "Enter":
                if (itemTerpilih) {
                    e.preventDefault();
                    bukaItem(itemTerpilih);
                }
                break;
            case "Backspace":
                e.preventDefault();
                naik();
                break;
        }
    };

    /* ---------- Tampilan ---------- */

    const konten =
        tampil.length === 0 ? (
            <p className="py-10 text-center text-sm text-text-2">Tidak ada item yang cocok dengan pencarian.</p>
        ) : tampilan === "details" ? (
            <DetailsView items={tampil} now={now} aksi={aksi} />
        ) : berhalaman ? (
            <FolderView items={tampil} now={now} aksi={aksi} />
        ) : (
            <RootView items={tampil} aksi={aksi} />
        );

    return (
        <div
            ref={rootRef}
            tabIndex={0}
            onKeyDown={onKeyDown}
            className="flex h-full min-h-[600px] flex-col outline-none"
        >
            <Toolbar
                urut={urut}
                onUrut={(m) => {
                    setUrutPilih(m);
                    setPage(1);
                }}
                tampilan={tampilan}
                onTampilan={setTampilan}
                kueri={kueri}
                onKueri={ubahKueri}
                searchRef={searchRef}
                onKeDaftar={fokusRoot}
            />

            <AddressBar
                lokasi={lokasi}
                hasil={modeHasil}
                bisaMundur={nav.i > 0}
                bisaMaju={nav.i < nav.stack.length - 1}
                onMundur={mundur}
                onMaju={maju}
                onNaik={naik}
                onKe={ke}
            />

            <div className="flex min-h-0 flex-1 flex-col md:flex-row">
                <Sidebar folders={FOLDERS} aktif={lokasi} onKe={ke} />

                <div className="relative min-h-0 flex-1 overflow-hidden">
                    <AnimatePresence mode="wait" initial={false} custom={dir}>
                        <motion.div
                            key={lokasi ?? "root"}
                            ref={areaRef}
                            custom={dir}
                            variants={slide}
                            initial="masuk"
                            animate="tengah"
                            exit="keluar"
                            transition={{ duration: 0.14, ease: "easeOut" }}
                            onClick={() => setTerpilih(null)}
                            className="scroll-thin h-full overflow-y-auto p-5"
                        >
                            {konten}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            <StatusBar
                jumlah={semua.length}
                halaman={halaman}
                jumlahHalaman={jumlahHalaman}
                onHalaman={gantiHalaman}
            />

            {menu && <ContextMenu x={menu.x} y={menu.y} items={buatMenu(menu.item)} onTutup={tutupMenu} />}
            <Toast pesan={toast} />
        </div>
    );
}