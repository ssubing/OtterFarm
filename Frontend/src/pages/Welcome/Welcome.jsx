import React from "react";
import "./Welcome.css";
import logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";
import useSound from "../../hooks/useSound";
import sound from '../../assets/audios/main.mp3'

const Welcome = () => {
  useSound(sound, 0.1, 2000);
  return (
    <div className="back">
      <h1>
        <div className="waviy">
          <span></span>
          <span>수</span>
          <span>달</span>
          <span>농</span>
          <span>장</span>
        </div>
      </h1>
      <div className="mainBtn">
        <Link to="/main" >
          <img src={logo} alt="logo" className="logo" />
          <span>놀러가기</span>
        </Link>
      </div>
    </div>
  )
}
export default Welcome;
