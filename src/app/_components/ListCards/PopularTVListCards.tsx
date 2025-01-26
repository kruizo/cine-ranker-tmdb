import CardsList from "../CardsList";
import { useState } from "react";
import useFetchAiringToday from "@customHooks/useFetchAiringToday";

const PopularTVListCards = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { recommendedShows, isFetching, prefetchShows } =
    useFetchAiringToday(currentPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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
                  currentPage !== 1
                    ? "text-[var(--accent)] hover:text-[var(--text-white)] hover:bg-[var(--accent)] border border-[var(--accent)]"
                    : "border border-[var(--base-gray)] text-[var(--base-gray)] "
                }`}
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                onMouseEnter={() => prefetchShows(currentPage - 1)}
              >
                <i
                  className="fa fa-angle-left"
                  style={{ fontSize: "25px" }}
                ></i>
              </button>
              <button
                className={` px-3 py-2 transition-colors rounded-md ${
                  currentPage !== recommendedShows.total_pages
                    ? "text-[var(--accent)] hover:text-[var(--text-white)] hover:bg-[var(--accent)] border border-[var(--accent)]"
                    : "border border-[var(--base-gray)] text-[var(--base-gray)] "
                }`}
                disabled={currentPage === recommendedShows.total_pages}
                onClick={() => handlePageChange(currentPage + 1)}
                onMouseEnter={() => prefetchShows(currentPage + 1)}
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
