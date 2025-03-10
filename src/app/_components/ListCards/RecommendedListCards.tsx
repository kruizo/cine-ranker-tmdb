import CardsList from "../CardsList";
import { useState } from "react";
import useFetchDiscover from "@customHooks/useFetchDiscover";

const RecommendedListCards = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const [category, setCategory] = useState<"movies" | "tv">("movies");

  const { recommendedItems, prefetchItems } = useFetchDiscover(
    category,
    currentPage,
    7,
    2015,
    [],
    false
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      {recommendedItems && (
        <div className="py-7">
          <div className="flex justify-between ">
            <div className="flex gap-2 items-center">
              <h1 className="text-lg sm:text-xl md:text-3xl border-l-[var(--accent)] border-l-[12px] px-4 font-extrabold text-primary-content">
                RECOMMENDED
              </h1>
              <button
                className={`text-sm rounded-lg px-2 py-1 border hidden sm:block ${
                  category === "movies"
                    ? "border-[var(--accent)] text-[var(--accent)] hover:text-white hover:bg-[var(--accent)]"
                    : "border-[var(--base-gray)] text-[var(--base-gray)]"
                } transition-colors`}
                onClick={() => setCategory("movies")}
                onMouseEnter={() => prefetchItems(1, "movies")}
              >
                MOVIES
              </button>
              <button
                className={`text-sm rounded-lg px-2 py-1 border hidden sm:block ${
                  category === "tv"
                    ? "border-[var(--accent)] text-[var(--accent)] hover:text-white hover:bg-[var(--accent)]"
                    : "border-[var(--base-gray)] text-[var(--base-gray)]"
                } transition-colors`}
                onClick={() => setCategory("tv")}
                onMouseEnter={() => prefetchItems(1, "tv")}
              >
                TV SHOWS
              </button>
            </div>
            <div className="flex justify-center items-center gap-2 ">
              <button
                className={` px-3 py-2 transition-colors rounded-md ${
                  currentPage !== 1
                    ? "text-[var(--accent)] hover:text-[var(--text-white)] hover:bg-[var(--accent)] border border-[var(--accent)]"
                    : "border border-[var(--base-gray)] text-[var(--base-gray)]"
                }`}
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                onMouseEnter={() => prefetchItems(currentPage - 1, category)}
              >
                <i
                  className="fa fa-angle-left"
                  style={{ fontSize: "25px" }}
                ></i>
              </button>
              <button
                className={` px-3 py-2 transition-colors rounded-md ${
                  currentPage !== recommendedItems.total_pages
                    ? "text-[var(--accent)] hover:text-[var(--text-white)] hover:bg-[var(--accent)] border border-[var(--accent)]"
                    : "border border-[var(--base-gray)] text-[var(--base-gray)]"
                }`}
                disabled={currentPage === recommendedItems.total_pages}
                onClick={() => handlePageChange(currentPage + 1)}
                onMouseEnter={() => prefetchItems(currentPage + 1, category)}
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
              category={category}
              items={recommendedItems}
              extendedCard={true}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default RecommendedListCards;
