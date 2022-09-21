import React, { useCallback, useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import {
  SPEED_STEP,
  SPAWN_INTERVAL,
} from "../../components/FallingGame/constants";
import {
  controlOptions,
  dotsState,
  scoreState,
} from "../../components/FallingGame/atom";
import {
  createDot,
  removeDot,
  calculatePoints,
} from "../../components/FallingGame/utils";
import Control from "../../components/FallingGame/Control";
import Item from "../../components/FallingGame/Item";
import Score from "../../components/FallingGame/Score";
import "./FallingGame.css";
import otter from "../../assets/images/otter-basket.png";

const FallingGame = () => {
  const [dots, updateDots] = useRecoilState(dotsState);
  const [controlState, setControlState] = useRecoilState(controlOptions);
  const [score, setScore] = useRecoilState(scoreState);
  const intervalRef = useRef();
  const fieldRef = useRef();
  const requestRef = useRef();

  const OtterStyle = {
    position: "absolute",
    bottom: 0,
    height: "200px",
  };

  const advanceStep = useCallback(() => {
    updateDots((oldDots) => {
      const newDots = [];
      for (let dot of oldDots) {
        const newY = dot.y + (SPEED_STEP * controlState.speed) / 60;
        if (newY <= fieldRef.current.offsetHeight - dot.height / 2) {
          newDots.push({
            ...dot,
            y: newY,
          });
        }
      }
      return newDots;
    });
    requestRef.current = requestAnimationFrame(advanceStep);
  }, [controlState.speed, updateDots]);

  const spawnDot = useCallback(() => {
    updateDots((oldDots) => [...oldDots, createDot()]);
  }, [updateDots]);

  useEffect(() => {
    const stop = () => {
      intervalRef.current && clearInterval(intervalRef.current);
      requestRef.current && cancelAnimationFrame(requestRef.current);
    };
    if (controlState.isRunning) {
      intervalRef.current = setInterval(spawnDot, SPAWN_INTERVAL);
      requestRef.current = requestAnimationFrame(advanceStep);
    } else {
      stop();
    }
    return () => stop();
  }, [controlState.isRunning, advanceStep, spawnDot]);

  const clear = useCallback(() => {
    setControlState({ ...controlState, isRunning: false, speed: 5 });
    updateDots([]);
    setScore(0);
  }, [setControlState, setScore, updateDots, controlState]);

  const onDotClick = (index) => {
    setScore(score + calculatePoints(dots[index]));
    updateDots(removeDot(dots, index));
  };

  return (
    <div className="falling-game">
      <div className="title">먹이 냠냠</div>
      <div className="game-main">
        <div className="panel">
          <Control onClear={clear} />
          <Score />
        </div>
        <div className="field" ref={fieldRef}>
          {dots.map((dot, index) => {
            const x =
              ((fieldRef.current.offsetWidth - dot.height) * dot.x) / 100;
            return (
              <Item
                key={`dot-${index}`}
                {...dot}
                x={x}
                index={index}
                onClick={onDotClick}
              />
            );
          })}
          <img style={OtterStyle} src={otter} alt="basket otter" />
        </div>
      </div>
    </div>
  );
};

export default FallingGame;
