import React, { useState } from "react"
import "./Aircraft.css"
import Game from "./base/Game"
import Level1 from "./levels/Level1"
// import { GameGlobals } from "./helpers/GameGlobals"
import Score from "./actors/Score"


function Aircraft(props) {
  
  let [scoreVal, setScoreVal] = useState(0)
  let [gameStarted, setGameStarted] = useState(false)

//   constructor(props) {
//     super(props)
//     Aircraft.Instance = this
//   }
  const gameStart = () => { setGameStarted(gameStarted=true) }
  const gameRestart = () => { setGameStarted(gameStarted=false) }


    const style = {
      marginLeft: 0,
      marginTop: 0,
      width: "100vw",
      height: "calc(100vh - 56px)"
    }

    let game
    let start
    let scorePosition = "top"

    if (gameStarted) {
      scorePosition = "top"
      game = <Level1></Level1>
    } else if (scoreVal > 0) {
        /* 13행에 의해 GameGlobal.jsx 삭제해도 됨 */
      scorePosition = "center"
    } else {
      scorePosition = "hidden"
    }

    if (!gameStarted) {
      start = (
        <button
          name="Start"
          className={"startButton"}
          onClick={gameStart}
        >
          Start
        </button>
      )
    }

    return (
      <div className="Aircraft" style={style}>
        <Game width={style.width} height={style.height}>
          {game}
        </Game>
        {start}
        <Score position={scorePosition}></Score>
      </div>
    )
}

export default Aircraft
