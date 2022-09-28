import React, { Component } from "react"
import "./Aircraft.css"
import Game from "./base/Game"
import Level1 from "./levels/Level1"
import { GameGlobals } from "./helpers/GameGlobals"
import Score from "./actors/Score"

class Aircraft extends Component {
  state = {
    gameStarted: false
  }

  constructor(props) {
    super(props)
    Aircraft.Instance = this
  }
  gameStart() {
    this.setState({ gameStarted: true })
  }
  gameRestart() {
    this.setState({ gameStarted: false })
  }

  render() {
    const style = {
      marginLeft: 0,
      marginTop: 0,
      width: "100vw",
      height: "calc(100vh - 56px)"
    }

    let game
    let start
    let scorePosition = "top"

    if (this.state.gameStarted) {
      scorePosition = "top"
      game = <Level1></Level1>
    } else if (GameGlobals.ScoreVal > 0) {
      scorePosition = "center"
    } else {
      scorePosition = "hidden"
    }

    if (!this.state.gameStarted) {
      start = (
        <button
          name="Start"
          className={"startButton"}
          onClick={this.gameStart.bind(this)}
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
}

export default Aircraft
