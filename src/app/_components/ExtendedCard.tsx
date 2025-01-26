import React from "react";
import { normalizeRating } from "@lib/script";

interface ExtendedCard {
  poster_path: string;
  media_type: string;
}

const ExtendedCard: React.FC<ExtendedCard> = ({ poster_path, media_type }) => {
  const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

  return (
    <div className="bg-base-100 shadow-xl rounded-md w-full overflow-hidden">
      <div className="h-full flex justify-center items-center relative group">
        <div className="absolute inset-0 bg-red bg-opacity-30 backdrop-blur-md rounded-md cursor-pointer  z-10 flex items-center justify-center">
          <span className="text-[var(--base-text)] group-hover:text-white transition-colors text-xl font-mono font-extralight">
            VIEW MORE
          </span>
        </div>
        <img
          src={`${IMAGE_BASE_URL}/w500/${poster_path}`}
          alt="Poster"
          className="absolute -z-10 top-0 b-0 h-full object-cover scale-75 pb-20 group-hover:scale-125 transition-all rounded-md object-center"
        />
      </div>
    </div>
  );
};

export default ExtendedCard;
