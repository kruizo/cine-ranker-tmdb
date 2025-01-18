import React from "react";

const Card = () => {
  return (
    <div className="card w-full bg-base-100 shadow-xl rounded-md">
      <figure>
        <img
          src="https://www.themoviedb.org/t/p/original/2t28k8LvS2mkhoDUHEdGNpmWu2N.jpg"
          alt="Shoes"
        />
      </figure>
      <div className="card-body py-3 px-0">
        <h2 className="card-title text-sm font-normal">Top Gun Maverick!</h2>
      </div>
    </div>
  );
};

export default Card;
