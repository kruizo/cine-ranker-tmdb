"use client";

import { useEffect, useState } from "react";
import Hero from "@components/Hero";
import { fetchLatestMovies } from "./api";
import { IMovieCollection } from "./types/index";
import Content from "./components/Content";
import Navbar from "./components/Navbar";

const Page = () => {
  const [discoverMovies, setDiscoverMovies] = useState<IMovieCollection | null>(
    null
  );

  useEffect(() => {
    const getMovies = async () => {
      try {
        console.log("Fetching movies...");

        const response = await fetchLatestMovies();
        setDiscoverMovies(response);
        console.log(response);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    getMovies();
  }, []);

  const featuredMovies = discoverMovies?.results.slice(0, 5) || null;

  return (
    <div className="font-[family-name:var(--font-geist-sans)]" id="app">
      <Navbar />
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-center">
        {discoverMovies && (
          <>
            <Hero featured={featuredMovies} />
            <Content movies={discoverMovies} />
          </>
        )}
      </main>
    </div>
  );
};

export default Page;
