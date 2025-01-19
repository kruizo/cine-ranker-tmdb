import Link from "next/link";

const DetailsButton = () => {
  return (
    <Link href="pages/search">
      <button className="px-5 text-sm md:text-md py-3 bg-[color:var(--accent)] rounded-full text-[color:var(--text-white)] font-semibold ">
        More Details
      </button>
    </Link>
  );
};

export default DetailsButton;
