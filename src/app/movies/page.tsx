"use client";

import { useSearchParams } from "next/navigation";
import Navbar from "@components/Navbar";
import Sidepanel from "@components/Sidepanel";
import GenreList from "@components/GenreList";
import { MovieListCards } from "@components/ListCards";
import TrendingList from "@components/TrendingList";
import UpcomingList from "@components/UpcomingList";

const Movies = () => {
  const params = useSearchParams();
  const genres = params.getAll("q");

  return (
    <div className="font-[family-name:var(--font-geist-sans)]" id="app">
      <Navbar />
      <main className="flex gap-8 items-start sm:items-start mx-auto max-w-6xl pt-28 px-5 max-auto">
        <>
          <Sidepanel>
            <GenreList category="movies" />
          </Sidepanel>
          <MovieListCards genres={genres} />
          <div className="pt-20 hidden xl:block ">
            <Sidepanel>
              <TrendingList />
              <UpcomingList />
            </Sidepanel>
          </div>
        </>
      </main>
    </div>
  );
};

export default Movies;
