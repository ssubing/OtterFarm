import React from "react";
import Menu from "../../components/Menu/Menu";
import { useGameOver } from "../../hooks/useGameOver";
import Tetris from "../../components/Tetris/Tetris";
const TetrisGame = ({ rows, columns }) => {
  const [gameOver, setGameOver, resetGameOver] = useGameOver();
  const start = () => {
    resetGameOver();
  };
  return (
    <div className="TetrisGame">
      {gameOver ? (
        <Menu onClick={start} />
      ) : (
        <Tetris rows={rows} columns={columns} setGameOver={setGameOver} />
      )}
    </div>
  );
};

export default TetrisGame;
