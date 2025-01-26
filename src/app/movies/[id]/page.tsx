"use client";
import { IMovie } from "@customTypes/index";
import Navbar from "@components/Navbar";
import { useEffect } from "react";
import Hero from "@/app/_components/Hero";
import Rating from "@/app/_components/Rating";
import Link from "next/link";

interface MoviePageProps {
  data: IMovie;
}
const MoviePage: React.FC<MoviePageProps> = ({ data }) => {
  useEffect(() => {}, []);

  const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

  return (
    <div className="font-[family-name:var(--font-geist-sans)]" id="app">
      <Navbar />
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-center">
        <Hero></Hero>
      </main>
    </div>
  );
};

export default MoviePage;
