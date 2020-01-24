import React, { useState, useEffect } from "react";
import "./paddle.css";


export default function Paddle({ isPlayer2, paddleY, p1MoveUp, p2MoveUp }) {


if (p1MoveUp = true) {
  console.log("move UPPPP " + paddleY)
}



  return (
    <div>
      <div className={isPlayer2 ? "paddle player2" : "paddle"}
        style={{ transform: `translateY(calc(10% + ${paddleY}px))` }}
      />
    </div>
  )
}
