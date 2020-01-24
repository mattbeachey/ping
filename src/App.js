import React, { useReducer, useEffect } from "react";
import "./styles.css";
import Paddle from "./Components/Paddle";
import Ball from "./Components/Ball"

const initialState = {
  paddle1: {
    y: 0
  },
  paddle2: {
    y: 0
  },
  ball: {
    x: 0,
    y: 0,
    dx: 5,
    dy: 5
  }
};

function reducer(state, action) {
  switch (action.type) {
    case "MOVE_PADDLE1":
      return { ...state, paddle1: action.payload };
    case "MOVE_PADDLE2":
      return { ...state, paddle2: action.payload };
    case "MOVE_BALL":
      return { ...state, ball: action.payload };
    default:
      throw new Error();
  }
}


export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  //p1 paddle control
  function handleKey(e) {
    if (e.key === "s") {
      if (state.paddle1.y < 300) {
        dispatch({
          type: "MOVE_PADDLE1", payload: {
            y: (state.paddle1.y + 25)
          }
        })
      }
    }
    if (e.key === "w") {
      if (state.paddle1.y > -100) {
        dispatch({
          type: "MOVE_PADDLE1", payload: {
            y: (state.paddle1.y - 25)
          }
        })
      }
    }

  }

  useEffect(() => {
    window.addEventListener("keypress", handleKey)
    return () => window.removeEventListener("keypress", handleKey)
  }, [state.paddle1.y])



  //p2 paddle control
  function handleKey2(e) {
    if (e.key === "l") {
      if (state.paddle2.y < 300) {
        dispatch({
          type: "MOVE_PADDLE2", payload: {
            y: (state.paddle2.y + 25)
          }
        })
      }
    }
    if (e.key === "o") {
      if (state.paddle2.y > -100) {
        dispatch({
          type: "MOVE_PADDLE2", payload: {
            y: (state.paddle2.y - 25)
          }
        })
      }
    }

  }

  useEffect(() => {
    window.addEventListener("keypress", handleKey2)
    return () => window.removeEventListener("keypress", handleKey2)
  }, [state.paddle2.y])


  //Ball control

  useEffect(() => {
    const handle = setTimeout(() => {
        let dx = state.ball.dx;
        let dy = state.ball.dy;
        if (state.ball.x + state.ball.dx > 700 || state.ball.x + state.ball.dx < 0){
            dx = -dx
        }
        if (state.ball.y + state.ball.dy > 500 || state.ball.y + state.ball.dy < 0){
            dy = -dy
        }
        dispatch({
          type: "MOVE_BALL",
          payload: {
            dx,
            dy,
            x: state.ball.x + dx, 
            y: state.ball.y + dy
          }
        })
    }, 50)
    return () => clearTimeout(handle);
}, [state.ball])


  return (
    <div className="gameboard">
      <Ball pos={state.ball}/>
      <Paddle paddleY={state.paddle1.y} />
      <Paddle isPlayer2 paddleY={state.paddle2.y} />
      <h1>Fight!!!</h1>
    </div>
  );
}



//OLD VERSION with dual-move experiment 

// import React, { useState, useEffect } from "react";
// import "./styles.css";
// import Paddle from "./Components/Paddle";
// import Ball from "./Components/Ball"


// export default function App() {

//   const [p1PaddleY, setP1PaddlyY] = useState(0)
//   const [p2PaddleY, setP2PaddlyY] = useState(0)
//   const [p1MoveUp, setP1Moveup] = useState(false)
//   const [p2MoveUp, setP2MoveUp] = useState(false)

// //player 2 move detection
//   console.log("player 2 " + p2MoveUp)

//   function keyDown2(e) {
//     if (e.key === "i") {
//       setP2MoveUp(true)
//     }
//   }

//   function keyUp2(e){
//     if (e.key === "i") {
//       setP2MoveUp(false)
//     }
//   }

//   useEffect(() => {
//     window.addEventListener("keydown", keyDown2)
//   }, [])

//   useEffect(() => {
//     window.addEventListener("keyup", keyUp2)
//   }, [])


// //player 1 move detection
//   console.log("player 1 " + p1MoveUp)

//   function keyDown(e) {
//     if (e.key === "e") {
//       setP1Moveup(true)
//     }
//   }

//   function keyUp(e){
//     if (e.key === "e") {
//       setP1Moveup(false)
//     }
//   }

//   useEffect(() => {
//     window.addEventListener("keydown", keyDown)
//   }, [])

//   useEffect(() => {
//     window.addEventListener("keyup", keyUp)
//   }, [])


//   //p1 paddle control
//   function handleKey(e) {
//     if (e.key === "s") {
//       if (p1PaddleY < 300) {
//         setP1PaddlyY(p1PaddleY + 25)
//       }
//     }
//     if (e.key === "w") {
//       if (p1PaddleY > -100) {
//         setP1PaddlyY(p1PaddleY - 25)
//       }
//     }

//   }

//   useEffect(() => {
//     window.addEventListener("keypress", handleKey)
//     return () => window.removeEventListener("keypress", handleKey)
//   }, [p1PaddleY])

//   //p2 paddle control
//   function handleKey2(e) {
//     if (e.key === "l") {
//       if (p2PaddleY < 300) {
//         setP2PaddlyY(p2PaddleY + 25)
//       }
//     }
//     if (e.key === "o") {
//       if (p2PaddleY > -100) {
//         setP2PaddlyY(p2PaddleY - 25)
//       }
//     }

//   }

//   useEffect(() => {
//     window.addEventListener("keypress", handleKey2)
//     return () => window.removeEventListener("keypress", handleKey2)
//   }, [p2PaddleY])

//   // console.log(p1MoveUp)

//   return (
//     <div className="gameboard">
//       <Ball />
//       <Paddle paddleMoveUp={p1MoveUp} paddleY={p1PaddleY} />
//       <Paddle paddleMoveUp={p2MoveUp} isPlayer2 paddleY={p2PaddleY} />
//       <h1>Fight!!!</h1>
//     </div>
//   );
// }
