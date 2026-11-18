const dariVercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const SITUS_URL =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (dariVercel ? `https://nugasgas.my.id` : "http://localhost:3000");