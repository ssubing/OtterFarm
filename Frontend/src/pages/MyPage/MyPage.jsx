import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import "./MyPage.css";
import otter from "../../assets/images/otter.png";
import logo from "../../assets/images/logo.png";
import { parseTransaction } from "ethers/lib/utils";
import ChangeButton from "../../components/ChangeButton/ChangeButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
function MyPage() {
  const apiUrl = "http://j7a606.p.ssafy.io:8080/";
  const token = window.localStorage.getItem("token");
  const [sudalPt, setSudalPt] = useState(0);
  const [userNick, setUserNick] = useState("");
  const userId = window.localStorage.getItem("userId");
  const params = useParams();
  const [otters, setOtters] = useState();
  useEffect(() => {
    axios
      .get(apiUrl + "api/user/mynft", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setOtters(res.data));
  }, []);
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
  }, []);
  //프로필 사진 바꿨는지 확인용
  const [changed, setChanged] = useState(false);
  //바꿀경우의 바뀌는 url
  const [url, setUrl] = useState();
  const handleUrl = (uri) => {
    setChanged(true);
    setUrl(uri);
  };
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
          {changed ? (
            <img className="profileImg" src={url} alt="" />
          ) : (
            <img className="profileImg" src={otter} alt="" />
          )}
        </div>

        {params.username === userId ? (
          <div className="profileInfo">
            <div
              style={{
                backgroundColor: "#F3E9DC",
                width: "20%",
                height: "15%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "20px",
              }}
            >
              닉네임
            </div>

            {!isClicked ? (
              <div style={{ display: "flex", alignItems: "center" }}>
                <h2>{userNick}</h2>
                <button
                  style={{
                    marginLeft: "10%",
                    height: "50%",
                    fontFamily: "neo",
                    backgroundColor: "#DAB49D",
                    borderRadius: "10px",
                    border: "none",
                    cursor: "pointer",
                  }}
                  type="button"
                  onClick={handleModi}
                >
                  수정하기
                </button>
              </div>
            ) : (
              <div>
                <input
                  id="nickName"
                  defaultValue={userNick}
                  onChange={onChange}
                  style={{ marginTop: "5%", marginBottom: "5%", height: "30%" }}
                />
                <button
                  style={{
                    marginLeft: "5%",
                    height: "50%",
                    width: "10%",
                    fontFamily: "neo",
                    backgroundColor: "#DAB49D",
                    borderRadius: "10px",
                    border: "none",
                    cursor: "pointer",
                  }}
                  onClick={handleModi}
                >
                  완료
                </button>
              </div>
            )}
            <div
              style={{
                backgroundColor: "#F3E9DC",
                width: "20%",
                height: "15%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "20px",
              }}
            >
              수달머니
            </div>
            <h1
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "5%",
              }}
            >
              <img
                src={logo}
                alt=""
                style={{ width: "7%", marginRight: "3%" }}
              />
              {sudalPt}
            </h1>
          </div>
        ) : (
          <div className="profileInfo2">
            <div
              style={{
                backgroundColor: "#F3E9DC",
                width: "20%",
                height: "15%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "20px",
              }}
            >
              닉네임
            </div>

            <div style={{ display: "flex", alignItems: "center" }}>
              <h2>{userNick}</h2>
            </div>
          </div>
        )}
      </div>
      <div className="myOtters">
        <h1 style={{ marginLeft: "10%", marginTop: "5%" }}>내 수달들</h1>
        <div className="myOtterNfts">
          {otters &&
            otters.map((otter, idx) => (
              <div className="myOtterNft" key={idx}>
                <img
                  src={otter.tokenURI}
                  alt=""
                  style={{
                    width: "16vw",
                    height: "28vh",
                    borderRadius: "20px",
                    border: "2px solid",
                    marginTop: "10%",
                  }}
                />
                <div className="sudalInfo">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    {otters.saled ? (
                      <div className="issaled">분양중</div>
                    ) : (
                      <div className="issaled">미분양</div>
                    )}
                    <div style={{ display: "flex", marginTop: "8%" }}>
                      <FavoriteIcon color="secondary" />
                      <span style={{ fontSize: "1.5em", marginLeft: "10%" }}>
                        {otter.likeCount}
                      </span>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: "10%",
                    }}
                  >
                    <div style={{ fontSize: "16px", fontWeight: "bold" }}>
                      {otter.name}
                    </div>
                    {params.username === userId ? (
                      //   <button
                      //     style={{
                      //       backgroundColor: "#DAB49D",
                      //       borderRadius: "10px",
                      //       fontFamily: "neo",
                      //       border: "none",
                      //       height: "50%",
                      //       marginTop: "10%",
                      //       marginBottom: "5%",
                      //       cursor: "pointer",
                      //     }}
                      //     // onClick={setUrl(otter.tokenURI)}
                      //   >
                      //     대표수달지정
                      //   </button>
                      <ChangeButton
                        handleUrl={handleUrl}
                        url={otter.tokenURI}
                        issaled={otter.saled}
                        eh
                      />
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default MyPage;
