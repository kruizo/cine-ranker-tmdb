import { ITvCollection, ITvShow } from "@customTypes/index";
import CardsList from "./CardsList";
import { fetchAiringToday } from "../api";
import { useState, useEffect, useRef } from "react";

const PopularTVListCards = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [recommendedShows, setRecommendedMovies] =
    useState<ITvCollection | null>(null);

  const [isFetching, setIsFetching] = useState(false);

  const itemsCache = useRef<{
    [key: number]: ITvCollection;
  }>({});

  const checkIfCanFetch = (page: number, page_change = false) => {
    const hasCache = itemsCache.current[page];
    const hasValidPageRange =
      page > 0 && page <= (recommendedShows?.total_pages || 1);
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
  const prefetchMovies = async (page: number) => {
    if (!checkIfCanFetch(page)) {
      return;
    }

    try {
      console.log("Prefetching items");
      const response = await fetchAiringToday(page);
      console.log("Fetch Successfull:", response);
      itemsCache.current[page] = response;
    } catch (error) {
      console.error("Error prefetching movies:", error);
    }
  };

  const handlePageChange = async (page: number) => {
    checkIfCanFetch(page, true) && setCurrentPage(page);
  };

  useEffect(() => {
    const getMovies = async () => {
      if (itemsCache.current[currentPage]) {
        console.log("Data from Cache:", itemsCache.current[currentPage]);
        setRecommendedMovies(itemsCache.current[currentPage]);
        setCurrentPage(currentPage);
        return;
      }

      try {
        setIsFetching(true);

        const response = await fetchAiringToday(currentPage);

        //cache the response
        itemsCache.current[currentPage] = response;
        console.log("Data cached");

        setRecommendedMovies(response);
        setCurrentPage(currentPage);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setIsFetching(false);
      }
    };
    getMovies();
  }, [currentPage]);

  return (
    <>
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
                onMouseEnter={() => prefetchMovies(currentPage - 1)}
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
            <CardsList
              category="tv"
              items={recommendedShows}
              maxRows={2}
              extendedCard={true}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default PopularTVListCards;
