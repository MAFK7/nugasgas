import ContactSection from "./ContactSection";
import Hero from "./Hero";
import Taskbar from "./Taskbar";
import TugasSection from "./TugasSection";

/** Satu halaman utama; semesterAwal menentukan folder yang terbuka saat halaman dimuat. */
export default function Beranda({ semesterAwal = null }: { semesterAwal?: number | null }) {
    return (
        <>
            <main>
                <Hero />
                <TugasSection semesterAwal={semesterAwal} />
                <ContactSection />
            </main>
            <Taskbar />
        </>
    );
}