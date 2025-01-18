"use client";
import React, { useEffect, useState } from "react";
import SearchInput from "./SearchInput";

const ToggleSearch = () => {
  const [toggled, toggleSearch] = useState(false);

  const handleClick = () => {
    toggleSearch(!toggled);
  };

  useEffect(() => {
    const updateToggleState = () => {
      toggleSearch(false);
    };

    window.addEventListener("resize", updateToggleState);

    return () => {
      window.removeEventListener("resize", updateToggleState);
    };
  }, []);

  return (
    <>
      <button
        className="btn btn-ghost btn-circle md:hidden  text-primary-content"
        onClick={handleClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
      <div
        className={`absolute w-96 ${
          toggled ? "block" : "hidden"
        } z-30 top-14 left-1/2 transform -translate-x-1/2`}
      >
        <SearchInput />
      </div>
    </>
  );
};

export default ToggleSearch;
