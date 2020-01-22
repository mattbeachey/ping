import React from "react";
import "./styles.css";
import Paddle1 from "./Components/Paddle1";
import Paddle2 from "./Components/Paddle2";

export default function App() {
  return (
    <div className="App">
      <Paddle1 />
      <Paddle2 />
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
