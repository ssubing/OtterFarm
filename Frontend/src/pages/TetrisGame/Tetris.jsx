import React from "react";
import "./Tetris.css";
import Game from "../../components/Tetris/Game/Game";
function Tetris() {
  return (
    <div className="tetris">
      <Game rows={20} columns={10} />
    </div>
  );
}

export default Tetris;
