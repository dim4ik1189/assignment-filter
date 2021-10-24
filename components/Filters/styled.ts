import styled from "styled-components";

export const FiltersContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40em;
  margin: 0 auto;
  padding-bottom: 3em;
`;

export const ColoursContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1em;
  margin: 1em auto;
  padding-bottom: 1em;

  a.active-colour {
    transform: scale(1.1) translateY(-5px);
    box-shadow: 0px 8px 6px 1px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: 0px 8px 6px 1px rgba(0, 0, 0, 0.3);
    -moz-box-shadow: 0px 8px 6px 1px rgba(0, 0, 0, 0.3);
  }
`;

export const ShoeTypeFilterContainer = styled.div`
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

export const ColourContainer = styled.a`
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

export const ClearFiltersContainer = styled.a`
  display: block;
  margin-top: 2em;
  margin-left: auto;
  font-size: 18px;
`;
