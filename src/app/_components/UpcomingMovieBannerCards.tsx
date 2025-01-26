import { IMovieCollection } from "@customTypes/index";
import { fetchUpcomingMovies } from "../api";
import { useState, useEffect } from "react";
import BannerCarousel from "./BannerCarousel";

const UpcomingMovieBannerCards = () => {
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
    <>
      {upcomingMovies && (
        <div className="py-7">
          <div className="flex justify-between "></div>
          <div className="flex py-4">
            <BannerCarousel items={upcomingMovies} category={"movies"} />
          </div>
        </div>
      )}
    </>
  );
};

export default UpcomingMovieBannerCards;
