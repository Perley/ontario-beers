import React from "react";
import { Router, Link as RouterLink } from "@reach/router";
import styled from "styled-components";
import BeerList from "./components/BeerList";
import RandomBeer from "./components/RandomBeer";

// beer data
import beerData from "./beers.json";

const Main = styled.div`
  position: fixed;
  display: inline-block;
  background-color: rgb(28, 32, 34);
  color: #ccc;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow-y: auto;
  overflow-x: hidden;
`;

const Nav = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  border-bottom: 1px solid #ccc;
`;

const Link = styled(RouterLink)`
  text-decoration: none;
  color: #ccc;
  border: 1px solid #ccc;
  padding: 5px;
  width: 100%;
  text-align: center;
`;

export default function App() {
  return (
    <Main>
      <Nav>
        <Link to="/">List</Link>
        <Link to="/random">Random</Link>
      </Nav>
      <Router>
        <BeerList path="/" beerData={beerData} />
        <RandomBeer path="/random" beerData={beerData} />
      </Router>
    </Main>
  );
}
