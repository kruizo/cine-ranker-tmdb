import { useState, useEffect } from "react";
import { IMovieCollection } from "@customTypes/index";
import { fetchTrendingMovies } from "../api";
import RankedListItem from "@components/RankedListItem";

const TrendingList = () => {
  const [trendingMovies, setTrendingMovies] = useState<IMovieCollection | null>(
    null
  );

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await fetchTrendingMovies("week");
        setTrendingMovies(response);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetch();
  }, []);
  return (
    <>
      {trendingMovies && (
        <div className="space-y-2">
          <h1 className=" border-l-[var(--accent)] border-l-[12px] px-4 text-3xl font-extrabold text-primary-content mb-4 ">
            TRENDING
          </h1>
          {trendingMovies.results.slice(0, 4).map((movie, index) => (
            <RankedListItem
              key={index}
              id={movie.id}
              poster_path={movie.poster_path}
              title={movie.title}
              type={`Movie`}
              release_date={movie.release_date}
              rank={index + 1}
              popularity={movie.popularity}
              vote_rating={movie.vote_average}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default TrendingList;
