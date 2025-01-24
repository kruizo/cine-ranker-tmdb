import { IMovieCollection } from "@customTypes/index";
import CardsList from "./CardsList";
import {
  fetchDiscoverMovies,
  fetchDiscoverTVShows,
  fetchUpcomingMovies,
} from "../api";
import { Fragment, useState, useEffect } from "react";
import BannerCarousel from "./BannerCarousel";

const UpcomingMovieBannerCards = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [upcomingMovies, setUpcomingMovies] = useState<IMovieCollection | null>(
    null
  );

  useEffect(() => {
    const getItems = async () => {
      try {
        const response = await fetchUpcomingMovies(1);
        setUpcomingMovies(response);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };
    getItems();
  }, []);

  return (
    <Fragment>
      {upcomingMovies && (
        <div className="py-7">
          <div className="flex justify-between "></div>
          <div className="flex py-4">
            <BannerCarousel items={upcomingMovies} category={"movies"} />
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default UpcomingMovieBannerCards;
