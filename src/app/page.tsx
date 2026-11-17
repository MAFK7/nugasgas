import Hero from "@/components/Hero";
import Taskbar from "@/components/Taskbar";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <section id="tugas" className="min-h-dvh" />
        <section id="contact" className="min-h-dvh" />
      </main>
      <Taskbar />
    </>
  );
}