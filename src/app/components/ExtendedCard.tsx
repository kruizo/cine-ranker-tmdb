import React from "react";
import { normalizeRating } from "@utils/script";

interface ExtendedCard {
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  media_type: string;
}

const ExtendedCard: React.FC<ExtendedCard> = ({
  title,
  poster_path,
  release_date,
  vote_average,
  media_type,
}) => {
  const normalizedRating = normalizeRating(vote_average);
  return (
    <div className="bg-base-100 shadow-xl rounded-md w-full overflow-hidden">
      <div className="h-full flex justify-center items-center relative group">
        <div className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-md rounded-md cursor-pointer  z-10 flex items-center justify-center">
          <span className="text-[var(--base-text)] group-hover:text-white transition-colors text-xl font-mono font-extralight">
            VIEW MORE
          </span>
        </div>
        <img
          src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
          alt="Poster"
          className="absolute -z-10 top-0 b-0 h-full object-cover scale-75 pb-20 group-hover:scale-125 transition-all rounded-md object-center"
        />
      </div>
    </div>
  );
};

export default ExtendedCard;
