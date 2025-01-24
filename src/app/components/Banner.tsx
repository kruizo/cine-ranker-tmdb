import React from "react";
import { normalizeRating } from "@utils/script";

interface BannerProps {
  media_type: string;
  backdrop_path: string;
  title: string;
  poster_path: string;
  release_date: string;
  popularity: number;
  vote_count: number;
  vote_average: number;
}

const Banner: React.FC<BannerProps> = ({
  media_type,
  backdrop_path,
  title,
  poster_path,
  release_date,
  popularity,
  vote_count,
  vote_average,
}) => {
  const normalizedRating = normalizeRating(vote_average);

  return (
    <div className="bg-base-100  h-96 shadow-xl rounded-md w-full cursor-pointer">
      <div className="relative group">
        <div className="absolute top-0 right-0 inset-0 bg-black opacity-50 z-10" />
        <div className="max-h-96 h-96 w-full -z-10 select-none">
          <img
            src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
            alt="Background Image"
            className="h-full w-full object-cover rounded-md object-center"
          />
        </div>
        <div className="absolute top-0  right-0 left-0 bottom-0 h-fit m-auto w-fit card-title z-30">
          <h2 className="italic text-4xl line-clamp-2 ">{title}</h2>
          <span className="absolute transition-opacity text-sm text-[var(--base-dark-text)] right-0 left-0 flex opacity-25 mx-auto mt-20 group-hover:opacity-100 justify-center">
            <strong className="text-[var(--base-text)]">
              {release_date?.split("-")[0]}
            </strong>{" "}
            |{" "}
            {media_type.substring(0, 1).toUpperCase() + media_type.substring(1)}
          </span>
        </div>
      </div>
      <div className="card-body py-3 px-0 h-[6rem]">
        <div className="flex justify-center gap-10 items-center py-1">
          <span className="text-sm text-[var(--base-dark-text)]">
            <i className="fa fa-heart text-[var(--accent)]"></i>{" "}
            <strong className="text-[var(--base-text)]">{popularity}</strong>{" "}
            Popularity
          </span>
          <span className="text-sm text-[var(--base-dark-text)]">
            <i className="fas fa-vote-yea text-[var(--accent)]"></i>{" "}
            <strong className="text-[var(--base-text)]">{vote_count}</strong>{" "}
            Votes
          </span>
          <span className="text-sm text-[var(--base-dark-text)] flex gap-1 items-center">
            <i className="fa fa-star text-[var(--accent)]"></i>{" "}
            <strong className="text-[var(--base-text)]">
              {normalizedRating}
            </strong>{" "}
            Rating
          </span>
        </div>
      </div>
    </div>
  );
};

export default Banner;
