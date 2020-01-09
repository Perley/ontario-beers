import React from "react";
import beers from "./beers.json";
import "./styles.css";
import styled from "styled-components";

export default function App() {
  //console.log(beers)
  const imgUrl = beers[1].image_url;

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <img src={imgUrl} alt="beer" />
    </div>
  );
}
