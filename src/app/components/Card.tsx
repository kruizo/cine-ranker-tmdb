import React from "react";
import { normalizeRating } from "@utils/script";

interface CardProps {
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  media_type: string;
}

const Card: React.FC<CardProps> = ({
  title,
  poster_path,
  release_date,
  vote_average,
  media_type,
}) => {
  const normalizedRating = normalizeRating(vote_average);
  return (
    <div className="bg-base-100 shadow-xl rounded-md w-full">
      <div className="h-72">
        <img
          src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
          alt="Shoes"
          className="h-full w-full object-cover rounded-md object-center"
        />
      </div>
      <div className="card-body py-3 px-0 h-[6rem]">
        <div className="flex justify-between items-center py-1">
          <span className="text-sm text-[var(--base-gray)]">
            {release_date.split("-")[0]}
          </span>
          <span className="text-sm text-[var(--base-gray)]">
            {media_type.substring(0, 1).toUpperCase() + media_type.substring(1)}
          </span>
          <span className="text-sm text-[var(--base-gray)] flex gap-1 items-center">
            {/* <span className="scale-150  -mt-[1px]">☆</span> */}
            <i className="fa fa-star text-[var(--base-gray)]"></i>
            {normalizedRating}
          </span>
        </div>
        <h2 className="card-title text-sm font-normal line-clamp-2">{title}</h2>
      </div>
    </div>
  );
};

export default Card;
