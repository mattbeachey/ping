import React from "react";
import "./styles.css";
import Paddle from "./Components/Paddle";


export default function App() {
  return (
    <div className="gameboard">
      <Paddle isPlayer1/>
      <Paddle isPlayer2/>
      <h1>Fight!!!</h1>
    </div>
  );
}
