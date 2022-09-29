import React from "react";
import Menu from "../../components/Menu/Menu";
import { useGameOver } from "../../hooks/useGameOver";
const TetrisGame = ({ rows, columns }) => {
  const [gameOver, setGameOver, resetGameOver] = useGameOver();
  const start = () => {
    console.log("start");
  };
  return (
    <div className="TetrisGame">
      <Menu onClick={start} />
    </div>
  );
};

export default TetrisGame;
