import React, { useState, useEffect } from "react";
import "./styles.css";
import Paddle from "./Components/Paddle";
import Ball from "./Components/Ball"


export default function App() {

  const [p1PaddleY, setP1PaddlyY] = useState(0)
  const [p2PaddleY, setP2PaddlyY] = useState(0)

//p1 paddle control
  function handleKey(e) {
    if (e.key === "s") {
      if (p1PaddleY < 300) {
        setP1PaddlyY(p1PaddleY + 25)
      }
    }
    if (e.key === "w") {
      if (p1PaddleY > -100) {
        setP1PaddlyY(p1PaddleY - 25)
      }
    }

  }

  useEffect(() => {
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [p1PaddleY])

//p2 paddle control
  function handleKey2(e) {
    if (e.key === "o") {
      if (p2PaddleY < 300) {
        setP2PaddlyY(p2PaddleY + 25)
      }
    }
    if (e.key === "l") {
      if (p2PaddleY > -100) {
        setP2PaddlyY(p2PaddleY - 25)
      }
    }

  }

  useEffect(() => {
    window.addEventListener("keydown", handleKey2)
    return () => window.removeEventListener("keydown", handleKey2)
  }, [p2PaddleY])

  return (
    <div className="gameboard">
      <Ball />
      <Paddle paddleY={p1PaddleY} />
      <Paddle isPlayer2 paddleY={p2PaddleY} />
      <h1>Fight!!!</h1>
    </div>
  );
}
