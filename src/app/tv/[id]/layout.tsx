import { Metadata } from "next";

export const metadata: Metadata = {
  title: "TV Shows",
  description: "Browse our collection of TV SHOWS",
};

export default function TVDetails({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="movies-layout">{children}</div>;
}
