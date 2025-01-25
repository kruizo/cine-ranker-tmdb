import { IMovieCollection } from "@customTypes/index";
import { fetchDiscoverMovies } from "../api";
import { useState, useEffect } from "react";
import ScrollableCardsList from "./ScrollableCardsList";
import { getGenreIdByName } from "@utils/script";

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
        const genreString = genres && getGenreIdByName(genres, exact_genre);

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

  return (
    <>
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
    </>
  );
};

export default FilteredListCard;
