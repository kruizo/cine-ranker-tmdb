import { IMovie, IMovieCollection } from "@customTypes/index";
import Card from "@components/Card";
import Hero from "@components/Hero";
import { fetchLatestMovies } from "../api";
import { Fragment } from "react";
import ExtendedCard from "@components/ExtendedCard";

interface CardsListProps {
  movies: IMovieCollection;
}

const CardsList: React.FC<CardsListProps> = ({ movies }) => {
  const lastMovie = movies.results[movies.results.length - 1];

  return (
    <Fragment>
      {movies && (
        <div className="p-0 m-0 mx-auto">
          <div className="grid gap-4 grid-cols-3  h-fit grid-rows-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
            {movies.results.map((movie: IMovie, index) => (
              <Card
                key={index}
                media_type={movie.media_type ?? "movie"}
                title={movie.title}
                poster_path={movie.poster_path}
                release_date={movie.release_date}
                vote_average={movie.vote_average}
              />
            ))}
            <ExtendedCard
              key={movies.results.length}
              media_type={lastMovie.media_type ?? "movie"}
              title={lastMovie.title}
              poster_path={lastMovie.poster_path}
              release_date={lastMovie.release_date}
              vote_average={lastMovie.vote_average}
            />
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default CardsList;
