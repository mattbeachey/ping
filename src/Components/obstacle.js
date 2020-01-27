import React from "react";

export default function Obstacle ( { top, left} ) {



    return (
        <div style={{
            top: `${top}px`,
            left: `${left}px`,
            position: "absolute",
            backgroundColor: "pink",
            width: "75px",
            height: "75px",
            borderRadius: "15px",
            // transform: "rotate(20deg)"
        }} />
    )
}