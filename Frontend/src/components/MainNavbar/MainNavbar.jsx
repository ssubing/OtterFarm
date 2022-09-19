import { useContext } from "react";
import { Link } from "react-router-dom";
import "./MainNavbar.css";
import logo from "../../assets/images/logo.png";
import { TransactionContext } from "../../context/TransactionContext";
import Notice from "../Notice/Notice";
const MainNavbar = () => {
  const { connectWallet, currentAccount } = useContext(TransactionContext);
  return (
    <nav className="mainNavbar">
      <div className="main">
        <div className="logoDiv">
          <img src={logo} alt="logo" className="logoImg" />
        </div>
        <span style={{ fontSize: "30px" }}>수달농장</span>
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

export default MainNavbar;
