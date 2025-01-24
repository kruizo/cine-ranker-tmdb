import { IMovieCollection } from "@customTypes/index";
import CardsList from "./CardsList";
import { fetchDiscoverMovies } from "../api";
import { Fragment, useState, useEffect } from "react";
import ScrollableCardsList from "./ScrollableCardsList";

interface FilteredListCardProps {
  keywords?: string;
  genres?: string;
  include_adult?: boolean;
  title: string;
  companyIds?: Array<string>;
  sort_by: string;
}

const FilteredListCard: React.FC<FilteredListCardProps> = ({
  keywords,
  genres,
  include_adult,
  title,
  companyIds = [],
  sort_by,
}) => {
  const [filteredMovies, setFilteredMovies] = useState<IMovieCollection | null>(
    null
  );

  const companyIdsString = companyIds.map((id) => id.toString()).join("|");

  useEffect(() => {
    const getMovies = async () => {
      try {
        console.log("Fetching movies...");

        const response = await fetchDiscoverMovies({
          page: 1,
          keywords: keywords,
          genres: genres,
          companyIds: companyIdsString,
          sort_by: sort_by,
        });
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
              DISCOVER FROM {title?.toUpperCase()}
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
