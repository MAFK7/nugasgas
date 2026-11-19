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

export function FileIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
            <path
                className="fill-folder"
                d="M6.5 2.5h7.7l5.3 5.3v12.2a1.5 1.5 0 0 1-1.5 1.5h-11.5A1.5 1.5 0 0 1 5 20V4a1.5 1.5 0 0 1 1.5-1.5Z"
            />
            <path
                d="M8.5 12h7M8.5 15.5h7"
                stroke="#06120F"
                strokeOpacity=".55"
                strokeWidth="1.4"
                strokeLinecap="round"
                fill="none"
            />
        </svg>
    );
}

export function ArrowDownIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
            <path d="M12 4v16m0 0-6-6m6 6 6-6" />
        </svg>
    );
}

export function ArrowUpRightIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
            <path d="M7 17 17 7M8 7h9v9" />
        </svg>
    );
}

const strokeProps = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
} as const;

export function ArrowLeftIcon({ className }: P) {
    return (
        <svg viewBox="0 0 24 24" {...strokeProps} className={className} aria-hidden="true">
            <path d="M19 12H5m0 0 6-6m-6 6 6 6" />
        </svg>
    );
}

export function ArrowRightIcon({ className }: P) {
    return (
        <svg viewBox="0 0 24 24" {...strokeProps} className={className} aria-hidden="true">
            <path d="M5 12h14m0 0-6-6m6 6-6 6" />
        </svg>
    );
}

export function ArrowUpIcon({ className }: P) {
    return (
        <svg viewBox="0 0 24 24" {...strokeProps} className={className} aria-hidden="true">
            <path d="M12 19V5m0 0-6 6m6-6 6 6" />
        </svg>
    );
}

export function ChevronRightIcon({ className }: P) {
    return (
        <svg viewBox="0 0 24 24" {...strokeProps} className={className} aria-hidden="true">
            <path d="m9 6 6 6-6 6" />
        </svg>
    );
}

export function ComputerIcon({ className }: P) {
    return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
            <rect x="3" y="4" width="18" height="12" rx="2" fill="currentColor" />
            <path d="M8 20h8M12 16v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
        </svg>
    );
}

export function GridIcon({ className }: P) {
    return (
        <svg viewBox="0 0 24 24" {...strokeProps} className={className} aria-hidden="true">
            <rect x="4" y="4" width="6.5" height="6.5" rx="1" />
            <rect x="13.5" y="4" width="6.5" height="6.5" rx="1" />
            <rect x="4" y="13.5" width="6.5" height="6.5" rx="1" />
            <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1" />
        </svg>
    );
}

export function ListIcon({ className }: P) {
    return (
        <svg viewBox="0 0 24 24" {...strokeProps} className={className} aria-hidden="true">
            <path d="M9 6h11M9 12h11M9 18h11M4.5 6h.01M4.5 12h.01M4.5 18h.01" />
        </svg>
    );
}

export function SearchIcon({ className }: P) {
    return (
        <svg viewBox="0 0 24 24" {...strokeProps} className={className} aria-hidden="true">
            <circle cx="11" cy="11" r="6.5" />
            <path d="m20 20-4-4" />
        </svg>
    );
}

export function SortIcon({ className }: P) {
    return (
        <svg viewBox="0 0 24 24" {...strokeProps} className={className} aria-hidden="true">
            <path d="M4 7h16M7 12h10M10 17h4" />
        </svg>
    );
}

export function ChevronDownIcon({ className }: P) {
    return (
        <svg viewBox="0 0 24 24" {...strokeProps} className={className} aria-hidden="true">
            <path d="m6 9 6 6 6-6" />
        </svg>
    );
}

export function CheckIcon({ className }: P) {
    return (
        <svg viewBox="0 0 24 24" {...strokeProps} className={className} aria-hidden="true">
            <path d="m5 12.5 4.5 4.5L19 7.5" />
        </svg>
    );
}

export function XIcon({ className }: P) {
    return (
        <svg viewBox="0 0 24 24" {...strokeProps} className={className} aria-hidden="true">
            <path d="M6 6l12 12M18 6 6 18" />
        </svg>
    );
}

export function BinIcon({ className }: P) {
    return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
            <path d="M9 4.5v-.8a.7.7 0 0 1 .7-.7h4.6a.7.7 0 0 1 .7.7v.8" fill="none" stroke="#C9D6D3" strokeWidth="1.4" strokeLinecap="round" />
            <rect x="3.5" y="4.5" width="17" height="2.2" rx="1.1" fill="#C9D6D3" />
            <path d="M5.5 8.2h13l-.95 11.1a1.7 1.7 0 0 1-1.7 1.55H8.15a1.7 1.7 0 0 1-1.7-1.55L5.5 8.2Z" fill="#A9BDB9" fillOpacity=".9" />
            <path d="M9.5 10.8v7M12 10.8v7M14.5 10.8v7" stroke="#31504C" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
    );
}