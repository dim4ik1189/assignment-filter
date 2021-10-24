import React from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { NextPage } from "next";

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

  const handleShoeTypeFilterClick = ({ target }: any) => {
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

  const handleOnColourClick = (e: any) => {
    const routerQueryCopy = { ...router.query };
    if (routerQueryCopy.page) {
      delete routerQueryCopy.page;
    }
    router.push({
      query: { ...routerQueryCopy, colour: e.target.id },
    });
  };

  // todo priceRange

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
    </FiltersContainer>
  );
};

export default Filters;

const FiltersContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 35em;
  margin: 0 auto;
`;

const ColoursContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1em;
  margin: 1em auto;

  a.active-colour {
    transform: scale(1.1) translateY(-5px);
    box-shadow: 0px 8px 6px 1px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: 0px 8px 6px 1px rgba(0, 0, 0, 0.3);
    -moz-box-shadow: 0px 8px 6px 1px rgba(0, 0, 0, 0.3);
  }
`;

const ShoeTypeFilterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin: 1em auto;
  gap: 0.5em;
  
  height: 8vh;
  font-size: 18px;

  a {
    text-decoration: underline;
    text-transform: uppercase;
  }

  a.active-shoe-type {
    text-decoration: underline;
    color: cornflowerblue;
  }
`;

const ColourContainer = styled.a`
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;
