import { IMovieCollection } from "@customTypes/index";
import CardsList from "./CardsList";
import { fetchKeywordId } from "../api";
import { Fragment, useState, useEffect } from "react";
import RecommendedListCards from "@components/RecommendedListCards";
import TrendingList from "@components/TrendingList";
import Sidepanel from "@components/Sidepanel";
import UpcomingList from "@components/UpcomingList";
import PopularTVListCards from "@components/PopularTVListCards";
import FilteredListCard from "@components/FilteredListCard";
import { get } from "http";

const Content = () => {
  return (
    <Fragment>
      <div className="w-full max-w-6xl px-5 max-auto flex gap-6">
        <div className="flex-1 flex flex-col space-y-6 overflow-hidden">
          <RecommendedListCards />
          <PopularTVListCards />
          <FilteredListCard
            title="Disney"
            companyIds={["5391", "3166", "158526", "177195", "171657", "52126"]}
            include_adult={true}
          />
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
