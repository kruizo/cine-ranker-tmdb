import {
  IMovie,
  IMovieCollection,
  ITvCollection,
  ITvShow,
} from "@customTypes/index";
import Card from "@components/Card";
import { Fragment } from "react";
import ExtendedCard from "@components/ExtendedCard";

interface ScrollableCardsListProps {
  movies?: IMovieCollection;
  tv?: ITvCollection;
}

const ScrollableCardsList: React.FC<ScrollableCardsListProps> = ({
  movies,
  tv,
}) => {
  const displayedMovies = movies?.results;
  const displayedShows = tv?.results;

  const lastEntry = displayedMovies
    ? displayedMovies[displayedMovies.length - 1]
    : displayedShows?.[displayedShows.length - 1];

  return (
    <Fragment>
      <div className="p-4 w-full overflow-x-auto">
        <div className="flex gap-4 whitespace-nowrap">
          {/* Render movie cards */}
          {movies &&
            displayedMovies &&
            displayedMovies.map((movie: IMovie, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-40" // Ensure each card has a fixed width
              >
                <Card
                  media_type={movie.media_type ?? "movie"}
                  title={movie.title}
                  poster_path={movie.poster_path}
                  release_date={movie.release_date}
                  vote_average={movie.vote_average}
                />
              </div>
            ))}

          {/* Render TV show cards */}
          {tv &&
            displayedShows &&
            displayedShows.map((show: ITvShow, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-40" // Ensure each card has a fixed width
              >
                <Card
                  media_type={show.media_type ?? "TV"}
                  title={show.name}
                  poster_path={show.poster_path}
                  release_date={show.first_air_date}
                  vote_average={show.vote_average}
                />
              </div>
            ))}

          {/* Render ExtendedCard if applicable */}
          {lastEntry && (
            <div className="flex-shrink-0 w-40">
              <ExtendedCard
                media_type={lastEntry.media_type ?? "movie"}
                poster_path={lastEntry.poster_path}
              />
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ScrollableCardsList;
