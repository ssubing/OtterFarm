import "./Tetris.css";
import React from 'react'
import TetrisGame from "../../components/TetrisGame/TetrisGame"
function Tetris() {
  return (
    <div className="tetris">
        <TetrisGame rows={20} columns={10}/>
    </div>
  )
}

export default Tetris