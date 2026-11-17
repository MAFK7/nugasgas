import { createPortal } from "react-dom";

export default function Toast({ pesan }: { pesan: string | null }) {
    if (!pesan) return null;
    return createPortal(
        <div
            role="status"
            className="mica flyout fixed bottom-24 left-1/2 z-[70] -translate-x-1/2 rounded-lg px-4 py-2 text-[13px] text-text"
        >
            {pesan}
        </div>,
        document.body,
    );
}