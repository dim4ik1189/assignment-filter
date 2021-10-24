import styled from "styled-components";

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25em;
  position: relative;

  > img {
    width: 30em;
  }
`;

export const NameContainer = styled.div`
  max-width: 290px;
  text-transform: uppercase;
  font-size: 15px;
  letter-spacing: 0.2em;

  span {
    position: absolute;
    bottom: 18px;
    right: 3px;
  }
`;

export const ListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 3em;
  margin: 0 1.5em;
  justify-content: center;
  align-items: center;
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 75vh;
  font-size: 25px;
  color: cadetblue;
`;
