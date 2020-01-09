import React, { useState } from 'react';
import styled from 'styled-components';
import { filterData } from './utils.js'
import Beer from './components/Beer';

// beer data
import beerData from "./beers.json";

const Main = styled.div`
  background-color: rgb(28, 32, 34);
`;

const BeerCards = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

export default function App() {
  const PAGE_SIZE = 10;
  const PROPS = ['name', 'category', 'abv', 'type', 'brewer', 'country'];

  const [searchText, setSearchText] = useState('');
  const filteredData = filterData(searchText, beerData, PROPS);

  const [page, setPage] = useState(1);
  const maxPages = Math.ceil(filteredData.length / PAGE_SIZE)
  const start = (page - 1) * PAGE_SIZE;
  const end = page * PAGE_SIZE;
  const beers = filteredData.slice(start, end);

  function nextPage() {
    if(page !== maxPages) {
      setPage(page + 1);
    }
  }

  function prevPage() {
    if(page !== 1) {
      setPage(page - 1);
    }
  }

  return (
    <App>
      <input value={searchText} onChange={(e) => setSearchText(e.target.value)} />
      <BeerCards>
        {beers.map(beer => <Beer key={beer.beer_id} beer={beer} />)}
      </BeerCards>
      <span>{`${page}/${maxPages}`}</span>
      <button onClick={prevPage}>{'<--'}</button>
      <button onClick={nextPage}>{'-->'}</button>
    </App>
  );
}
