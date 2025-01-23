import React from "react";
import { IMovieCollection } from "@customTypes/index";

interface CardProps {
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  popularity: number;
  original_language: string;
}

const Card: React.FC<CardProps> = ({
  title,
  poster_path,
  overview,
  release_date,
  vote_average,
  vote_count,
  genre_ids,
  popularity,
  original_language,
}) => {
  return (
    <div className="bg-base-100 shadow-xl rounded-md w-full">
      <div className="h-72">
        <img
          src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
          alt="Shoes"
          className="h-full w-full object-cover rounded-md object-center"
        />
      </div>
      <div className="card-body py-3 px-0 h-14">
        <h2 className="card-title text-sm font-normal line-clamp-2">{title}</h2>
      </div>
    </div>
  );
};

export default Card;
