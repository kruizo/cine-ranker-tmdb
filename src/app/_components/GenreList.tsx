import React, { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import GenresList from "@/app/_data/genre";
import GenreItem from "./GenreItem";

interface GenreListProps {
  category: "tv" | "movies";
}
const GenreList: React.FC<GenreListProps> = ({ category }) => {
  const searchParams = useSearchParams();

  const currentQueries = useMemo(
    () => new URLSearchParams(searchParams.toString()),
    [searchParams]
  );

  // Get active genres from the URL query string, normalized to lowercase
  const activeGenresFromQuery = useMemo(
    () => currentQueries.getAll("q").map((genre) => genre.toLowerCase()),
    [currentQueries]
  );

  const [activeGenres, setActiveGenres] = useState<string[]>(
    activeGenresFromQuery
  );

  // Sync state with URL query string on initial render or when URL changes
  useEffect(() => {
    setActiveGenres(activeGenresFromQuery); // Update state if the URL query changes
  }, [activeGenresFromQuery]);

  // Sync URL with activeGenres state when it changes
  useEffect(() => {
    const updatedQueries = new URLSearchParams();

    if (activeGenres.length > 0) {
      activeGenres.forEach((genre) => {
        updatedQueries.append("q", genre);
      });
      window.history.replaceState(
        null,
        "",
        `/${category}?${updatedQueries.toString()}`
      );
    }

    // Update the URL without reloading the page
  }, [activeGenres]);

  // Handle genre click (toggle active state)
  const handleGenreClick = (genreName: string) => {
    const genreNameLower = genreName.toLowerCase(); // Normalize to lowercase
    setActiveGenres((prevActiveGenres) => {
      if (prevActiveGenres.includes(genreNameLower)) {
        // Remove the genre if it's already active
        return prevActiveGenres.filter((genre) => genre !== genreNameLower);
      } else {
        // Add the genre if it's not active
        return [...prevActiveGenres, genreNameLower];
      }
    });
  };

  return (
    <div className="space-y-1 mt-20">
      <div className="mb-5">
        <strong className="font-extrabold">GENRE</strong>
      </div>
      <div key={0} className="flex justify-between items-center py-2">
        <GenreItem
          genreName="All"
          href={`/${category}`}
          isActive={activeGenres.length === 0}
          onClick={() => setActiveGenres([])} // Clear all active genres
        />
      </div>

      {GenresList.map((genre) => {
        const genreName = genre.name;
        const genreNameLower = genreName.toLowerCase(); // Normalize to lowercase
        const isActive = activeGenres.includes(genreNameLower);

        const updatedQueries = new URLSearchParams(currentQueries.toString());
        if (isActive) {
          updatedQueries.delete("q", genreNameLower);
        } else {
          updatedQueries.append("q", genreNameLower);
        }

        const href = `/${category}?${updatedQueries.toString()}`;

        return (
          <GenreItem
            key={genre.id}
            genreName={genreName}
            href={href}
            isActive={isActive}
            onClick={() => handleGenreClick(genreName)} // Handle genre click toggle
          />
        );
      })}
    </div>
  );
};

export default GenreList;
