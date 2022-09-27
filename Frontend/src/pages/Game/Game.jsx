import React from "react";
import { Link } from "react-router-dom";
import fallingGame from "../../assets/images/falling-game.gif";

function Game() {
  return (
    <div>
      <h1>game page</h1>
      <Link to="/fallingGame">
        <img src={fallingGame} alt="낙하 게임" />
      </Link>
    </div>
  );
}

export default Game;
