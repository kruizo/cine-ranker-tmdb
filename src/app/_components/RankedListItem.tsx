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
  const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;
  return (
    <>
      <div className="overflow-hidden relative flex flex-col justify-center">
        {/* <div className="text-4xl w-10 flex justify-center items-center p-1 font-bold text-[var(--accent)] border border-[var(--text-accent)]">
          {rank}
        </div> */}
        <div
          className="absolute text-6xl z-20 left-4 top-0 bottom-0 my-auto w-12 h-[4.4rem] rounded-full flex justify-center items-center p-1 font-extrabold text-transparent bg-black -ml-4"
          style={{
            WebkitTextStroke: "2px var(--accent)",
          }}
        >
          {rank}
        </div>
        <div className="ml-9 flex gap-4 ">
          <div className="min-w-10 w-10 h-20">
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
      </div>
    </>
  );
};

export default RankedListItem;
