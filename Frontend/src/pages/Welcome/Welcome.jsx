import React from "react";
import "./Welcome.css";
import logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";
const Welcome = () => {
  return (
    <div className="back">
      <div>
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
    </div>
  )
}
export default Welcome;
