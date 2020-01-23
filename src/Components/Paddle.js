import React, { useState, useEffect } from "react";
import "./paddle.css";


export default function Paddle({ isPlayer2, paddleY }) {

  return (
    <div>
      <div className={isPlayer2 ? "paddle player2" : "paddle"}
        style={{ transform: `translateY(calc(10% + ${paddleY}px))` }}
      />
    </div>
  )
}
