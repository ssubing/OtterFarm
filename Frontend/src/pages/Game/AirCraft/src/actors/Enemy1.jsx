import React, { Component } from "react"
import EnemyBase from "./EnemyBase"
import { GameGlobals } from "../helpers/GameGlobals"

class Enemy1 extends Component {
  state = {
    active: true,
    position: { x: 0, y: 0 },
    dimensions: { width: 30, height: 30 },
    vel: { x: 0, y: 2 }
  }

  constructor(props) {
    super(props)
    this.props = props
    if (this.props.position) {
      this.state.position = this.props.position
    }
  }

  componentDidMount() {
    this.base = this.refs.base
  }

  update = gameState => {
    this.base.update(gameState)
  }

  move(gameState) {
    this.setState({
      position: {
        x: this.state.position.x + this.state.vel.x,
        y: this.state.position.y + this.state.vel.y
      }
    })
    if (this.state.position.y > gameState.gameProperties.height + 100) {
      GameGlobals.Stage.removeSprite(this)
    }
  }

  render() {
    return (
      <EnemyBase
        ref="base"
        update={this.update.bind(this)}
        position={this.state.position}
        dimensions={this.state.dimensions}
        moveEnemy={this.move.bind(this)}
        className="enemy1"
      ></EnemyBase>
    )
  }
}

export default Enemy1
