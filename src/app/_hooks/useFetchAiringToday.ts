import { ITvCollection } from "@customTypes/index";
import { useState, useEffect, useRef } from "react";
import { fetchAiringToday } from "@api/index";

const useFetchAiringToday = (currentPage: number) => {
  const [recommendedShows, setRecommendedShows] =
    useState<ITvCollection | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  const itemsCache = useRef<{ [key: number]: ITvCollection }>({});

  const checkIfCanFetch = (page: number, page_change = false) => {
    const hasCache = itemsCache.current[page];
    const hasValidPageRange =
      page > 0 && page <= (recommendedShows?.total_pages || 1);
    return (!hasCache && !isFetching && hasValidPageRange) || page_change;
  };

  const prefetchShows = async (page: number) => {
    if (!checkIfCanFetch(page)) {
      return;
    }

    try {
      const response = await fetchAiringToday(page);
      itemsCache.current[page] = response;
      console.log("Data cached", itemsCache.current);
    } catch (error) {
      console.error("Error prefetching shows:", error);
    }
  };

  const fetchShows = async (page: number) => {
    if (itemsCache.current[page]) {
      setRecommendedShows(itemsCache.current[page]);
      return;
    }

    try {
      setIsFetching(true);
      const response = await fetchAiringToday(page);
      itemsCache.current[page] = response;
      console.log("=> data Cached");
      setRecommendedShows(response);
    } catch (error) {
      console.error("Error fetching shows:", error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchShows(currentPage);
  }, [currentPage]);

  return { recommendedShows, isFetching, prefetchShows };
};

export default useFetchAiringToday;
