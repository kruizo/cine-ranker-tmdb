"use client";

import { useSearchParams } from "next/navigation";
import Navbar from "@components/Navbar";
import Sidepanel from "@components/Sidepanel";
import GenreList from "@components/GenreList";
import TrendingList from "@components/TrendingList";
import UpcomingList from "@components/UpcomingList";
import { BrowseListCards } from "@components/ListCards";
import { Suspense } from "react";

const TVShowsContent = () => {
  const params = useSearchParams();
  const genres = params.getAll("q");

  return (
    <>
      <Sidepanel>
        <GenreList category="tv" />
      </Sidepanel>
      <BrowseListCards category="tv" genres={genres} title="Browse TV Shows" />
      <div className="pt-20 hidden xl:block ">
        <Sidepanel>
          <TrendingList />
          <UpcomingList />
        </Sidepanel>
      </div>
    </>
  );
};

const TVShows = () => {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]" id="app">
      <Navbar />
      <main className="flex gap-8 items-start sm:items-start mx-auto max-w-6xl pt-28 px-5 max-auto">
        <Suspense fallback={<div>Loading TV shows...</div>}>
          <TVShowsContent />
        </Suspense>
      </main>
    </div>
  );
};

export default TVShows;
