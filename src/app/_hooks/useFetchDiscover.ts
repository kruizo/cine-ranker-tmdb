import { useState, useEffect, useRef } from "react";
import { IMovieCollection, ITvCollection } from "@customTypes/index";
import { fetchDiscoverMovies, fetchDiscoverTVShows } from "@api/index";
import { getGenreIdByName } from "@lib/script";

const useFetchDiscover = (
  category: "movies" | "tv",
  currentPage: number,
  minVoteAverage: number = 8,
  releaseYearAfter: number = 2015,
  genres: Array<string> = [],
  page_change: boolean = false,
  exact_genre: boolean = true
) => {
  const [recommendedItems, setRecommendedItems] = useState<
    ITvCollection | IMovieCollection | null
  >(null);
  const [isFetching, setIsFetching] = useState(false);

  const itemsCache = useRef<{
    [key: string]: IMovieCollection | ITvCollection;
  }>({});

  const getListAndCacheKey = (page: number) => {
    const genreIdListString = getGenreIdByName(genres, exact_genre)
      .split(",")
      .sort()
      .join(",");
    const cacheKey = `${category}-${genreIdListString}-${page}`; // Include category in the cache key
    return { genreIdListString, cacheKey };
  };

  const checkIfCanFetch = (key: string, page: number, page_change = false) => {
    const hasCache = itemsCache.current[key];
    const hasValidPageRange =
      page > 0 && page <= (recommendedItems?.total_pages || 1);
    return (!hasCache && !isFetching && hasValidPageRange) || page_change;
  };

  const fetchItems = async (
    page: number,
    category: "movies" | "tv",
    genres: string
  ) => {
    return category === "movies"
      ? fetchDiscoverMovies({
          page,
          minVoteAverage,
          releaseYearAfter,
          genres,
        })
      : fetchDiscoverTVShows({
          page,
          minVoteAverage,
          releaseYearAfter,
          genres,
        });
  };

  const prefetchItems = async (page: number, category: "movies" | "tv") => {
    const { genreIdListString, cacheKey } = getListAndCacheKey(page);

    if (!checkIfCanFetch(cacheKey, page, page_change)) return;

    if (category)
      try {
        const response = await fetchItems(page, category, genreIdListString);
        itemsCache.current[cacheKey] = response;
        console.log("data Cached", itemsCache.current);
      } catch (error) {
        console.error("Error prefetching items:", error);
      }
  };

  useEffect(() => {
    const getItems = async () => {
      const { genreIdListString, cacheKey } = getListAndCacheKey(currentPage);

      if (itemsCache.current[cacheKey]) {
        setRecommendedItems(itemsCache.current[cacheKey]);
        setIsFetching(false);
        return;
      }

      try {
        setIsFetching(true);
        const response = await fetchItems(
          currentPage,
          category,
          genreIdListString
        );
        itemsCache.current[cacheKey] = response;
        console.log("=> data Cached");
        setRecommendedItems(response);
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        setIsFetching(false);
      }
    };

    getItems();
  }, [category, currentPage, genres]);

  return { recommendedItems, isFetching, prefetchItems };
};

export default useFetchDiscover;
