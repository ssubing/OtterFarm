import React from "react";
import cardgame from '../../assets/images/cardgame.gif'
import fallinggame from '../../assets/images/fallinggame.gif'
import { Link } from "react-router-dom";

function Game() {
  return(
    <div>
      <h1>game page</h1>
      <Link to="/cardGame" >
        <img src={cardgame} alt="카드게임" />
      </Link>
      <Link to="/cardGame" >
        <img src={fallinggame} alt="카드게임" />
      </Link>
    </div>
  )
}

export default Game;
