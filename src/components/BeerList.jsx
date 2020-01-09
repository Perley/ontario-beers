import React, { useState } from "react";
import styled from "styled-components";
import { filterData } from "../utils.js";
import Beer from "./Beer";

const Content = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const InputGroup = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const Input = styled.input`
  width: 40%;
  padding: 5px;
  border-radius: 10px;
  box-shadow: none;
  border: 3px solid #0f89b9;

  @media only screen and (max-width: 412px) {
    width: 65%;
  }

  @media only screen and (max-width: 730px) {
    width: 80%;
  }
`;

const BeerCards = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

const PageGroup = styled.div`
  margin-top: 10px;
  padding: 5px;
  border-top: 1px solid #ccc;
  display: flex;
  flex-flow: column;
  align-items: center;
  width: 100%;
`;

const PageButtons = styled.div`
  display: flex;
`;

const Button = styled.button`
  padding: 3px 12px;
  box-shadow: none;
  border: 2px outset #aaa;
  background-color: #aaa;
  font-size: 24px;

  :focus,
  :active {
    outline: none;
  }
`;

const PrevButton = styled(Button)`
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;

  :after {
    content: "⮘";
  }

  :active {
    box-shadow: 1px 1px 3px 2px #777 inset;
  }
`;

const NextButton = styled(Button)`
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;

  :after {
    content: "⮚";
  }

  :active {
    box-shadow: -1px 1px 3px 2px #777 inset;
  }
`;

export default function BeerList({ beerData }) {
  const PAGE_SIZE = 12;
  const PROPS = ["name", "category", "abv", "type", "brewer", "country"];

  const [searchText, setSearchText] = useState("");
  const filteredData = filterData(searchText, beerData, PROPS);

  const [page, setPage] = useState(1);
  const maxPages = Math.ceil(filteredData.length / PAGE_SIZE);
  const start = (page - 1) * PAGE_SIZE;
  const end = page * PAGE_SIZE;
  const beers = filteredData.slice(start, end);

  function nextPage() {
    if (page !== maxPages) {
      setPage(page + 1);
    }
  }

  function prevPage() {
    if (page !== 1) {
      setPage(page - 1);
    }
  }

  return (
    <Content>
      <InputGroup>
        <Input
          placeholder="Search beers"
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
        />
      </InputGroup>
      <BeerCards>
        {beers.map(beer => (
          <Beer key={beer.beer_id} beer={beer} />
        ))}
      </BeerCards>
      <PageGroup>
        {maxPages !== 0 && <p>{`${page}/${maxPages}`}</p>}
        <PageButtons>
          <PrevButton onClick={prevPage} disabled={maxPages === 0} />
          <NextButton onClick={nextPage} disabled={maxPages === 0} />
        </PageButtons>
      </PageGroup>
    </Content>
  );
}
