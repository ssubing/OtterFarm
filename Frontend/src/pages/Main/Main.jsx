import React from "react";
import "./Main.css";
import sign from "../../assets/images/sign.png";
function Main() {
  return (
    <div className="mainPage">
      <div className="shopContainer">
        <div className="shopBox">
          <img src={sign} alt="shopSign" className="shopSign" />
          <span
            className="shopBtn"
            onClick={() => {
              window.location.href = "/shop";
            }}
          >
            수달샵
          </span>
        </div>
      </div>
      <div className="gameContainer">
        <div className="gaemBox">
          <img src={sign} alt="gameSign" className="gameSign" />
          <span
            className="gameBtn"
            onClick={() => {
              window.location.href = "/game";
            }}
          >
            게임하기
          </span>
        </div>
      </div>
      <div className="itemContainer">
        <div className="itemBox">
          <img src={sign} alt="itemSign" className="itemSign" />
          <span
            className="itemBtn"
            onClick={() => {
              window.location.href = "/item";
            }}
          >
            수달
            <br />
            꾸미기
          </span>
        </div>
      </div>
      <div className="guideContainer">
        <div className="guideBox">
          <img src={sign} alt="guideSign" className="guideSign" />
          <span
            className="guideBtn"
            onClick={() => {
              window.location.href = "/guide";
            }}
          >
            이용안내
          </span>
        </div>
      </div>
    </div>
  );
}

export default Main;
