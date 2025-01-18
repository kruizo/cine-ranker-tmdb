import React from "react";

const Card = () => {
  return (
    <div className="w-full bg-base-100 shadow-xl rounded-md">
      <div className="h-52">
        <img
          src="https://wallpaperaccess.com/thumb/2203.jpg"
          alt="Shoes"
          className="h-full w-full object-cover rounded-md object-center"
        />
      </div>
      <div className="card-body py-3 px-0 ">
        <h2 className="card-title text-sm font-normal">Top Gun Maverick!</h2>
      </div>
    </div>
  );
};

export default Card;
