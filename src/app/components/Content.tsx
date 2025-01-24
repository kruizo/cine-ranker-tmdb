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
  useEffect(() => {
    const getKeywordId = async () => {
      try {
        console.log("Fetching movies...");
        const response = await fetchKeywordId("1", 1);
        console.log("KEYWORD:ID = ", response);

        const disneyKeyword = response.results.find(
          (item: any) => item.name === "moana"
        );
        if (disneyKeyword) {
          console.log(`Disney Keyword ID: ${disneyKeyword.id}`);
          return disneyKeyword.id; // Return the ID
        } else {
          console.warn("Disney keyword not found");
          return null;
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    getKeywordId();
  }, []); // This ensures the effect runs only once after the initial render

  return (
    <Fragment>
      <div className="max-w-6xl px-5 max-auto flex gap-6">
        <div className="flex-1 flex flex-col space-y-6 overflow-hidden">
          <RecommendedListCards />
          <PopularTVListCards />
          <FilteredListCard keywords="Disney" genres="10402" />
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
