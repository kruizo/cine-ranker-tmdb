import { IMovie, IMovieCollection } from "@customTypes/index";
import Card from "@components/Card";
import Hero from "@components/Hero";
import { fetchLatestMovies } from "../api";
import { Fragment } from "react";

interface CardsListProps {
  movies: IMovieCollection;
}

const CardsList: React.FC<CardsListProps> = ({ movies }) => {
  return (
    <Fragment>
      {movies && (
        <div className="p-0 m-0 mx-auto">
          <div className="grid gap-4 grid-cols-3  h-fit grid-rows-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
            {movies.results.map((movie: IMovie, index) => (
              <Card
                key={index}
                title={movie.title}
                poster_path={movie.poster_path}
                overview={movie.overview}
                release_date={movie.release_date}
                vote_average={movie.vote_average}
                vote_count={movie.vote_count}
                genre_ids={movie.genre_ids}
                popularity={movie.popularity}
                original_language={movie.original_language}
              />
            ))}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default CardsList;
