import Hero from "@/components/Hero";
import Taskbar from "@/components/Taskbar";
import TugasSection from "@/components/TugasSection";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <TugasSection />
        <section id="contact" className="min-h-dvh" />
      </main>
      <Taskbar />
    </>
  );
}