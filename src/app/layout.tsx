import type { Metadata, Viewport } from "next";
import { Inter, Bricolage_Grotesque, Instrument_Serif } from "next/font/google";
import { DesktopProvider } from "@/components/DesktopContext";
import MenuDesktop from "@/components/MenuDesktop";
import RegistrasiSW from "@/components/RegistrasiSW";
import Wallpaper from "@/components/Wallpaper";
import { META } from "@/data/meta";
import { SITUS_URL } from "@/lib/situs";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: "800",
  variable: "--font-bricolage",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITUS_URL),
  title: META.judul,
  description: META.deskripsi,
  applicationName: META.nama,
  icons: {
    icon: [{ url: "/icon-192.png", sizes: "192x192", type: "image/png" }],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: META.nama,
    title: META.judul,
    description: META.deskripsi,
    images: [META.gambar],
  },
  twitter: {
    card: "summary_large_image",
    title: META.judul,
    description: META.deskripsi,
    images: [META.gambar.url],
  },
};

export const viewport: Viewport = {
  themeColor: META.warnaTema,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="id"
      className={`${inter.variable} ${bricolage.variable} ${instrumentSerif.variable}`}
    >
      <body>
        <DesktopProvider>
          <Wallpaper />
          {children}
          <MenuDesktop />
        </DesktopProvider>
        <RegistrasiSW />
      </body>
    </html>
  );
}