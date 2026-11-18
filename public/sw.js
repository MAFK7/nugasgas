// Service worker sederhana: situs bisa dipasang di HP dan aset utama di-cache.
// Naikkan VERSI jika strategi cache diubah agar cache lama dibersihkan.
const VERSI = "v1";
const CACHE = `nugas-${VERSI}`;
const INTI = ["/", "/icon-192.png", "/icon-512.png"];

self.addEventListener("install", (e) => {
    e.waitUntil(caches.open(CACHE).then((c) => c.addAll(INTI)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
    e.waitUntil(
        caches
            .keys()
            .then((nama) => Promise.all(nama.filter((n) => n.startsWith("nugas-") && n !== CACHE).map((n) => caches.delete(n))))
            .then(() => self.clients.claim()),
    );
});

async function simpan(req, res) {
    if (res && res.ok && res.type === "basic") {
        const c = await caches.open(CACHE);
        c.put(req, res.clone());
    }
    return res;
}

self.addEventListener("fetch", (e) => {
    const req = e.request;
    if (req.method !== "GET") return;
    const url = new URL(req.url);
    if (url.origin !== self.location.origin) return; // jangan menyentuh situs lain (subdomain tugas, dll.)

    // Halaman: ambil dari jaringan dulu; jika offline pakai cache, lalu cadangan "/"
    if (req.mode === "navigate") {
        e.respondWith(
            fetch(req)
                .then((res) => simpan(req, res))
                .catch(async () => (await caches.match(req)) || (await caches.match("/")) || Response.error()),
        );
        return;
    }

    // Aset statis (hash di nama file, gambar, font): cache dulu, perbarui di latar belakang
    if (url.pathname.startsWith("/_next/static/") || /\.(png|jpe?g|webp|svg|ico|woff2?|css|js)$/.test(url.pathname)) {
        e.respondWith(
            caches.match(req).then((cache) => {
                const jaringan = fetch(req).then((res) => simpan(req, res)).catch(() => cache);
                return cache || jaringan;
            }),
        );
    }
});