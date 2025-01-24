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
  category: "movies" | "tv";
  items: IMovieCollection | ITvCollection | null;
}

const ScrollableCardsList: React.FC<ScrollableCardsListProps> = ({
  category,
  items,
}) => {
  const displayedItems = items?.results;

  const lastEntry = displayedItems?.[displayedItems.length - 1];

  return (
    <Fragment>
      <div className="max-w-full overflow-hidden ">
        <div className="flex gap-4 py-4 overflow-x-auto ">
          {displayedItems &&
            displayedItems.map((item, index) => {
              if (category === "movies") {
                const movie = item as IMovie;
                return (
                  <div key={index} className="flex-shrink-0 w-40 ">
                    <Card
                      media_type={movie.media_type ?? "movie"}
                      title={movie.title}
                      poster_path={movie.poster_path}
                      release_date={movie.release_date}
                      vote_average={movie.vote_average}
                    />
                  </div>
                );
              } else {
                const tvShow = item as ITvShow;
                return (
                  <div key={index} className="flex-shrink-0 w-40">
                    <Card
                      media_type={tvShow.media_type ?? "TV"}
                      title={tvShow.name}
                      poster_path={tvShow.poster_path}
                      release_date={tvShow.first_air_date}
                      vote_average={tvShow.vote_average}
                    />
                  </div>
                );
              }
            })}
        </div>
      </div>
    </Fragment>
  );
};

export default ScrollableCardsList;
