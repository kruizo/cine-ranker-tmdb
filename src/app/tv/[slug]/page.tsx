"use client";
import { IMovieDetails, IMovie } from "@customTypes/index";
import Navbar from "@components/Navbar";
import { useEffect, useState } from "react";
import Rating from "@/app/_components/Rating";
import { useSearchParams } from "next/navigation";
import { fetchMovieDetailsById } from "@/app/api";
import { notFound } from "next/navigation";
import { BrowseListCards } from "@/app/_components/ListCards";

interface MoviePageProps {
  data: IMovie;
}

const TVPage: React.FC<MoviePageProps> = () => {
  const params = useSearchParams();
  const id = params.get("id");
  const [movie, setMovie] = useState<IMovieDetails | null>(null);

  useEffect(() => {
    const fetch = async () => {
      if (!id) {
        notFound();
      }
      try {
        const response = await fetchMovieDetailsById(id);
        setMovie(response);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetch();
  }, [id]);

  const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

  return (
    <div className="font-[family-name:var(--font-geist-sans)]" id="app">
      <Navbar />
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-center">
        {movie && (
          <>
            {/* Hero Section */}
            <section id="hero" className="relative w-full">
              <div className="relative overflow-x-hidden flex mt-10 items-center justify-center">
                <div className="relative min-w-full lg:pt-20 items-center  justify-center">
                  <div className="px-10 pt-28 md:mx-auto z-20 grid  grid-cols-5 max-w-6xl justify-center items-center gap-10">
                    <div className="hidden md:block h-full col-span-1 ">
                      <img
                        src={`${IMAGE_BASE_URL}/w500/${movie.poster_path}`}
                        className="rounded-lg object-contain h-full w-full"
                        alt={movie.title}
                      />
                    </div>
                    <div className="col-span-3 space-y-4 ">
                      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-3xl font-bold overflow-wrap text-wrap break-words line-clamp-3">
                        {movie.title}
                      </h1>
                      <div className="flex items-center justify-center md:justify-start">
                        <Rating
                          voteAverage={movie.vote_average}
                          popularity={movie.popularity}
                          release_date={movie.release_date}
                          language={movie.spoken_languages[0].iso_639_1}
                        />
                      </div>
                      <p className="font-mono italic"> {movie.tagline}</p>

                      <p className="hidden overflow-hidden pr-40 md:line-clamp-3 lg:line-clamp-5 text-sm lg:text-base font-sans text-[color:var(--base-text)]">
                        {movie.overview}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6 text-[var(--base-text)]">
                        {/* Left Column: Movie Information */}
                        <div>
                          <p>
                            <strong>Original Language:</strong>{" "}
                            {movie.original_language}
                          </p>
                          <p>
                            <strong>Release Date:</strong> {movie.release_date}
                          </p>
                          <p>
                            <strong>Status:</strong> {movie.status}
                          </p>
                        </div>

                        {/* Right Column: Production Information */}
                        <div>
                          <p>
                            <strong>Budget:</strong> $
                            {movie.budget.toLocaleString()}
                          </p>
                          <p>
                            <strong>Revenue:</strong> $
                            {movie.revenue.toLocaleString()}
                          </p>
                          <p>
                            <strong>Runtime:</strong> {movie.runtime} minutes
                          </p>
                        </div>
                      </div>

                      {/* Genres */}
                      <div className="mt-8 text-[var(--base-text)]">
                        <h3 className="text-xl font-semibold ">Genres</h3>
                        <div className="flex gap-4 mt-4">
                          {movie.genres.map((genre) => (
                            <span
                              key={genre.id}
                              className="px-4 py-2 text-sm font-medium text-[var(--accent-dark)] border border-[var(--accent-darker)] rounded-full"
                            >
                              {genre.name}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Production Companies
                      <div className="mt-8">
                        <h3 className="text-xl font-semibold">
                          Production Companies
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                          {movie.production_companies.map((company) => (
                            <div
                              key={company.id}
                              className="flex items-center gap-4"
                            >
                              <img
                                src={`${IMAGE_BASE_URL}/w200/${company.logo_path}`}
                                alt={company.name}
                                className="h-10 w-10 object-contain"
                              />
                              <span className="text-gray-700">
                                {company.name}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div> */}
                    </div>
                  </div>
                  <div className="absolute top-0 -z-20 w-full h-full max-h-[28rem] lg:max-h-[25rem]">
                    <div className="absolute inset-0 bg-black opacity-10" />
                    <div className="absolute top-0 inset-x-0 h-48 bg-gradient-to-t from-transparent to-base-300" />
                    <div className="absolute left inset-x-0 w-3/6 h-full bg-gradient-to-l from-transparent to-base-300" />
                    <div className="absolute bottom-0 inset-x-0 h-4/5 bg-gradient-to-b from-transparent to-base-300" />
                    <img
                      src={`${IMAGE_BASE_URL}/original/${movie.backdrop_path}`}
                      alt={`${movie.title} Background`}
                      className="w-full h-full object-cover object-center z-0"
                    />
                  </div>
                </div>
              </div>
            </section>
            <section className="w-full flex justify-center">
              <div className="col-span-6 ">
                <BrowseListCards
                  category="movies"
                  genres={movie.genres.map((genre) => genre.name)}
                  title=""
                  exact_genre={false}
                />
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default TVPage;
