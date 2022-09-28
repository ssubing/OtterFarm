import React, { Component } from "react"
import Sprite from "../base/Sprite"
import VectorUtils from "../base/VectorUtils"
import "./Player.css"
import PlayerBullet from "./PlayerBullet"
import Aircraft from "../Aircraft"
import Explosion from "./Explosion"
import { GameGlobals } from "../helpers/GameGlobals"

class Player extends Component {
  state = {
    active: true,
    position: { x: 0, y: 0 },
    dimensions: { width: 30, height: 30 },
    velocity: { x: 0, y: 0 },
    maxSpeed: 30,
    turnDirection: "player-no-turn"
  }

  componentDidMount() {
    this.setState({
      position: {
        x: GameGlobals.Stage.state.gameProperties.width / 2,
        y: GameGlobals.Stage.state.gameProperties.height - 50
      }
    })
  }

  update(gameState) {
    if (gameState.input.fireDown) {
      this.move(gameState)
    }

    this.animate(gameState)
    this.shoot(gameState)
  }

  shoot(gameState) {
    if (gameState.frameCount % 15 === 0) {
      GameGlobals.Stage.addSprite(
        <PlayerBullet
          name="Shoot"
          position={{ x: this.state.position.x, y: this.state.position.y - 15 }}
        ></PlayerBullet>
      )
    }
  }

  animate(gameState) {
    let turnTreshold = 10
    if (this.state.velocity.x < -turnTreshold) {
      // this.state.turnDirection = "player-turn-right"
      this.useState({ turnDirection: "player-turn-right" })
    } else if (this.state.velocity.x > turnTreshold) {
      // this.state.turnDirection = "player-turn-left"
      this.useState({ turnDirection: "player-turn-left" })

    } else {
      // this.state.turnDirection = "player-no-turn"
      this.useState({ turnDirection: "player-no-turn" })
    }
  }

  move(gameState) {
    let axis = { x: gameState.input.axis.x, y: gameState.input.axis.y - 50 }
    let dir = VectorUtils.subtract(axis, this.state.position)
    let distance = VectorUtils.magnitude(dir)
    const arriveDistance = 50

    let speed = 0
    if (distance < arriveDistance) {
      speed = this.state.maxSpeed * (distance / arriveDistance)
    } else {
      speed = this.state.maxSpeed
    }
    let desired = VectorUtils.normalize(dir, speed)
    let steer = VectorUtils.subtract(desired, this.state.velocity)

    let newVelocity = VectorUtils.normalize(
      VectorUtils.add(steer, this.state.velocity),
      speed
    )
    let newPosition = VectorUtils.add(this.state.position, newVelocity)

    this.setState({
      velocity: newVelocity,
      position: newPosition
    })
  }

  restart() {
    Aircraft.Instance.gameRestart()
  }

  collidesWith(sprite) {
    if (sprite.props.name === "Enemy") {
      GameGlobals.Stage.addSprite(
        <Explosion
          name="Kaboom"
          position={this.state.position}
          onEnd={this.restart.bind(this)}
        ></Explosion>
      )
      GameGlobals.Stage.removeSprite(sprite)
      GameGlobals.Stage.removeSprite(this)
    }
  }

  constructor(props) {
    super(props)
    this.props = props
    if (this.props.position) {
      this.state.position = this.props.position
    }
    GameGlobals.Player = this
  }

  render() {
    return (
      <Sprite
        name="Player"
        dimensions={this.state.dimensions}
        position={this.state.position}
        flip={true}
        className={["player", this.state.turnDirection].join("")}
      ></Sprite>
    )
  }
}

export default Player
