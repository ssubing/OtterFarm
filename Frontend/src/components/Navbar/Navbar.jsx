import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/images/logo.png";
const Navbar = () => {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <nav className="navbar">
      <div className="main">
        <div className="logoDiv">
          <img src={logo} alt="logo" className="logo" />
        </div>
        <div className="menu">
          <Link to="/game" className="menuItem">
            게임하기
          </Link>

          <Link to="/shop" className="menuItem">
            수달샵
          </Link>

          <Link to="/item" className="menuItem">
            수달꾸미기
          </Link>

          <Link to="/guide" className="menuItem">
            이용 안내
          </Link>
        </div>
      </div>
      {isLogin ? (
        <div onClick={() => setIsLogin(false)}>로그아웃</div>
      ) : (
        <div onClick={() => setIsLogin(true)}>로그인</div>
      )}
    </nav>
  );
};

export default Navbar;
