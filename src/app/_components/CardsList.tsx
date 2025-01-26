import {
  IMovie,
  IMovieCollection,
  ITvCollection,
  ITvShow,
} from "@customTypes/index";
import Card from "@components/Card";
import { useState, useEffect } from "react";
import ExtendedCard from "@components/ExtendedCard";

interface CardsListProps {
  category: "movies" | "tv";
  items: IMovieCollection | ITvCollection | null;
  gap?: number;
  maxColumns?: number;
  maxRows?: number;
  extendedCard?: boolean;
  cardSize?: "small" | "medium" | "large";
}

const CardsList: React.FC<CardsListProps> = ({
  category,
  items,
  gap = 4,
  maxColumns = 7,
  maxRows = 3,
  extendedCard = false,
  cardSize,
}) => {
  const [dynamicMaxColumns, setDynamicMaxColumns] = useState(maxColumns);

  const updateColumns = () => {
    const containerWidth = document.body.clientWidth;
    const cardWidth = 200;
    const columns = Math.floor(containerWidth / cardWidth);
    setDynamicMaxColumns(Math.min(columns, maxColumns));
  };

  useEffect(() => {
    updateColumns();
    window.addEventListener("resize", updateColumns);

    return () => window.removeEventListener("resize", updateColumns);
  }, [maxColumns]);

  const maxItems = dynamicMaxColumns * maxRows - 1;
  const displayedItems = items?.results.slice(0, maxItems);
  const lastEntry = displayedItems?.[displayedItems.length - 1];

  return (
    <div
      className={`grid gap-${gap}`}
      style={{
        gridTemplateColumns: `repeat(${dynamicMaxColumns}, minmax(0, 1fr))`,
      }}
    >
      {displayedItems &&
        displayedItems.map((item, index) => {
          if (category === "movies") {
            const movie = item as IMovie;
            return (
              <Card
                key={index}
                id={movie.id}
                media_type={movie.media_type ?? "movies"}
                title={movie.title}
                poster_path={movie.poster_path}
                release_date={movie.release_date}
                vote_average={movie.vote_average}
                size={cardSize}
              />
            );
          } else {
            const tvShow = item as ITvShow;
            return (
              <Card
                key={index}
                id={tvShow.id}
                media_type={tvShow.media_type ?? "tv"}
                title={tvShow.name}
                poster_path={tvShow.poster_path}
                release_date={tvShow.first_air_date}
                vote_average={tvShow.vote_average}
                size={cardSize}
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
  );
};
export default CardsList;
