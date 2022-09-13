import { useState } from "react";
import "./Navbar.css";
const logo = "";
const Navbar = () => {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <nav className="navbar">
      <div className="logoDiv">
        <img src={logo} alt="logo" className="logo" />
      </div>
      <div className="menu">
        {["게임하기", "수달샵", "수달꾸미기", "이용 안내"].map(
          (item, index) => (
            <div className="menuItem" key={item + index}>
              {item}
            </div>
          )
        )}
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
