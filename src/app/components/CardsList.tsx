import {
  IMovie,
  IMovieCollection,
  ITvCollection,
  ITvShow,
} from "@customTypes/index";
import Card from "@components/Card";
import Hero from "@components/Hero";
import { Fragment, useState, useEffect } from "react";
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
  const [dynamicMaxColumns, setDynamicMaxColumns] = useState(maxColumns);

  const updateColumns = () => {
    const containerWidth = document.body.clientWidth; // Replace with a specific container if needed
    const cardWidth = 200; // Approximate width of a card (adjust as needed)
    const columns = Math.floor(containerWidth / cardWidth);
    setDynamicMaxColumns(Math.min(columns, maxColumns));
  };

  useEffect(() => {
    // Recalculate columns on mount and when the window resizes
    updateColumns();
    window.addEventListener("resize", updateColumns);

    return () => window.removeEventListener("resize", updateColumns);
  }, [maxColumns]);

  const maxItems = dynamicMaxColumns * maxRows - 1;
  const displayedItems = items?.results.slice(0, maxItems);
  const lastEntry = displayedItems?.[displayedItems.length - 1];

  return (
    <div
      className="grid gap-4"
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
  );
};
export default CardsList;
