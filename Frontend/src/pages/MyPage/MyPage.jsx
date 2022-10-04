import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import "./MyPage.css";
import otter from "../../assets/images/otter.png";
function MyPage() {
  const apiUrl = "http://j7a606.p.ssafy.io:8080/";
  const token = window.localStorage.getItem("token");
  const [sudalPt, setSudalPt] = useState(0);
  const [userNick, setUserNick] = useState("");
  const userId = window.localStorage.getItem("userId");
  const params = useParams();

  useEffect(() => {
    axios
      .get(apiUrl + "api/user/point", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setSudalPt(res.data));
    axios
      .get(apiUrl + "api/user/nickname", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUserNick(res.data));
  }, [token]);
  const [changed, setChanged] = useState(false);
  const modiNick = () => {
    axios
      .post(
        apiUrl + "api/user/change/nickname",
        { nickname: userNick },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => console.log(res.data));
  };
  const onChange = (e) => {
    setUserNick(e.target.value);
  };
  //수정 버튼을 눌렀는지
  const [isClicked, setIsClicked] = useState(false);
  const handleModi = (e) => {
    e.preventDefault();
    if (!isClicked) {
      setIsClicked(true);
    } else {
      setIsClicked(false);
      modiNick();
    }
  };
  return (
    <div className="myPage">
      <Navbar />
      <div className="profile">
        <div>
          {!setChanged ? (
            <img className="profileImg" src={""} alt="" />
          ) : (
            <img className="profileImg" src={otter} alt="" />
          )}
        </div>

        {params.username === userId ? (
          <div className="profileInfo">
            <form>
              <label htmlFor="nickName">닉네임</label>
              {!isClicked ? (
                <div>
                  <h2>{userNick}</h2>
                  <button type="button" onClick={handleModi}>
                    수정하기
                  </button>
                </div>
              ) : (
                <div>
                  <input
                    id="nickName"
                    defaultValue={userNick}
                    onChange={onChange}
                  />
                  <button onClick={handleModi}>완료</button>
                </div>
              )}
            </form>
          </div>
        ) : (
          <div className="profileInfo">닉네임</div>
        )}
      </div>
      <div className="myOtters">
        <h1>수달들</h1>
      </div>
    </div>
  );
}

export default MyPage;
