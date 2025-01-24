import { ITvCollection, ITvShow } from "@customTypes/index";
import CardsList from "./CardsList";
import {
  fetchDiscoverTVShows,
  fetchAiringToday,
  fetchTrendingTV,
} from "../api";
import { Fragment, useState, useEffect } from "react";

const PopularTVListCards = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [recommendedShows, setRecommendedMovies] =
    useState<ITvCollection | null>(null);
  const [hoverMovies, setHoverMovies] = useState<{
    [key: number]: ITvCollection;
  }>({});
  const [isFetching, setIsFetching] = useState(false);

  const prefetchMovies = async (page: number) => {
    if (hoverMovies[page] || isFetching) return;
    try {
      const response = await fetchAiringToday(page);
      setHoverMovies((prev) => ({ ...prev, [page]: response }));
    } catch (error) {
      console.error("Error prefetching movies:", error);
    }
  };

  const handlePageChange = async (page: number) => {
    if (isFetching || page < 1 || page > (recommendedShows?.total_pages || 1))
      return;

    setIsFetching(true);
    try {
      const response = hoverMovies[page] || (await fetchAiringToday(page));
      console.log(
        hoverMovies[page] ? "Data from hoverItems" : "Data from fetch"
      );
      setRecommendedMovies(response);
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
        const response = await fetchAiringToday(1);
        setRecommendedMovies(response);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    getMovies();
  }, []);

  return (
    <Fragment>
      {recommendedShows && (
        <div className="py-7">
          <div className="flex justify-between ">
            <div className="flex gap-2 items-center pb-3">
              <h1 className="text-lg sm:text-xl md:text-3xl border-l-[var(--accent)] border-l-[12px] px-4 font-extrabold text-primary-content">
                AIRING TODAY
              </h1>
            </div>
            <div className="flex justify-center items-center gap-2 ">
              <button
                className={` px-3 py-2 transition-colors rounded-md ${
                  currentPage != 1
                    ? "text-[var(--accent)] hover:text-[var(--text-white)] hover:bg-[var(--accent)] border border-[var(--accent)]"
                    : "border border-[var(--base-gray)] text-[var(--base-gray)] "
                }`}
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                onMouseEnter={() => prefetchMovies(currentPage)}
              >
                <i
                  className="fa fa-angle-left"
                  style={{ fontSize: "25px" }}
                ></i>
              </button>
              <button
                className={` px-3 py-2 transition-colors rounded-md ${
                  currentPage != recommendedShows.total_pages
                    ? "text-[var(--accent)] hover:text-[var(--text-white)] hover:bg-[var(--accent)] border border-[var(--accent)]"
                    : "border border-[var(--base-gray)] text-[var(--base-gray)] "
                }`}
                disabled={currentPage === recommendedShows.total_pages}
                onClick={() => handlePageChange(currentPage + 1)}
                onMouseEnter={() => prefetchMovies(currentPage)}
              >
                <i
                  className="fa fa-angle-right"
                  style={{ fontSize: "25px" }}
                ></i>
              </button>
            </div>
          </div>
          <div className="flex py-4">
            <CardsList
              category="tv"
              items={recommendedShows}
              maxRows={2}
              extendedCard={true}
            />
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default PopularTVListCards;
