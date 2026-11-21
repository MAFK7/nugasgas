type Props = {
    jumlah: number;
    halaman: number;
    jumlahHalaman: number;
    onHalaman: (p: number) => void;
};

const btn =
    "grid h-6 min-w-6 place-items-center rounded-md px-1.5 transition-colors hover:bg-white/10 hover:text-text disabled:pointer-events-none disabled:opacity-35 coarse: h-9 coarse: min - w - 9";

export default function StatusBar({ jumlah, halaman, jumlahHalaman, onHalaman }: Props) {
    return (
        <div className="flex h-9 shrink-0 items-center justify-between border-t border-white/10 px-4 font-mono text-xs text-text-2 coarse:h-12">
            <span>{jumlah} item</span>

            {jumlahHalaman > 1 && (
                <nav aria-label="Halaman" className="flex items-center gap-1">
                    <button
                        type="button"
                        aria-label="Halaman sebelumnya"
                        disabled={halaman === 1}
                        onClick={() => onHalaman(halaman - 1)}
                        className={btn}
                    >
                        ‹
                    </button>
                    {Array.from({ length: jumlahHalaman }, (_, i) => i + 1).map((p) => (
                        <button
                            key={p}
                            type="button"
                            aria-current={p === halaman ? "page" : undefined}
                            onClick={() => onHalaman(p)}
                            className={`${btn} ${p === halaman ? "bg-accent-gradient font-semibold text-on-accent hover:!text-on-accent" : ""}`}
                        >
                            {p}
                        </button>
                    ))}
                    <button
                        type="button"
                        aria-label="Halaman berikutnya"
                        disabled={halaman === jumlahHalaman}
                        onClick={() => onHalaman(halaman + 1)}
                        className={btn}
                    >
                        ›
                    </button>
                </nav>
            )}
        </div>
    );
}