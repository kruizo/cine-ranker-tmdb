import {
  IMovie,
  IMovieCollection,
  ITvCollection,
  ITvShow,
} from "@customTypes/index";
import Card from "@components/Card";
import Hero from "@components/Hero";
import { Fragment } from "react";
import ExtendedCard from "@components/ExtendedCard";

interface CardsListProps {
  category: "movies" | "tv";
  items: IMovieCollection | ITvCollection | null;
  maxColumns?: number;
  maxRows?: number;
  extendedCard?: boolean;
}

const CardsList: React.FC<CardsListProps> = ({
  category,
  items,
  maxColumns = 7,
  maxRows = 3,
  extendedCard = false,
}) => {
  const maxItems = maxColumns * maxRows - 1;

  // Slice the item list to the max items
  const displayedItems = items?.results.slice(0, maxItems);

  const lastEntry = displayedItems?.[displayedItems.length - 1];

  return (
    <Fragment>
      <div className="p-0 m-0">
        <div className="grid gap-4 grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
          {displayedItems &&
            displayedItems.map((item, index) => {
              if (category === "movies") {
                const movie = item as IMovie;
                return (
                  <Card
                    key={index}
                    media_type={movie.media_type ?? "movie"}
                    title={movie.title}
                    poster_path={movie.poster_path}
                    release_date={movie.release_date}
                    vote_average={movie.vote_average}
                  />
                );
              } else {
                const tvShow = item as ITvShow;
                return (
                  <Card
                    key={index}
                    media_type={tvShow.media_type ?? "TV"}
                    title={tvShow.name}
                    poster_path={tvShow.poster_path}
                    release_date={tvShow.first_air_date}
                    vote_average={tvShow.vote_average}
                  />
                );
              }
            })}
          {extendedCard && lastEntry && (
            <ExtendedCard
              key={displayedItems?.length}
              media_type={lastEntry.media_type ?? category}
              poster_path={lastEntry.poster_path}
            />
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default CardsList;
