import React from "react";
import { normalizeRating } from "@lib/script";

interface RatingProps {
  voteAverage: number;
  popularity: number;
  release_date: string;
  language?: string;
}

const Rating: React.FC<RatingProps> = ({
  voteAverage,
  popularity,
  release_date,
  language = "en-US",
}) => {
  const normalizedRating = normalizeRating(voteAverage);
  const releaseYear = release_date.split("-")[0];
  const fullStars = Math.floor(normalizedRating);
  const hasHalfStar = normalizedRating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-2 text-[var(--base-dark-text)] bg-black py-2 px-3 bg-opacity-30 rounded-full text-sm sm:text-md">
      <div className="flex items-center justify-center">
        {Array(fullStars)
          .fill(0)
          .map((_, index) => (
            <i key={`full-${index}`} className="fa fa-star text-yellow-500"></i>
          ))}

        {hasHalfStar && (
          <div className="relative w-fit h-fit">
            <i className="fa fa-star-half text-yellow-500"></i>
            <i className="fa fa-star absolute bottom-0 left-0 right-0 top-[3.2px] -z-10 text-[var(--base-dark-text)]"></i>
          </div>
        )}

        {Array(emptyStars)
          .fill(0)
          .map((_, index) => (
            <i
              key={`empty-${index}`}
              className="fa fa-star text-[var(--base-dark-text)]"
            ></i>
          ))}
        <label className="ml-2 text-center ">
          <strong className="text-[var(--text-white)]">
            {normalizedRating}
          </strong>{" "}
          Rating
        </label>
      </div>

      <label className="text-center border-r border-l px-1 ">
        <strong className="text-[var(--text-white)]">
          {popularity.toFixed(2)}
        </strong>{" "}
        Popularity
      </label>
      {language && (
        <label className="bg-[var(--base-text)] flex items-center justify-center text-[var(--accent)] px-2 rounded-lg">
          <strong>{language.toUpperCase()}</strong>
        </label>
      )}
      <label className="bg-[var(--accent)] flex items-center justify-center text-[var(--text-white)] px-2 rounded-lg">
        <strong>{releaseYear}</strong>
      </label>
    </div>
  );
};

export default Rating;
