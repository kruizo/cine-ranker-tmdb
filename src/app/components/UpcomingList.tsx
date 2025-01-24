import { useState, useEffect, Fragment } from "react";
import { IMovieCollection } from "@customTypes/index";
import { getHeroUpcomingMovies } from "../api";
import ListItem from "@components/ListItem";

const UpcomingList = () => {
  const [upcomingMovies, setUpcomingMovies] = useState<IMovieCollection | null>(
    null
  );

  useEffect(() => {
    const fetch = async () => {
      try {
        console.log("Fetching movies...");

        const response = await getHeroUpcomingMovies();
        setUpcomingMovies(response);
        console.log(response);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetch();
  }, []);
  return (
    <Fragment>
      {upcomingMovies && (
        <div className="space-y-2">
          <h1 className="border-l-[var(--accent)] border-l-[12px] px-4  text-3xl font-extrabold text-primary-content mb-4 ">
            NOW PLAYING
          </h1>
          {upcomingMovies.results.slice(0, 4).map((movie, index) => (
            <ListItem
              key={index}
              poster_path={movie.poster_path}
              title={movie.title}
              type={`Movie`}
              release_date={movie.release_date}
              popularity={movie.popularity}
              vote_rating={movie.vote_average}
            />
          ))}
        </div>
      )}
    </Fragment>
  );
};

export default UpcomingList;
