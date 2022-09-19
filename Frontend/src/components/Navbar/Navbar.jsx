import { useContext } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/images/logo.png";
import { TransactionContext } from "../../context/TransactionContext";
import Notice from "../Notice/Notice";
const Navbar = () => {
  const { connectWallet, currentAccount } = useContext(TransactionContext);
  return (
    <nav className="navbar">
      <div className="main">
        <div className="logoDiv">
          <Link to="/main">
            <img src={logo} alt="logo" className="logo" />
          </Link>
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
      {!currentAccount ? (
        <div onClick={connectWallet} className="login">
          계정연결
        </div>
      ) : (
        <div className="account">
          <Link
            to="/myPage"
            className="myPage"
            style={{ textDecoration: "none", color: "black" }}
          >
            수달하우스
          </Link>
          <Link to="/noti" className="noti">
            <Notice />
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
