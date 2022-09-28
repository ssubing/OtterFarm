import React, { Component } from "react"
import { GameGlobals } from "../helpers/GameGlobals"
import "./Score.css"

class Score extends Component {
  state = {
    currentScore: 0
  }
  constructor(props) {
    super(props)
    this.props = props
    GameGlobals.Score = this
  }
  incrementScore(amount) {
    GameGlobals.ScoreVal += amount
    console.log("증가 스코어:", amount, GameGlobals.ScoreVal)

    this.setState({
      currentScore: GameGlobals.ScoreVal
    })
  }
  resetScore() {
    GameGlobals.ScoreVal = 0
    this.setState({ currentScore: 0 })
  }
  render() {
    const scoreNumber = this.state.currentScore
    return (
      <div className={["score", this.props.position].join(" ")}>
        score: {scoreNumber}
      </div>
    )
  }
}

export default Score
