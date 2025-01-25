"use client"; // Ensure this is a client-side component

import React from "react";
import { useSearchParams } from "next/navigation";
import GenresList from "@data/genre";
import GenreItem from "./GenreItem";

const CategoriesList: React.FC = () => {
  const searchParams = useSearchParams();
  const currentQueries = new URLSearchParams(searchParams.toString());

  return (
    <div className="space-y-1 mt-20">
      <div className="mb-5">
        <strong className="font-extrabold">GENRE</strong>
      </div>
      <div key={0} className="flex justify-between items-center py-2 ">
        <GenreItem
          genreName="All"
          href={`/movies`}
          isActive={!currentQueries.has("q")}
        />
      </div>
      {GenresList.map((genre) => {
        const genreName = genre.name;

        const updatedQueries = new URLSearchParams(currentQueries.toString());

        const existingQuery = updatedQueries.getAll("q");
        if (existingQuery.includes(genreName)) {
          updatedQueries.delete("q");
        } else {
          updatedQueries.append("q", genreName);
        }

        const href = `/movies?${updatedQueries.toString()}`;
        const isActive = existingQuery.includes(genreName);

        return (
          <GenreItem
            key={genre.id}
            genreName={genreName}
            href={href}
            isActive={isActive}
          />
        );
      })}
    </div>
  );
};

export default CategoriesList;
