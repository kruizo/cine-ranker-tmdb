// import React from "react";
import DetailsButton from "@components/DetailsButton";
import ViewButton from "@components/ViewButton";
import styles from "@styles/hero.module.css";

const Hero = () => {
  return (
    <section id="hero" className="relative w-full overflow-hidden">
      <div className="relative w-full max-h-screen items-start justify-start">
        <div className="px-10 py-28 md:mx-auto z-20 grid grid-cols-3 max-w-6xl justify-center items-center">
          <div className="col-span-3 md:col-span-2 flex flex-col items-center md:items-start">
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
              <p className="hidden xs:flex lg:line-clamp-5 overflow-hidden pr-40 sm:text-sm md:text-md lg:text-lg font-mono text-[color:var(--base-text)]">
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
          <div className="hidden md:block">
            <img
              src="https://i.pinimg.com/736x/4c/6e/56/4c6e562c449ab4931d49a20a5cf7425f.jpg"
              className="w-3/4 rounded-lg shadow-2xl object-cover"
              alt="Box Office"
            />
          </div>
        </div>
        <div className="absolute top-0 -z-20 w-full h-full">
          <div className="absolute inset-0 bg-black opacity-20 z-10" />
          <div className="absolute top-0 inset-x-0 h-1/3 bg-gradient-to-t from-transparent to-base-300 z-40" />
          <div className="absolute left inset-x-0 w-3/5 h-full bg-gradient-to-l from-transparent to-base-300 z-40" />
          <div className="absolute bottom-0 inset-x-0 h-4/5  bg-gradient-to-b from-transparent to-base-300  z-40" />
          <img
            src="https://images.ctfassets.net/usf1vwtuqyxm/3SnGCWuRyMyyoS0eEUqGUy/afecda1d43c12fec8f52fc193c9ba7ed/HPHE_main_news_image.jpg?fm=jpg&q=70&w=2560"
            alt="Background"
            className="w-full h-full object-cover object-center z-0"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
