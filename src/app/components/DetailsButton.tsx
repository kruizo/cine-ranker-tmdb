import Link from "next/link";

interface DetailsButtonProps {
  href: string;
}

const DetailsButton: React.FC<DetailsButtonProps> = ({ href }) => {
  return (
    <Link href={href}>
      <button className="px-5 text-sm md:text-md py-3 bg-[color:var(--accent)] rounded-full text-[color:var(--text-white)] font-semibold">
        More Details
      </button>
    </Link>
  );
};

export default DetailsButton;
