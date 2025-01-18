// import React from "react";
import DetailsButton from "@components/DetailsButton";
import ViewButton from "@components/ViewButton";
import styles from "@styles/Hero.module.css";

const Hero = () => {
  return (
    <section id="hero" className="relative w-full overflow-hidden ">
      <div className="relative w-full items-start max-w-screen max-h-[51rem] justify-start py-52">
        <div className="px-10 md:mx-auto h-full  z-20 grid grid-cols-3 max-w-6xl justify-center items-center">
          <div className="col-span-3 h-full md:col-span-2 flex flex-col  items-center justify-center md:items-start">
            <div>
              <h1
                className={`${styles.title} text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold overflow-wrap text-wrap break-words line-clamp-3`}
              >
                Harry Potter
              </h1>
              <div className="flex py-7 items-center">
                <i className="fa fa-star text-accent"></i>
                <i className="fa fa-star text-accent"></i>
                <i className="fa fa-star text-accent"></i>
                <i className="fa fa-star text-accent"></i>
                <i className="fa fa-star-half text-accent"></i>
                <label className="ml-2">4 IMDB</label>
                <span className="mx-4">| GP |</span>
                <label>2.4hrs</label>
              </div>
              <p className="hidden lg:line-clamp-5 overflow-hidden pr-40 sm:text-sm md:text-md lg:text-lg font-mono text-[color:var(--base-text)]">
                During World War I, two British soldiers -- Lance Cpl. Schofield
                and Lance Cpl. Blake -- receive seemingly impossible orders. In
                a race against time, they must cross over into enemy territory
                to deliver a message that could potentially save 1,600 of
                theirrld War I, two British soldiers -- Lance Cpl. Schofield and
                Lance Cpl. Blake -- receive seemingly impossible orders. In a
                race against time, they must cross over into enemy territory to
                deliver a message that could potentially save 1,600 of their
                fellow comrades -- including Blake's own brother. fellow
                comrades -- including Blake's own brother.
              </p>
            </div>
            <div className="mt-7 flex gap-10 py-2">
              <DetailsButton />
              <ViewButton />
            </div>
          </div>
          <div className="hidden md:block h-96 ">
            <img
              src="
                    https://i.pinimg.com/736x/4c/6e/56/4c6e562c449ab4931d49a20a5cf7425f.jpg
                    "
              className="rounded-lg shadow-2xl object-contain h-full w-full"
              alt="Box Office"
            />
          </div>
        </div>
        <div className="absolute top-0 -z-20 w-full h-full ">
          <div className="absolute inset-0 bg-black opacity-20 z-10" />
          <div className="absolute top-0 inset-x-0 h-20 bg-gradient-to-t from-transparent to-base-300 z-40" />
          <div className="absolute left inset-x-0 w-3/5 h-full bg-gradient-to-l from-transparent to-base-300 z-40" />
          <div className="absolute bottom-0 inset-x-0 h-4/5  bg-gradient-to-b from-transparent to-base-300  z-40" />
          <img
            src="https://wallpaperaccess.com/full/276147.jpg"
            alt="Background"
            className="w-full h-full object-cover object-center z-0"
          />
        </div>
      </div>
      <div className="absolute bottom-10 left-0 right-0 flex justify-center">
        <div className="h-10 w-8 px-3 cursor-pointer relative group overflow-hidden">
          <div className="absolute -top-8 right-0 left-0 w-6 h-6 bg-[var(--accent)] mx-auto transition-all rounded-b-lg group-hover:h-6 group-hover:top-4"></div>
          <div className="absolute bottom-0 right-0 left-0 w-6 h-[2px] bg-[var(--base-text)] mx-auto transition-all group-hover:h-6 group-hover:-bottom-10"></div>
        </div>
        <div className="h-10 w-8 px-3 cursor-pointer relative group ">
          <div className="absolute bottom-0 right-0 left-0 w-6 h-[2px] bg-[var(--base-text)] mx-auto transition-all group-hover:h-6 group-hover:rounded-b-lg"></div>
        </div>
        <div className="h-10 w-8 px-3 cursor-pointer relative group  ">
          <div className="absolute bottom-0 right-0 left-0 w-6 h-[2px] bg-[var(--base-text)] mx-auto transition-all group-hover:h-6 group-hover:rounded-b-lg"></div>
        </div>
        <div className="h-10 w-8 px-3 cursor-pointer relative group ">
          <div className="absolute bottom-0 right-0 left-0 w-6 h-[2px] bg-[var(--base-text)] mx-auto transition-all group-hover:h-6 group-hover:rounded-b-lg"></div>
        </div>
        <div className="h-10 w-8 px-3 cursor-pointer relative group ">
          <div className="absolute bottom-0 right-0 left-0 w-6 h-[2px] bg-[var(--base-text)] mx-auto transition-all group-hover:h-6 group-hover:rounded-b-lg"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
