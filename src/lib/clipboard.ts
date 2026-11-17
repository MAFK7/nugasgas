/** Menyalin teks ke clipboard. Mengembalikan true jika berhasil. */
export async function salinTeks(teks: string): Promise<boolean> {
    try {
        await navigator.clipboard.writeText(teks);
        return true;
    } catch {
        // lanjut ke cara cadangan
    }
    try {
        const ta = document.createElement("textarea");
        ta.value = teks;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        const ok = document.execCommand("copy");
        document.body.removeChild(ta);
        return ok;
    } catch {
        return false;
    }
}