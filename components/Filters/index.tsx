import React from "react";
import { useRouter } from "next/router";
import { NextPage } from "next";
import RangeBar from "./RangeBar";
import {
  ShoeTypeFilterContainer,
  FiltersContainer,
  ColoursContainer,
  ColourContainer,
  ClearFiltersContainer,
} from "./styled";

const SHOE_TYPE_FILTERS = [
  "All",
  "Boots",
  "Sandals",
  "Flats",
  "Heels",
  "Mules",
  "Brogues",
  "Sneakers",
  "Ballerinas",
];

const COLOURS = [
  "Black",
  "Blue",
  "Brown",
  "Orange",
  "Red",
  "Purple",
  "Gold",
  "Silver",
];

const Filters: NextPage = () => {
  const router = useRouter();

  const handleShoeTypeFilterClick = ({ target }: any): void => {
    const routerQueryCopy = { ...router.query };
    if (routerQueryCopy.page) {
      delete routerQueryCopy.page;
    }

    if (target.id === "All") {
      delete routerQueryCopy.shoe_type;
    }
    router.push({
      query: {
        ...routerQueryCopy,
        ...(target.id !== "All" && { shoe_type: target.id }),
      },
    });
  };

  const handleOnColourClick = (e: any): void => {
    const routerQueryCopy = { ...router.query };
    if (routerQueryCopy.page) {
      delete routerQueryCopy.page;
    }
    router.push({
      query: { ...routerQueryCopy, colour: e.target.id },
    });
  };

  const handleClearFilters = () => {
    if (Object.keys(router.query).length) {
      router.push({
        query: {},
      });
    }
  };

  return (
    <FiltersContainer>
      <ShoeTypeFilterContainer>
        TAGS:
        {SHOE_TYPE_FILTERS.map((mainFilter: string) => {
          return (
            <a
              id={mainFilter}
              className={
                router.query.shoe_type === mainFilter ? "active-shoe-type" : ""
              }
              key={mainFilter}
              onClick={handleShoeTypeFilterClick}
            >
              {mainFilter}
            </a>
          );
        })}
      </ShoeTypeFilterContainer>
      <ColoursContainer>
        COLOURS:
        {COLOURS.map((c: string) => {
          return (
            <ColourContainer
              id={c}
              className={
                router.query.colour === c && router.query.colour !== "All"
                  ? "active-colour"
                  : ""
              }
              key={c}
              color={c.toLowerCase()}
              onClick={handleOnColourClick}
            />
          );
        })}
      </ColoursContainer>
      <RangeBar />
      {Boolean(Object.keys(router.query).length) && (
        <ClearFiltersContainer onClick={handleClearFilters}>
          CLEAR FILTERS
        </ClearFiltersContainer>
      )}
    </FiltersContainer>
  );
};

export default Filters;
