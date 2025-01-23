import { IMovieCollection } from "@customTypes/index";
import CardsList from "./CardsList";
import { fetchLatestMovies } from "../api";
import { Fragment, useState, useEffect } from "react";
import RecommendedListCards from "@components/RecommendedListCards";
import TrendingList from "@components/TrendingList";
import Sidepanel from "@components/Sidepanel";
import UpcomingList from "@components/UpcomingList";
import PopularTVListCards from "./PopularTVListCards";

const Content = () => {
  return (
    <Fragment>
      <div className="max-w-6xl px-5 flex gap-6">
        <div className="space-y-2">
          <RecommendedListCards />
          <PopularTVListCards />
        </div>
        <div className="pt-20">
          <Sidepanel>
            <TrendingList />
            <UpcomingList />
          </Sidepanel>
        </div>
      </div>
    </Fragment>
  );
};

export default Content;
