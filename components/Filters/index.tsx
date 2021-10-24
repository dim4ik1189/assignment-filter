import React from 'react';
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

type FiltersProps = {
  q: string;
}

const Filters: React.FC<FiltersProps> = ({ q }) => {
  const router = useRouter();

  const handleFilterClick = (e: any) => {
    router.push({
      query: { filter: e.target.id },
    });
  };

  return (
    <FilterContainer>
      {shoeTypeFilters.map((mainFilter: string) => {
        return (
          <a
            id={mainFilter}
            className={q === mainFilter && q !== "All" ? "active-filter" : ""}
            key={mainFilter}
            onClick={handleFilterClick}
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
