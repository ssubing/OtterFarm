import { useState } from "react";
import { Link } from "react-router-dom";
import "./MainNavbar.css";
import logo from "../../assets/images/logo.png";
const MainNavbar = () => {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <nav className="mainNavbar">
      <div className="main">
        <div className="logoDiv">
          <img src={logo} alt="logo" className="logoImg" />
            
        </div>
        <span style={{fontSize:"30px"}}>수달농장</span>
      </div>
      {isLogin ? (
        <div onClick={() => setIsLogin(false)}>로그아웃</div>
      ) : (
        <div onClick={() => setIsLogin(true)}>로그인</div>
      )}
    </nav>
  );
};

export default MainNavbar;
