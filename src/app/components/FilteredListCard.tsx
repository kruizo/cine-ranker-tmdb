import { IMovieCollection } from "@customTypes/index";
import CardsList from "./CardsList";
import { fetchLatestMovies } from "../api";
import { Fragment, useState, useEffect } from "react";
import ScrollableCardsList from "./ScrollableCardsList";

interface FilteredListCardProps {
  keywords?: string;
  genres?: string;
}

const FilteredListCard: React.FC<FilteredListCardProps> = ({
  keywords,
  genres,
}) => {
  const [filteredMovies, setFilteredMovies] = useState<IMovieCollection | null>(
    null
  );

  useEffect(() => {
    const getMovies = async () => {
      try {
        console.log("Fetching movies...");

        const response = await fetchLatestMovies(1, keywords, genres);
        setFilteredMovies(response);
        console.log(response);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    getMovies();
  }, []);
  return (
    <Fragment>
      {filteredMovies && (
        <div className="py-7">
          <div className="flex justify-between items-center">
            <h1 className="border-l-[var(--accent)] border-l-[12px] px-4 text-3xl font-extrabold text-primary-content">
              DISCOVER FROM {keywords?.toUpperCase()}
            </h1>
          </div>
          <div className="py-4">
            <ScrollableCardsList movies={filteredMovies} />
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default FilteredListCard;
