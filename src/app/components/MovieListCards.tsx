import { ITvCollection } from "@customTypes/index";
import CardsList from "./CardsList";
import { fetchDiscoverMovies } from "../api";
import { useState, useEffect, useRef } from "react";
import { getGenreIdByName } from "@utils/script";

interface MovieListCardsProps {
  genres: Array<string>;
}

const MovieListCards: React.FC<MovieListCardsProps> = ({ genres }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [recommendedMovies, setRecommendedMovies] =
    useState<ITvCollection | null>(null);
  const [hoverMovies, setHoverMovies] = useState<{
    [key: number]: ITvCollection;
  }>({});

  const [isFetching, setIsFetching] = useState(false);

  // Ref to store the previously fetched movies for each genre
  const genreCache = useRef<{ [key: string]: ITvCollection | null }>({});

  const prefetchMovies = async (page: number) => {
    if (hoverMovies[page] || isFetching) return;
    try {
      const genreString = getGenreIdByName(genres, true);
      const response = await fetchDiscoverMovies({
        page: page,
        minVoteAverage: 7,
        releaseYearAfter: 2015,
        genres: genreString,
      });
      setHoverMovies((prev) => ({ ...prev, [page]: response }));
    } catch (error) {
      console.error("Error prefetching movies:", error);
    }
  };

  const handlePageChange = async (page: number) => {
    if (isFetching || page < 1 || page > (recommendedMovies?.total_pages || 1))
      return;

    setIsFetching(true);

    try {
      const genreString = getGenreIdByName(genres, true);

      const cachedMovies = genreCache.current[genreString];
      if (cachedMovies) {
        setRecommendedMovies(cachedMovies);
        setCurrentPage(page);
        setIsFetching(false);
        return;
      }

      const response =
        hoverMovies[page] ||
        (await fetchDiscoverMovies({
          page: page,
          minVoteAverage: 7,
          releaseYearAfter: 2015,
          genres: genreString,
        }));

      setRecommendedMovies(response);
      genreCache.current[genreString] = response; // Cache the result
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    const getMovies = async () => {
      try {
        const genreString = getGenreIdByName(genres, true);

        // Check cache first
        if (genreCache.current[genreString]) {
          setRecommendedMovies(genreCache.current[genreString]);
          return;
        }

        const response = await fetchDiscoverMovies({
          page: 1,
          minVoteAverage: 7,
          releaseYearAfter: 2015,
          genres: genreString,
        });
        setRecommendedMovies(response);
        genreCache.current[genreString] = response; // Cache the result
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    getMovies();
  }, [genres]);

  return (
    <>
      {recommendedMovies && (
        <div className="py-7 w-full">
          <div className="flex justify-between pb-3 ">
            <h1 className="text-lg sm:text-xl md:text-3xl border-l-[var(--accent)] border-l-[12px] px-4 font-extrabold text-primary-content">
              BROWSE MOVIES
            </h1>
          </div>
          {recommendedMovies.results.length === 0 && (
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
          {recommendedMovies.total_pages > 1 && (
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
                <i
                  className="fa fa-angle-left"
                  style={{ fontSize: "25px" }}
                ></i>
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
                <i
                  className="fa fa-angle-right"
                  style={{ fontSize: "25px" }}
                ></i>
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default MovieListCards;
