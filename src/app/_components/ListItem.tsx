import Link from "next/link";

interface ListItemProps {
  id: number;
  poster_path: string;
  title: string;
  type: string;
  release_date: string;
  popularity: number;
  vote_rating: number;
}

const ListItem: React.FC<ListItemProps> = ({
  id,
  poster_path,
  title,
  type,
  release_date,
}) => {
  const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

  return (
    <>
      <Link href={`/movies/${id}`}>
        <div className="flex gap-4 py-2 overflow-hidden  hover:bg-[var(--base-darker)]">
          <div className="w-10 h-20">
            <img
              src={`${IMAGE_BASE_URL}/w500/${poster_path}`}
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
      </Link>
    </>
  );
};

export default ListItem;
