import { Fragment } from "react";

interface ListItemProps {
  poster_path: string;
  title: string;
  type: string;
  release_date: string;
  popularity: number;
  vote_rating: number;
}

const ListItem: React.FC<ListItemProps> = ({
  poster_path,
  title,
  type,
  release_date,
  popularity,
  vote_rating,
}) => {
  return (
    <Fragment>
      <div className="flex gap-4 py-2 overflow-hidden">
        <div className="w-10 h-20">
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

export default ListItem;
