import { IMovieCollection } from "@customTypes/index";
import CardsList from "./CardsList";
import { fetchDiscoverMovies, fetchDiscoverTVShows } from "../api";
import { Fragment, useState, useEffect } from "react";

const RecommendedListCards = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [recommendedItems, setRecommendedItems] =
    useState<IMovieCollection | null>(null);
  const [hoverItems, setHoverItems] = useState<{
    [key: number]: IMovieCollection;
  }>({});
  const [isFetching, setIsFetching] = useState(false);
  const [category, setCategory] = useState<"movies" | "tv">("movies"); // New state to track category

  const fetchItems = async (page: number, type: "movies" | "tv") => {
    return type === "movies"
      ? fetchDiscoverMovies({ page })
      : fetchDiscoverTVShows({ page });
  };

  const prefetchItems = async (page: number) => {
    if (hoverItems[page] || isFetching) return;
    try {
      const response = await fetchItems(page, category);
      setHoverItems((prev) => ({ ...prev, [page]: response }));
    } catch (error) {
      console.error("Error prefetching items:", error);
    }
  };

  const handlePageChange = async (page: number) => {
    if (isFetching || page < 1 || page > (recommendedItems?.total_pages || 1))
      return;

    setIsFetching(true);
    try {
      const response = hoverItems[page] || (await fetchItems(page, category));
      setRecommendedItems(response);
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    const getItems = async () => {
      try {
        const response = await fetchItems(1, category);
        setRecommendedItems(response);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };
    getItems();
  }, [category]); // Refetch when the category changes

  return (
    <Fragment>
      {recommendedItems && (
        <div className="py-7">
          <div className="flex justify-between ">
            <div className="flex gap-2 items-center">
              <h1 className="border-l-[var(--accent)] border-l-[12px] px-4 text-3xl font-extrabold text-primary-content">
                RECOMMENDED
              </h1>
              <button
                className={`text-sm rounded-lg px-2 py-1 border ${
                  category === "movies"
                    ? "border-[var(--accent)] text-[var(--accent)] hover:text-white hover:bg-[var(--accent)]"
                    : "border-[var(--base-gray)] text-[var(--base-gray)]"
                } transition-colors`}
                onClick={() => setCategory("movies")}
                onMouseEnter={() => prefetchItems(currentPage)}
              >
                MOVIES
              </button>
              <button
                className={`text-sm rounded-lg px-2 py-1 border ${
                  category === "tv"
                    ? "border-[var(--accent)] text-[var(--accent)] hover:text-white hover:bg-[var(--accent)]"
                    : "border-[var(--base-gray)] text-[var(--base-gray)]"
                } transition-colors`}
                onClick={() => setCategory("tv")}
                onMouseEnter={() => prefetchItems(currentPage)}
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
                onMouseEnter={() => prefetchItems(currentPage + 1)}
              >
                <i
                  className="fa fa-angle-right"
                  style={{ fontSize: "25px" }}
                ></i>
              </button>
            </div>
          </div>
          <div className="flex py-4">
            <CardsList category={category} items={recommendedItems} />
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default RecommendedListCards;
