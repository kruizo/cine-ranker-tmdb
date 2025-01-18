"use client";
import React from "react";

const SearchInput = () => {
  return (
    <div className="flex flex-row relative justify-between bg-black bg-opacity-30 rounded-3xl w-full items-center">
      <button className="absolute text-primary-content hidden lg:flex">
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

      <input
        type="text"
        placeholder="Search here"
        className="p-3 pr-16 pl-12 text-center bg-transparent rounded-3xl outline-none focus:shadow-2xl w-full appearance-none focus:shadow-base-200 hover:bg-base-300 transition-all"
      />

      <button
        type="button"
        className="absolute p-1 right-2 rounded-3xl h-7 text-sm btn-outline"
      >
        Search
      </button>
    </div>
  );
};

export default SearchInput;
