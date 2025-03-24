"use client";

import { useSearchParams } from "next/navigation";
import Navbar from "@components/Navbar";
import Sidepanel from "@components/Sidepanel";
import GenreList from "@components/GenreList";
import { BrowseListCards } from "@components/ListCards";
import TrendingList from "@components/TrendingList";
import UpcomingList from "@components/UpcomingList";
import { Suspense } from "react";

const MoviesContent = () => {
  const params = useSearchParams();
  const genres = params.getAll("q");

  return (
    <>
      <Sidepanel>
        <GenreList category="movies" />
      </Sidepanel>
      <BrowseListCards
        category="movies"
        genres={genres}
        title="Browse movies"
      />
      <div className="pt-20 hidden xl:block ">
        <Sidepanel>
          <TrendingList />
          <UpcomingList />
        </Sidepanel>
      </div>
    </>
  );
};

const Movies = () => {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]" id="app">
      <Navbar />
      <main className="flex gap-8 items-start justify-between sm:items-start mx-auto max-w-6xl pt-28 px-5 max-auto">
        <Suspense fallback={<div>Loading movies...</div>}>
          <MoviesContent />
        </Suspense>
      </main>
    </div>
  );
};

export default Movies;
