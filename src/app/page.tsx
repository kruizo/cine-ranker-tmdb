"use client";

import Hero from "@components/Hero";
import Content from "@components/Content";
import Navbar from "@components/Navbar";

const Page = () => {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]" id="app">
      <Navbar />
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-center">
        <>
          <Hero />
          <Content />
        </>
      </main>
    </div>
  );
};

export default Page;
