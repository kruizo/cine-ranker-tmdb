import React, { Fragment, use, useEffect, useRef } from "react";
import DetailsButton from "@components/DetailsButton";
import ViewButton from "@components/ViewButton";
import styles from "@styles/Hero.module.css";
import { IMovie } from "@customTypes/index";
import Rating from "./Rating";

interface HeroProps {
  featured: IMovie[] | null;
}

const Hero: React.FC<HeroProps> = ({ featured }) => {
  const movie = featured?.[4];

  const [currentIndex, setCurrentIndex] = React.useState(0);
  const sliderRef = React.useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollOffsetRef = useRef(0);

  const scrollToCard = (index: number) => {
    const card = document.querySelectorAll(".feature-card")[index];
    card.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "start",
    });
    setCurrentIndex(index);
  };

  const startDrag = (e: MouseEvent, index: number) => {
    console.log("Dragging started");
    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    scrollOffsetRef.current = sliderRef.current?.scrollLeft || 0;
    // Prevent text selection while dragging
    document.body.style.userSelect = "none";
    setCurrentIndex(index); // Set the active card index while dragging
  };

  const stopDrag = () => {
    isDraggingRef.current = false;
    document.body.style.userSelect = "auto";
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDraggingRef.current || !sliderRef.current) return;
    const distanceMoved = e.clientX - startXRef.current;
    sliderRef.current.scrollLeft = scrollOffsetRef.current - distanceMoved;
  };

  useEffect(() => {
    if (sliderRef.current) {
      console.log("Attaching mousedown event");
      window.addEventListener("mouseup", stopDrag);
      window.addEventListener("mousemove", handleMouseMove);

      return () => {
        window.removeEventListener("mouseup", stopDrag);
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, []);

  return (
    <section id="hero" className="relative ">
      <div
        ref={sliderRef}
        className="slider relative overflow-x-auto overflow-y-hidden flex snap-x snap-mandatory mt-10"
      >
        {featured && movie && (
          <Fragment>
            {featured.map((movie, index) => (
              <div
                key={index}
                onMouseDown={(e: React.MouseEvent<HTMLDivElement>) =>
                  startDrag(e.nativeEvent, index)
                }
                className="feature-card flex-shrink snap-start transition-transform duration-300 relative min-w-full max-h-[40rem] lg:max-h-[42rem] lg:py-20 items-start justify-start"
              >
                <div className="px-10 py-28 md:mx-auto z-20 grid grid-cols-3 max-w-6xl justify-center items-center">
                  <div className="col-span-3 md:col-span-2 flex flex-col items-center md:items-start">
                    <div>
                      <h1
                        className={`${styles.title} text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold overflow-wrap text-wrap break-words line-clamp-3`}
                      >
                        {movie.title}
                      </h1>
                      <div className="flex py-7 items-center justify-center md:justify-start">
                        <Rating
                          voteAverage={movie.vote_average}
                          popularity={movie.popularity}
                          release_date={movie.release_date}
                        />
                      </div>
                      <p className="hidden overflow-hidden pr-40 md:line-clamp-3 lg:line-clamp-5 text-sm lg:text-base font-sans text-[color:var(--base-text)]">
                        {movie.overview}
                      </p>
                    </div>
                    <div className="mt-7 flex gap-10 py-2">
                      <DetailsButton />
                      <ViewButton />
                    </div>
                  </div>
                  <div className="hidden md:block h-96">
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                      className="rounded-lg shadow-2xl object-contain h-full w-full"
                      alt={movie.title}
                    />
                  </div>
                </div>
                <div className="absolute top-0 -z-20 w-full h-full">
                  <div className="absolute inset-0 bg-black opacity-10" />
                  <div className="absolute top-0 inset-x-0 h-48 bg-gradient-to-t from-transparent to-base-300" />
                  <div className="absolute left inset-x-0 w-3/6 h-full bg-gradient-to-l from-transparent to-base-300" />
                  <div className="absolute bottom-0 inset-x-0 h-4/5 bg-gradient-to-b from-transparent to-base-300" />
                  <img
                    src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                    alt={`${movie.title} Background`}
                    className="w-full h-full object-cover object-center z-0"
                  />
                </div>
              </div>
            ))}
          </Fragment>
        )}
      </div>
      <div className="indicators absolute bottom-10 left-0 right-0 flex justify-center">
        {[...Array(5)].map((_, index) => (
          <button
            onClick={() => scrollToCard(index)}
            key={index}
            className="h-10 w-8 px-3 cursor-pointer relative group "
          >
            <div
              className={`absolute w-6  bottom-0 right-0 left-0  ${
                currentIndex === index
                  ? "bg-[var(--accent)] h-6 rounded-b-lg"
                  : "bg-[var(--base-text)] h-[2px]"
              } mx-auto transition-all group-hover:h-6 group-hover:rounded-b-lg`}
            ></div>
          </button>
        ))}
      </div>
    </section>
  );
};

export default Hero;
