import {
  IMovie,
  IMovieCollection,
  ITvCollection,
  ITvShow,
} from "@customTypes/index";
import Card from "@components/Card";
import Hero from "@components/Hero";
import { fetchLatestMovies } from "../api";
import { Fragment } from "react";
import ExtendedCard from "@components/ExtendedCard";

interface CardsListProps {
  movies?: IMovieCollection;
  tv?: ITvCollection;
  maxColumns?: number;
  maxRows?: number;
}

const CardsList: React.FC<CardsListProps> = ({
  movies,
  tv,
  maxColumns = 7,
  maxRows = 3,
}) => {
  const maxItems = maxColumns * maxRows - 1;

  // Slice the movie list to the max items
  const displayedMovies = movies?.results.slice(0, maxItems);
  const displayedShows = tv?.results.slice(0, maxItems);

  const lastEntry = displayedMovies
    ? displayedMovies?.[displayedMovies.length - 1]
    : displayedShows?.[displayedShows.length - 1];

  return (
    <Fragment>
      <div className="p-0 m-0 mx-auto">
        <div
          className={`grid gap-4`}
          style={{
            gridTemplateColumns: `repeat(${maxColumns}, minmax(0, 1fr))`, // Set the number of columns
            gridTemplateRows: `repeat(${maxRows}, auto)`, // Set the number of rows
          }}
        >
          {movies &&
            displayedMovies &&
            displayedMovies.map((movie: IMovie, index) => (
              <Card
                key={index}
                media_type={movie.media_type ?? "movie"}
                title={movie.title}
                poster_path={movie.poster_path}
                release_date={movie.release_date}
                vote_average={movie.vote_average}
              />
            ))}
          {tv &&
            displayedShows &&
            displayedShows.map((show: ITvShow, index) => (
              <Card
                key={index}
                media_type={show.media_type ?? "TV"}
                title={show.name}
                poster_path={show.poster_path}
                release_date={show.first_air_date}
                vote_average={show.vote_average}
              />
            ))}
          {lastEntry && (
            <ExtendedCard
              key={displayedMovies?.length}
              media_type={lastEntry.media_type ?? "movie"}
              poster_path={lastEntry.poster_path}
            />
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default CardsList;
