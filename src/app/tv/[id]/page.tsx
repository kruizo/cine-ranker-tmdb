"use client";

import { useSearchParams } from "next/navigation";
import Navbar from "@components/Navbar";

const TVPage = () => {
  const params = useSearchParams();
  const genres = params.getAll("q");

  return (
    <div className="font-[family-name:var(--font-geist-sans)]" id="app">
      <Navbar />
      <main className="flex gap-8 items-start sm:items-start mx-auto max-w-6xl pt-28 px-5 max-auto"></main>
    </div>
  );
};

export default TVPage;
