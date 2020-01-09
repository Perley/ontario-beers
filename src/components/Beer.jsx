import React, { useState } from 'react';
import styled from 'styled-components';

// placeholder
import placeholder from '../placeholder.png';

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
  background-color: rgb(28, 32, 34);
  color: #ccc;
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
  color: #fff;
`;

const Text = styled.p`
  margin: 0;
`;

export default function Beer({ beer }) {
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
