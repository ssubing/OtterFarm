import React from "react";
import "./ResetGame.css";

import { useNavigate } from "react-router-dom";
function ResetGame({ onClick, gameStats }) {
  const navigate = useNavigate();
  const { level, points, linesCompleted, linesPerLevel } = gameStats;
  return (
    <div className="gameOver">
      <span style={{ fontSize: "5em" }}>GameOver</span>
      <span style={{ fontSize: "4em" }}>score {points}</span>
      <div className="btnDiv">
        <button className="mainBtn" onClick={() => navigate("/main")}>
          메인으로
        </button>
        <button className="retryBtn" onClick={onClick}>
          다시하기
        </button>
      </div>
    </div>
  );
}

export default ResetGame;
