import React, { Component } from "react"

class Sprite extends Component {

  constructor(props) {
    super(props)
    this.props = props
  }
  render() {
    const style = {
      position: "absolute",
      width: `${this.props.dimensions.width}px`,
      height: `${this.props.dimensions.height}px`,
      top: `${this.props.position.y - this.props.dimensions.height / 2}px`,
      left: `${this.props.position.x - this.props.dimensions.width / 2}px`,
      display: "block",
      zIndex: 2
    }

    let appliedStyle = Object.assign(style, this.props.style)

    return <div style={appliedStyle} className={this.props.className} />
  }
}

export default Sprite
