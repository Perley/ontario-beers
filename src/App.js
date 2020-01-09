import React, { useState } from "react";
import styled from "styled-components";

// placeholder
import placeholder from './placeholder.png';

// beer data
import beerData from "./beers.json";

const BeerCards = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

const BeerCard = styled.div`
  display: flex;
  flex-flow: column
  align-items: center;
  border: 1px solid #aaa;
  border-radius: 10px;
  padding: 15px;
  width: 250px;
  margin: 15px;
  box-sizing: border-box;

  :nth-child(even) {
    background-color: #ddd;
  }
`;

const ImageWrapper = styled.div`
  height: 200px;
  width: 100%;
  padding: 15px;
`;

const BeerImage = styled.img`
  height: 100%;
  width: 100%;
  border: 3px inset #ce1919;
  box-shadow: 0 0 5px 0 #555;
  box-sizing: border-box;
`;

const BeerInfo = styled.div`
  display: flex;
  flex-flow: column;
  align-items: start;
  width: 100%;
`;

const InfoGroup = styled.div`
  padding: 5px 0;
`;

const Label = styled.label`
  font-weight: bold;
  padding-right: 5px;
`;

const Text = styled.p`
  margin: 0;
`;

function Beer({ beer }) {
  const {
    image_url,
    name,
    type,
    brewer,
    country,
    category,
    abv,
  } = beer;
  const [imgUrl, setImageUrl] = useState(image_url)

  return (
    <BeerCard>
      <ImageWrapper>
        <BeerImage
          src={imgUrl}
          onError={(e) => setImageUrl(placeholder)}
          alt={name}
        />
      </ImageWrapper>
      <BeerInfo>
        <InfoGroup>
          <Label>Name: </Label>
          <Text>{name}</Text>
        </InfoGroup>
        <InfoGroup>
          <Label>Type: </Label>
          <Text>{type}</Text>
        </InfoGroup>
        <InfoGroup>
          <Label>Brewer: </Label>
          <Text>{brewer}</Text>
        </InfoGroup>
        <InfoGroup>
          <Label>Country: </Label>
          <Text>{country}</Text>
        </InfoGroup>
        <InfoGroup>
          <Label>Category: </Label>
          <Text>{category}</Text>
        </InfoGroup>
        <InfoGroup>
          <Label>% Alchohol: </Label>
          <Text>{abv}</Text>
        </InfoGroup>
      </BeerInfo>
    </BeerCard>
  );
}

function filterData(text, data, props) {
  return data.filter(beer => 
    props.find(key => {
      const prop = beer[key];
      if(typeof prop === 'string') {
        return prop.toLowerCase().includes(text.toLowerCase())
      }

      return false;
    })
  );
}

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
    <div>
      <input value={searchText} onChange={(e) => setSearchText(e.target.value)} />
      <BeerCards>
        {beers.map(beer => <Beer key={beer.beer_id} beer={beer} />)}
      </BeerCards>
      <span>{`${page}/${maxPages}`}</span>
      <button onClick={prevPage}>{'<--'}</button>
      <button onClick={nextPage}>{'-->'}</button>
    </div>
  );
}
