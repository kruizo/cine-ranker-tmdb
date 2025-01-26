import { ITvCollection } from "@customTypes/index";
import CardsList from "../CardsList";
import { fetchDiscoverMovies } from "../../api";
import { useState, useEffect, useRef } from "react";
import { getGenreIdByName } from "@lib/script";

interface MovieListCardsProps {
  genres: Array<string>;
}

const MovieListCards: React.FC<MovieListCardsProps> = ({ genres }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [recommendedMovies, setRecommendedMovies] =
    useState<ITvCollection | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  const itemsCache = useRef<{ [key: string]: ITvCollection | null }>({});

  const checkIfCanFetch = (key: string, page: number, page_change = false) => {
    console.log("total_pages", recommendedMovies?.total_pages || 1);

    const hasCache = itemsCache.current[key];
    const hasValidPageRange =
      page > 0 && page <= (recommendedMovies?.total_pages || 1);
    const canFetch = !hasCache && !isFetching && hasValidPageRange;
    console.log(
      "Checking if can fetch:",
      canFetch,
      "hasCache-",
      hasCache ? "true" : "false",
      "hasValidPageRange-",
      hasValidPageRange,
      "isFetching-",
      isFetching
    );
    return (!hasCache && !isFetching && hasValidPageRange) || page_change;
  };

  const getListAndCacheKey = (page: number) => {
    const genreIdListString = getGenreIdByName(genres, true)
      .split(",")
      .sort()
      .join(",");
    console.log("genreIdListString", genreIdListString);
    const cacheKey = `${genreIdListString}-${page}`;
    return { genreIdListString, cacheKey };
  };

  const prefetchMovies = async (page: number) => {
    console.log("Prefetching movies from page:", page);

    const { genreIdListString, cacheKey } = getListAndCacheKey(page);

    if (!checkIfCanFetch(cacheKey, page)) return;

    try {
      const response = await fetchDiscoverMovies({
        page: page,
        minVoteAverage: 7,
        releaseYearAfter: 2015,
        genres: genreIdListString,
      });
      itemsCache.current[cacheKey] = response;
      console.log("Data cached; ", cacheKey);
    } catch (error) {
      console.error("Error prefetching movies:", error);
    }
  };

  const handlePageChange = async (page: number) => {
    const { cacheKey } = getListAndCacheKey(page);

    checkIfCanFetch(cacheKey, page, true) && setCurrentPage(page);
  };

  useEffect(() => {
    const getMovies = async () => {
      try {
        const { genreIdListString, cacheKey } = getListAndCacheKey(currentPage);

        const cachedMovies = itemsCache.current[cacheKey];
        if (cachedMovies) {
          setRecommendedMovies(cachedMovies);
          setCurrentPage(currentPage);
          setIsFetching(false);
          return;
        }

        const response = await fetchDiscoverMovies({
          page: currentPage,
          minVoteAverage: 7,
          releaseYearAfter: 2015,
          genres: genreIdListString,
        });
        //cache the response
        itemsCache.current[cacheKey] = response;
        console.log("Data cached; ", cacheKey);

        setRecommendedMovies(response);
        setCurrentPage(currentPage);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setIsFetching(false);
      }
    };
    getMovies();
  }, [genres, currentPage]);

  return (
    <>
      <div className="py-7 w-full">
        <div className="flex justify-between pb-3 ">
          <h1 className="text-lg sm:text-xl md:text-3xl border-l-[var(--accent)] border-l-[12px] px-4 font-extrabold text-primary-content">
            BROWSE MOVIES
          </h1>
        </div>
        {recommendedMovies?.results.length === 0 && (
          <div className="flex justify-center items-center h-96">
            <h1 className="text-xl text-primary-content">
              No movies found for this genre
            </h1>
          </div>
        )}
        <div className="flex py-4">
          <CardsList
            category="movies"
            items={recommendedMovies}
            maxRows={5}
            maxColumns={5}
            cardSize="large"
          />
        </div>
        {recommendedMovies && recommendedMovies.total_pages > 1 && (
          <div className="flex justify-center items-center gap-2">
            <button
              className={` px-3 py-2 transition-colors rounded-md ${
                currentPage != 1
                  ? "text-[var(--accent)] hover:text-[var(--text-white)] hover:bg-[var(--accent)] border border-[var(--accent)]"
                  : "border border-[var(--base-gray)] text-[var(--base-gray)] "
              }`}
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              onMouseEnter={() => prefetchMovies(currentPage - 1)}
            >
              <i className="fa fa-angle-left" style={{ fontSize: "25px" }}></i>
            </button>
            <button
              className={` px-3 py-2 transition-colors rounded-md ${
                currentPage != recommendedMovies.total_pages
                  ? "text-[var(--accent)] hover:text-[var(--text-white)] hover:bg-[var(--accent)] border border-[var(--accent)]"
                  : "border border-[var(--base-gray)] text-[var(--base-gray)] "
              }`}
              disabled={currentPage === recommendedMovies.total_pages}
              onClick={() => handlePageChange(currentPage + 1)}
              onMouseEnter={() => prefetchMovies(currentPage + 1)}
            >
              <i className="fa fa-angle-right" style={{ fontSize: "25px" }}></i>
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default MovieListCards;
