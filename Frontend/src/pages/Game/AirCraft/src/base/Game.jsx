import React, { Component } from "react"
import "./Game.css"

class Game extends Component {
  constructor(props) {
    super(props)
    this.props = props
  }
  render() {
    const style = {
      position: "relative",
      width: "100%",
      height: "100%",
      padding: 0,
      display: "block"
    }
    return (
      <div id="game" className="game-shooter" style={style}>
        {this.props.children}
      </div>
    )
  }
}

export default Game
