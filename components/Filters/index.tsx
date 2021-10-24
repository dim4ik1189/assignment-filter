import React from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

const shoeTypeFilters = [
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

const colors = [
  "Black",
  "Blue",
  "Brown",
  "Orange",
  "Red",
  "Purple",
  "Gold",
  "Silver",
];

const sizes = ["34", "35", "36", "37", "38", "39", "40", "41", "42"];

const styleFilters = ['']

type FiltersProps = {
  q: string;
};


const Filters: React.FC<FiltersProps> = ({ q }) => {
  const router = useRouter();

  const handleShoeTypeFilterClick = (e: any) => {
    router.push({
      query: { shoe_type: e.target.id },
    });
  };

  // todo priceRange

  return (
    <FilterContainer>
      {shoeTypeFilters.map((mainFilter: string) => {
        return (
          <a
            id={mainFilter}
            className={q === mainFilter && q !== "All" ? "active-filter" : ""}
            key={mainFilter}
            onClick={handleShoeTypeFilterClick}
          >
            {mainFilter}
          </a>
        );
      })}
    </FilterContainer>
  );
};

export default Filters;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1em;
  height: 8vh;
  font-size: 20px;

  a {
    text-decoration: none;
    text-transform: uppercase;
  }

  a.active-filter {
    text-decoration: underline;
    color: cornflowerblue;
  }
`;
