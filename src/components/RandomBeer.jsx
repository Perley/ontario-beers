import React from "react";
import styled from "styled-components";
import Beer from "./Beer";

const Content = styled.div`
  display: flex;
  justify-content: center;
`;

export default function RandomBeer({ beerData }) {
  const idx = Math.floor(Math.random() * beerData.length);
  const random = beerData[idx];

  return (
    <Content>
      <Beer beer={random} />
    </Content>
  );
}
