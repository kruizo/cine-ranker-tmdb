import Image from "next/image";
import Hero from "@components/Hero";
import Navbar from "@/components/Navbar";
import Content from "@/components/Content";

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]" id="app">
      <Navbar />
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-center">
        <Hero />
        <Content />
      </main>
    </div>
  );
}
