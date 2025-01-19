import Link from "next/link";

const ViewButton = () => {
  return (
    <button className="px-3 text-sm md:text-md py-3 rounded-full text-[color:var(--accent)] font-semibold ">
      <i className="fa fa-play-circle-o"></i>
      Trailer
    </button>
  );
};

export default ViewButton;
