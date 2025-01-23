import { IMovieCollection } from "@customTypes/index";
import CardsList from "./CardsList";
import { fetchLatestMovies } from "../api";
import { Fragment, useState, useEffect } from "react";

const RecommendedListCards = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [discoverMovies, setDiscoverMovies] = useState<IMovieCollection | null>(
    null
  );
  const [hoverMovies, setHoverMovies] = useState<{
    [key: number]: IMovieCollection;
  }>({});
  const [isFetching, setIsFetching] = useState(false);

  const prefetchMovies = async (page: number) => {
    if (hoverMovies[page] || isFetching) return;
    try {
      console.log(`Pre-fetching movies for page ${page}...`);
      const response = await fetchLatestMovies(page);
      setHoverMovies((prev) => ({ ...prev, [page]: response }));
      console.log(`Pre-fetched movies for page ${page}:`, response);
    } catch (error) {
      console.error("Error prefetching movies:", error);
    }
  };

  const handlePageChange = async (page: number) => {
    if (isFetching || page < 1 || page > (discoverMovies?.total_pages || 1))
      return;

    setIsFetching(true);
    try {
      console.log(`Fetching movies for page ${page}...`);
      const response = hoverMovies[page] || (await fetchLatestMovies(page));
      setDiscoverMovies(response);
      setCurrentPage(page);
      console.log(`Movies updated for page ${page}`);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    const getMovies = async () => {
      try {
        console.log("Fetching movies...");

        const response = await fetchLatestMovies();
        setDiscoverMovies(response);
        console.log(response);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    getMovies();
  }, []);
  return (
    <Fragment>
      {discoverMovies && (
        <div className="py-7">
          <div className="flex justify-between ">
            <div className="flex gap-2 items-center">
              <h1 className="border-l-[var(--accent)] border-l-[12px] px-4 text-3xl font-extrabold text-primary-content">
                RECOMMENDED
              </h1>
              <button className="text-sm rounded-lg px-2 py-1 border border-[var(--accent)] text-[var(--accent)] hover:text-white hover:bg-[var(--accent)] hover:border-[var(--accent)] transition-colors">
                MOVIES
              </button>
              <button className="text-sm rounded-lg px-2 py-1 border border-[var(--base-gray)] text-[var(--base-gray)] hover:text-white hover:bg-[var(--accent)] hover:border-[var(--accent)] transition-colors">
                TV SHOWS
              </button>
            </div>
            <div className="flex justify-center items-center gap-2 ">
              <button
                className={` px-3 py-2 transition-colors rounded-md ${
                  currentPage != 1
                    ? "text-[var(--accent)] hover:text-[var(--accent)] hover:bg-[var(--accent)] border border-[var(--accent)]"
                    : "border border-[var(--base-gray)] text-[var(--base-gray)] "
                }`}
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                <i
                  className="fa fa-angle-left"
                  style={{ fontSize: "25px" }}
                ></i>
              </button>
              <button
                className={` px-3 py-2 transition-colors rounded-md ${
                  currentPage != discoverMovies.total_pages
                    ? "text-[var(--accent)] hover:text-[var(--accent)] hover:bg-[var(--accent)] border border-[var(--accent)]"
                    : "border border-[var(--base-gray)] text-[var(--base-gray)] "
                }`}
                disabled={currentPage === discoverMovies.total_pages}
                onClick={() => handlePageChange(currentPage + 1)}
                onMouseEnter={() => prefetchMovies(currentPage + 1)}
              >
                <i
                  className="fa fa-angle-right"
                  style={{ fontSize: "25px" }}
                ></i>
              </button>
            </div>
          </div>
          <div className="flex py-4">
            <CardsList movies={discoverMovies} />
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default RecommendedListCards;
