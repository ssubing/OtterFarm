import React from "react";
import { Link } from "react-router-dom";
import cardgame from '../../assets/images/cardgame.gif'
import fallingGame from "../../assets/images/falling-game.gif";
import Navbar from "../../components/Navbar/Navbar";

function Game() {
  const games = [
    {
      id: 1,
      gameTitle: "수달은 아직도 배고프다",
      gameImg: fallingGame,
      gameLink: "/fallingGame",
    },
    {
      id: 2,
      gameTitle: "같은 수달 찾기",
      gameImg: cardgame,
      gameLink: "/cardGame",
    },
  ]

  return (
    <>
      <Navbar />
      <h1>게임목록</h1>
      {games.map(game => (
        <GameItem game={game} />
      ))}
    </>
  );
}

function GameItem({ game }) {
  return (
    <div className="gameItem">
      <Link to="/{game.gameLink}">
        <img src={game.gameImg} alt="게임" />
        <p>{game.gameTitle}</p>
      </Link>
    </div>
  )
}

export default Game;
