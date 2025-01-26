"use client";
import { IMovie } from "@customTypes/index";
import Navbar from "@components/Navbar";
import { useEffect } from "react";

interface MoviePageProps {
  data: IMovie;
}
const MoviePage: React.FC<MoviePageProps> = ({ data }) => {
  useEffect(() => {}, []);

  const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

  return (
    <div className="font-[family-name:var(--font-geist-sans)]" id="app">
      <Navbar />
      <main className="flex gap-8 items-start sm:items-start mx-auto max-w-6xl pt-28 px-5 max-auto">
        <div
          id="slider"
          className="slider pointer-events-auto relative overflow-x-scroll overflow-y-hidden flex snap-x snap-mandatory mt-10"
        >
          <div className="feature-card flex-shrink snap-start transition-transform duration-300 relative min-w-full max-h-[40rem] lg:max-h-[42rem] lg:py-20 items-start justify-start">
            <div className="px-10 py-28 md:mx-auto z-20 grid grid-cols-3 max-w-6xl justify-center items-center">
              <div className="col-span-3 md:col-span-2 flex flex-col items-center md:items-start"></div>
            </div>
          </div>
          <div className="absolute top-0 -z-20 w-full h-full">
            <div className="absolute inset-0 bg-black opacity-10" />
            <div className="absolute top-0 inset-x-0 h-48 bg-gradient-to-t from-transparent to-base-300" />
            <div className="absolute left inset-x-0 w-3/6 h-full bg-gradient-to-l from-transparent to-base-300" />
            <div className="absolute bottom-0 inset-x-0 h-4/5 bg-gradient-to-b from-transparent to-base-300" />
            <img
              src={`${IMAGE_BASE_URL}/original/${data?.backdrop_path}`}
              alt={`${data?.title} Background`}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default MoviePage;
