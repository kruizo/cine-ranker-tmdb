import { ITvCollection } from "@customTypes/index";
import CardsList from "../CardsList";
import { useState, useEffect, useRef } from "react";
import useFetchDiscover from "@/app/_hooks/useFetchDiscover";

interface MovieListCardsProps {
  genres: Array<string>;
  title: string;
  category: "movies" | "tv";
}

const BrowseListCards: React.FC<MovieListCardsProps> = ({
  title,
  genres,
  category,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const { recommendedItems, isFetching, prefetchItems } = useFetchDiscover(
    category,
    currentPage,
    7,
    2015,
    genres,
    false
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="py-7 w-full">
        <div className="flex justify-between pb-3 ">
          <h1 className="text-lg sm:text-xl md:text-3xl border-l-[var(--accent)] border-l-[12px] px-4 font-extrabold text-primary-content">
            {title.toUpperCase()}
          </h1>
        </div>
        {recommendedItems?.results.length === 0 && (
          <div className="flex justify-center items-center h-96">
            <h1 className="text-xl text-primary-content">No shows found.</h1>
          </div>
        )}
        <div className="flex py-4">
          <CardsList
            category={category}
            items={recommendedItems}
            maxRows={5}
            maxColumns={5}
            cardSize="large"
          />
        </div>
        {recommendedItems && recommendedItems.total_pages > 1 && (
          <div className="flex justify-center items-center gap-2">
            <button
              className={` px-3 py-2 transition-colors rounded-md ${
                currentPage != 1
                  ? "text-[var(--accent)] hover:text-[var(--text-white)] hover:bg-[var(--accent)] border border-[var(--accent)]"
                  : "border border-[var(--base-gray)] text-[var(--base-gray)] "
              }`}
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              onMouseEnter={() => prefetchItems(currentPage - 1, "movies")}
            >
              <i className="fa fa-angle-left" style={{ fontSize: "25px" }}></i>
            </button>
            <button
              className={` px-3 py-2 transition-colors rounded-md ${
                currentPage != recommendedItems.total_pages
                  ? "text-[var(--accent)] hover:text-[var(--text-white)] hover:bg-[var(--accent)] border border-[var(--accent)]"
                  : "border border-[var(--base-gray)] text-[var(--base-gray)] "
              }`}
              disabled={currentPage === recommendedItems.total_pages}
              onClick={() => handlePageChange(currentPage + 1)}
              onMouseEnter={() => prefetchItems(currentPage + 1, "movies")}
            >
              <i className="fa fa-angle-right" style={{ fontSize: "25px" }}></i>
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default BrowseListCards;
