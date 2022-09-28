import React, { Component } from "react"
import Sprite from "../base/Sprite"
import "./EnemyBase.css"

class EnemyBase extends Component {
  constructor(props) {
    super(props)
    this.props = props
  }

  update(gameState) {
    this.props.moveEnemy(gameState)
  }

  render() {
    return (
      <Sprite
        name="Enemy"
        dimensions={this.props.dimensions}
        position={this.props.position}
        className={this.props.className}
        style={this.props.style}
      ></Sprite>
    )
  }
}

export default EnemyBase
