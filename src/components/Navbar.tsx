import React from "react";
import SearchInput from "@components/SearchInput";
import ToggleSearch from "@components/ToggleSearch";

const Navbar = () => {
  return (
    <nav className="absolute mx-auto px-10 right-0 left-0 max-w-6xl bg-transparent justify-between py-10 z-20 ">
      <div className="flex justify-between  h-12">
        <div className="flex justify-center items-center gap-4 ">
          <div className=" text-primary-content">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle text-primary-content"
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
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </div>
          </div>
          <a className="btn btn-ghost hidden text-xl lg:flex text-primary-content">
            MovieNext
          </a>
        </div>

        <div className="hidden sm:flex w-[40rem]">
          <SearchInput />
        </div>

        <div className="flex items-center w-fit justify-between sm:hidden">
          <ToggleSearch />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
