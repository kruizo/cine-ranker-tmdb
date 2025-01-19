import React from "react";
import { normalizeRating, extractYearFromDate } from "@utils/script";

interface RatingProps {
  voteAverage: number;
  popularity: number;
  release_date: string;
}

const Rating: React.FC<RatingProps> = ({
  voteAverage,
  popularity,
  release_date,
}) => {
  const normalizedRating = normalizeRating(voteAverage);

  const fullStars = Math.floor(normalizedRating);
  const hasHalfStar = normalizedRating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center">
      {Array(fullStars)
        .fill(0)
        .map((_, index) => (
          <i key={`full-${index}`} className="fa fa-star text-yellow-500"></i>
        ))}

      {hasHalfStar && (
        <div className="relative w-fit h-fit">
          <i className="fa fa-star-half text-yellow-500"></i>
          <i className="fa fa-star absolute bottom-0 left-0 right-0 top-[3.2px] -z-10 text-gray-600"></i>
        </div>
      )}

      {Array(emptyStars)
        .fill(0)
        .map((_, index) => (
          <i key={`empty-${index}`} className="fa fa-star text-gray-600"></i>
        ))}
      <label className="ml-2">{normalizedRating} Rating</label>

      <span className="mx-4">| {popularity} Popularity |</span>
      <label>{release_date}</label>
    </div>
  );
};

export default Rating;
