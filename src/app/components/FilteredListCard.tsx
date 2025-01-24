import { IMovieCollection } from "@customTypes/index";
import CardsList from "./CardsList";
import { fetchDiscoverMovies } from "../api";
import { Fragment, useState, useEffect } from "react";
import ScrollableCardsList from "./ScrollableCardsList";
import GenresList from "@data/genre";

interface FilteredListCardProps {
  keywords?: string;
  genres?: Array<string> | string;
  include_adult?: boolean;
  title: string;
  category?: "movies" | "tv";
  companyIds?: Array<string>;
  sort_by?: string;
  exact_genre?: boolean;
}

const FilteredListCard: React.FC<FilteredListCardProps> = ({
  keywords,
  genres,
  include_adult,
  category = "movies",
  title,
  companyIds = [],
  sort_by,
  exact_genre,
}) => {
  const [filteredMovies, setFilteredMovies] = useState<IMovieCollection | null>(
    null
  );

  const companyIdsString = companyIds.map((id) => id.toString()).join("|");

  useEffect(() => {
    const getMovies = async () => {
      try {
        const genreString = genres && getGenreIdByName(genres);

        const response = await fetchDiscoverMovies({
          page: 1,
          keywords: keywords,
          genres: genreString,
          companyIds: companyIdsString,
          minVoteAverage: 5,
          releaseYearAfter: 2010,
        });
        setFilteredMovies(response);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    getMovies();
  }, []);

  const getGenreIdByName = (names: Array<string> | string) => {
    let genreString = "";

    if (Array.isArray(genres)) {
      const genreIds = genres
        .map((genreName) => {
          const genre = GenresList.find(
            (g) => g.name.toLowerCase() === genreName.toLowerCase()
          );
          return genre?.id;
        })
        .filter(Boolean);
      const result = exact_genre ? genreIds.join(",") : genreIds.join("|");

      return result;
    } else if (typeof genres === "string") {
      const genre = GenresList.find(
        (g) => g.name.toLowerCase() === genres.toLowerCase()
      );
      genreString = genre?.id ? genre.id.toString() : "";
    }
    return genreString;
  };
  return (
    <Fragment>
      {filteredMovies && (
        <div className="py-7">
          <div className="flex justify-between items-center">
            <h1 className="text-lg sm:text-xl md:text-3xl border-l-[var(--accent)] border-l-[12px] px-4 font-extrabold text-primary-content">
              {title?.toUpperCase()}
            </h1>
          </div>
          <div className="py-4">
            <ScrollableCardsList category={category} items={filteredMovies} />
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default FilteredListCard;
