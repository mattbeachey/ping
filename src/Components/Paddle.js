import React, { useState, useEffect } from "react";
import "./paddle.css";


export default function Paddle({ isPlayer2, paddleY, paddleMoveUp }) {

  return (
    <div>
      <div className={isPlayer2 ? "paddle player2" : "paddle"}
        style={{ transform: `translateY(calc(10% + ${paddleY}px))` }}
      />
    </div>
  )
}


//OLD VERSION with dual-moves attempt

// import React, { useState, useEffect } from "react";
// import "./paddle.css";


// export default function Paddle({ isPlayer2, paddleY, paddleMoveUp }) {


//   const [pos, setPos] = useState(0)

//   useEffect(() => {
//     setInterval(() => {
//       if (paddleMoveUp) {
//         setPos(pos + 1)
//         console.log("set interval")
//       }
//     }, 1000)
//   }, [paddleMoveUp])

//   console.log(pos)


//   return (
//     <div>
//       <div className={isPlayer2 ? "paddle player2" : "paddle"}
//         style={{ transform: `translateY(calc(10% + ${paddleY}px))` }}
//       />
//     </div>
//   )
// }
