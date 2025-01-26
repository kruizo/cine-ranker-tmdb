import React from "react";
import Tilt from "react-parallax-tilt";
import { normalizeRating } from "@utils/script";

interface CardProps {
  media_type: string;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  size?: "small" | "medium" | "large";
}

const Card: React.FC<CardProps> = ({
  media_type,
  title,
  poster_path,
  release_date,
  vote_average,
  size = "medium",
}) => {
  const normalizedRating = normalizeRating(vote_average);

  const cardSize = {
    small: "h-48",
    medium: "h-72",
    large: "h-96",
  };

  return (
    <Tilt
      className="bg-base-100 shadow-xl rounded-md w-full cursor-pointer"
      tiltMaxAngleX={5} // Max tilt on X-axis
      tiltMaxAngleY={10} // Max tilt on Y-axis
      scale={1.05} // Scale on hover
      glareEnable={true} // Enable glare effect
      glareMaxOpacity={0.5}
      glareColor="rgba(255, 255, 255, 0.5)" // Glare color
      glarePosition="top"
    >
      <div className={`${cardSize[size]}`}>
        <img
          src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
          alt="Poster"
          className="h-full min-w-full w-full object-cover rounded-md object-center"
        />
      </div>
      <div className="card-body py-3 h-[6rem]">
        <div className="flex justify-between items-center py-1">
          <span className="text-sm text-[var(--base-gray)]">
            {release_date?.split("-")[0]}
          </span>
          <span className="text-sm text-[var(--base-gray)]">
            {media_type.substring(0, 1).toUpperCase() + media_type.substring(1)}
          </span>
          <span className="text-sm text-[var(--base-gray)] flex gap-1 items-center">
            <i className="fa fa-star text-[var(--base-gray)]"></i>
            {normalizedRating}
          </span>
        </div>
        <h2 className="card-title text-sm font-normal line-clamp-2 overflow-hidden">
          {title}
        </h2>
      </div>
    </Tilt>
  );
};

export default Card;
