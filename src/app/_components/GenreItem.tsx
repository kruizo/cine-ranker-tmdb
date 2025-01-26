import React from "react";
import Link from "next/link";

interface GenreItemProps {
  genreName: string;
  href: string;
  isActive: boolean;
  onClick: () => void;
}

const GenreItem: React.FC<GenreItemProps> = ({
  genreName,
  href,
  isActive,
  onClick,
}) => {
  return (
    <Link href={href} onClick={onClick}>
      {" "}
      <div className={`flex justify-between items-center py-2 rounded-md`}>
        <p
          className={`text-md font-semibold ${
            isActive ? "underline text-[var(--accent)]" : "text-gray-800"
          }`}
        >
          {genreName}
        </p>
      </div>
    </Link>
  );
};

export default GenreItem;
