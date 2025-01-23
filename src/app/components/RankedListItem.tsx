import { Fragment } from "react";

interface RankedListItemProps {
  poster_path: string;
  title: string;
  type: string;
  release_date: string;
  popularity: number;
  vote_rating: number;
  rank: number;
}

const RankedListItem: React.FC<RankedListItemProps> = ({
  poster_path,
  title,
  type,
  release_date,
  popularity,
  vote_rating,
  rank,
}) => {
  return (
    <Fragment>
      <div className="flex gap-4 p-2 overflow-hidden">
        {/* <div className="text-4xl w-10 flex justify-center items-center p-1 font-bold text-[var(--accent)] border border-[var(--text-accent)]">
          {rank}
        </div> */}
        <div
          className="text-6xl z-20 my-auto w-20 h-[5rem] rounded-full flex justify-center items-center p-1 font-extrabold text-transparent bg-black -ml-4"
          style={{
            WebkitTextStroke: "2px var(--accent)",
          }}
        >
          {rank}
        </div>
        <div className="w-10 h-20 -ml-5">
          <img
            src={`https://image.tmdb.org/t/p/w500/${poster_path}}`}
            alt={`${title}-poster`}
            className="w-full h-full object-cover rounded-md"
          />
        </div>
        <div className="flex flex-col gap-2 items-start justify-center">
          <span className="text-sm text-[var(--base-gray)]">
            {type} / {release_date.split("-")[0]}
          </span>
          <h3 className="text-md font-semibold line-clamp-1">{title}</h3>
        </div>
      </div>
    </Fragment>
  );
};

export default RankedListItem;
