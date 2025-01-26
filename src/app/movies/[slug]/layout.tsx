import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Movies",
  description: "Browse our collection of movies",
};

export default function MoviesDetails({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div>{children}</div>;
}
