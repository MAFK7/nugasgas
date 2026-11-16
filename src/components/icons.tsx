import type { WeatherKind } from "@/lib/weather";

type P = { className?: string };

export function FolderIcon({ className }: P) {
    return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
            <path
                className="fill-folder"
                d="M2 6.5A1.5 1.5 0 0 1 3.5 5h5.2c.4 0 .78.16 1.06.44L11 6.7h9.5A1.5 1.5 0 0 1 22 8.2v9.3a1.5 1.5 0 0 1-1.5 1.5h-17A1.5 1.5 0 0 1 2 17.5v-11Z"
            />
        </svg>
    );
}

export function MailIcon({ className }: P) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            aria-hidden="true"
        >
            <rect x="3" y="5" width="18" height="14" rx="2.5" />
            <path d="m4 7.5 8 6 8-6" />
        </svg>
    );
}

const CLOUD = "M7 18a4 4 0 0 1-.6-7.95A5.5 5.5 0 0 1 17 9.5a4.25 4.25 0 0 1 .5 8.5H7Z";

export function WeatherIcon({ kind, className }: P & { kind: WeatherKind }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            aria-hidden="true"
        >
            {kind === "sun" && (
                <>
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4" />
                </>
            )}
            {kind === "partly" && (
                <>
                    <circle cx="8" cy="8" r="2.5" />
                    <path d="M8 2.5v1M2.5 8h1M4.1 4.1l.7.7M11.9 4.1l-.7.7" />
                    <path d="M9 19a3.5 3.5 0 0 1-.5-6.96A4.75 4.75 0 0 1 17.7 12 3.5 3.5 0 0 1 17.5 19H9Z" />
                </>
            )}
            {kind === "cloud" && <path d={CLOUD} />}
            {kind === "rain" && (
                <>
                    <path d="M7 15a4 4 0 0 1-.6-7.95A5.5 5.5 0 0 1 17 6.5a4.25 4.25 0 0 1 .5 8.5H7Z" />
                    <path d="M8 18.5 7 21M12.5 18.5 11.5 21M17 18.5 16 21" />
                </>
            )}
        </svg>
    );
}