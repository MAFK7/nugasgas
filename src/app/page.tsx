import Taskbar from "@/components/Taskbar";

export default function Home() {
  return (
    <>
      <main>
        <section id="home" className="min-h-dvh" />
        <section id="tugas" className="min-h-dvh" />
        <section id="contact" className="min-h-dvh" />
      </main>
      <Taskbar />
    </>
  );
}