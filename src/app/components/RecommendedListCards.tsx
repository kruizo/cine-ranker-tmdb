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
      ? fetchDiscoverMovies({
          page: page,
          minVoteAverage: 7,
          releaseYearAfter: 2015,
        })
      : fetchDiscoverTVShows({
          page,
          minVoteAverage: 7,
          releaseYearAfter: 2015,
        });
  };

  const prefetchItems = async (page: number, type: "movies" | "tv") => {
    if (hoverItems[page] || isFetching) return;
    try {
      const response = await fetchItems(page, type);
      setHoverItems((prev) => ({ ...prev, [page]: response }));
      console.log("RESPONSE: ", response);
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
  }, [category]);

  return (
    <Fragment>
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
                onMouseEnter={() => prefetchItems(currentPage, "movies")}
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
                onMouseEnter={() => prefetchItems(currentPage, "tv")}
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
    </Fragment>
  );
};

export default RecommendedListCards;
