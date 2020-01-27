import React, { useReducer, useEffect } from "react";
import "./styles.css";
import Paddle from "./Components/Paddle";
import Ball from "./Components/Ball"
import Obstacle from "./Components/obstacle"

const initialState = {
  paddle1: {
    y: 0,
    dy: 0
  },
  paddle2: {
    y: 0,
    dy: 0
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
      return {
        ...state, paddle1: {
          ...state.paddle1,
          ...action.payload
        }
      };
    case "MOVE_PADDLE2":
      return {
        ...state, paddle2: {
          ...state.paddle2,
          ...action.payload
        }
      };
    case "RENDER":
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
      dispatch({
        type: "MOVE_PADDLE1", payload: {
          dy: 1
        }
      })

    }
    if (e.key === "w") {
      if (state.paddle1.y > -100) {
        dispatch({
          type: "MOVE_PADDLE1", payload: {
            y: (state.paddle1.y - 25)
          }
        })
      }
      dispatch({
        type: "MOVE_PADDLE1", payload: {
          dy: -1
        }
      })
    }

  }

  // console.log(state.paddle1.dy)

  useEffect(() => {
    window.addEventListener("keypress", handleKey)
    return () => window.removeEventListener("keypress", handleKey)
  }, [state.paddle1.y])

  // console.log(state.paddle1.dy)

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


  //Rendering and Collision Detection

  function willCollide(rect1, rect2) {
    let x = false;
    let y = false;
    let xCurr = false;
    let yCurr = false;
    let collided = false;

    const rect1XNext = rect1.x + rect1.dx;
    const rect1YNext = rect1.y + rect1.dy;

    if (rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x) {
      xCurr = true;
    }
    if (rect1.y < rect2.y + rect2.height && rect1.y + rect1.height > rect2.y) {
      yCurr = true;
    }
    if (
      yCurr &&
      rect1XNext < rect2.x + rect2.width &&
      rect1XNext + rect1.width > rect2.x
    ) {
      x = true;
    }
    if (
      xCurr &&
      rect1YNext < rect2.y + rect2.height &&
      rect1YNext + rect1.height > rect2.y
    ) {
      y = true;
    }
    if (
      rect1XNext < rect2.x + rect2.width &&
      rect1XNext + rect1.width > rect2.x &&
      rect1YNext < rect2.y + rect2.height &&
      rect1YNext + rect1.height > rect2.y
    ) {
      collided = true;
    }
    return { x, y, collided };
  }

  useEffect(() => {
    const handle = setTimeout(() => {
      let x = state.ball.x;
      let y = state.ball.y;
      let dx = state.ball.dx;
      let dy = state.ball.dy;

      let paddle1Y = state.paddle1.y + 100;
      let paddle2Y = state.paddle2.y + 100;

      if (state.ball.x + state.ball.dx > 660 || state.ball.x + state.ball.dx < 0) {
        dx = -dx
      }
      if (state.ball.y + state.ball.dy > 460 || state.ball.y + state.ball.dy < 0) {
        dy = -dy
      }

      const paddle1Collide = willCollide(
        {
          x,
          dx,
          y,
          dy,
          width: 40,
          height: 40
        },
        {
          x: 10,
          y: paddle1Y,
          height: 100,
          height: 100,
          width: 15
        }
      );

      if (paddle1Collide.y) {
        dy = -dy;
      }
      if (paddle1Collide.x) {
        dx = -dx;
      }

      const paddle2Collide = willCollide(
        {
          x,
          dx,
          y,
          dy,
          width: 40,
          height: 40
        },
        {
          x: 680,
          y: paddle2Y,
          height: 100,
          height: 100,
          width: 15
        }
      );

      if (paddle2Collide.y) {
        dy = -dy;
      }
      if (paddle2Collide.x) {
        dx = -dx;
      }

      // if (
      //   (paddle1Y < y + dy && paddle1Y + 100 > y + dy && x < 25) ||
      //   (paddle2Y < y + dy && paddle1Y + 100 > y + dy && x > 500)
      // ) {
      //   dx = -dx
      // }
      // console.log(state.ball.x + dx)

      dispatch({
        type: "RENDER",
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

  const obstaclesArray = [{ top: 100, left: 200 }, { top: 300, left: 500 }]

  return (
    <div className="gameboard">
      <Ball pos={state.ball} />
      <Paddle paddleY={state.paddle1.y} />
      <Paddle isPlayer2 paddleY={state.paddle2.y} />
      {obstaclesArray.map((block) => (
        <Obstacle
          top={block.top}
          left={block.left}
        />
      ))}
      <h1>Fight!!!</h1>
    </div>
  );
}

