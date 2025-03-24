import React, { useState, useEffect } from "react";
import {
  IMovie,
  IMovieCollection,
  ITvCollection,
  ITvShow,
} from "@customTypes/index";
import Banner from "./Banner";

interface BannerCarouselProps {
  category: "movies" | "tv";
  items: IMovieCollection | ITvCollection | null;
}

const BannerCarousel: React.FC<BannerCarouselProps> = ({ category, items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(
        (prevIndex) => (prevIndex + 1) % (items?.results.length || 1)
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [items]);

  return (
    <div className="relative h-96 w-full">
      <div className="flex justify-between items-center gap-2 absolute bottom-0 top-0 my-auto right-0 left-0 ">
        <button
          className={` px-3 py-2 z-30  transition-all rounded-md h-full opacity-15 w-32 flex justify-start items-center ${
            currentIndex !== 1
              ? "hover:text-[var(--accent)] hover:opacity-100"
              : "hover:text-[var(--base-gray)] hover:opacity-100"
          }`}
          disabled={currentIndex === 1}
          onClick={() => setCurrentIndex(currentIndex - 1)}
        >
          <i className="fa fa-angle-left" style={{ fontSize: "30px" }}></i>
        </button>
        <button
          className={` px-3 py-2 z-30  transition-all h-full rounded-md w-32 opacity-15 flex justify-end items-center ${
            currentIndex !== items?.total_pages
              ? " hover:text-[var(--accent)] hover:opacity-100"
              : "hover:text-[var(--base-gray)] hover:opacity-100"
          }`}
          disabled={currentIndex === items?.total_pages}
          onClick={() => setCurrentIndex(currentIndex + 1)}
        >
          <i className="fa fa-angle-right" style={{ fontSize: "30px" }}></i>
        </button>
      </div>
      {items &&
        items.results.map((item, index) => {
          const isVisible = index === currentIndex;

          if (category === "movies") {
            const movie = item as IMovie;
            return (
              <div
                key={movie.id}
                className={`absolute top-0 -z-10 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                  isVisible ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              >
                <Banner
                  media_type={movie.media_type ?? "movie"}
                  title={movie.title}
                  poster_path={movie.poster_path}
                  backdrop_path={movie.backdrop_path}
                  release_date={movie.release_date}
                  vote_average={movie.vote_average}
                  popularity={parseFloat(Number(movie.popularity).toFixed(2))}
                  vote_count={movie.vote_count}
                />
              </div>
            );
          } else {
            const tvShow = item as ITvShow;
            return (
              <div
                key={tvShow.id}
                className={`absolute top-0 -z-10  left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                  isVisible ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              >
                <Banner
                  media_type={tvShow.media_type ?? "TV"}
                  title={tvShow.name}
                  poster_path={tvShow.poster_path}
                  backdrop_path={tvShow.backdrop_path}
                  release_date={tvShow.first_air_date}
                  vote_average={tvShow.vote_average}
                  popularity={parseFloat(Number(tvShow.popularity).toFixed(2))}
                  vote_count={tvShow.vote_count}
                />
              </div>
            );
          }
        })}
    </div>
  );
};

export default BannerCarousel;
