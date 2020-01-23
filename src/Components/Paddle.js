import React from "react";
import "./paddle.css";

export default function Paddle({isPlayer2}) {
  return <div className={isPlayer2? "paddle player2" : "paddle"} />;
}
