import React, { useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Item.css";

import { useState } from "react";

import MyItem from "../../components/MyItem/MyItem";
import Eyes from "../../components/MyItem/Eyes";
import Mouth from "../../components/MyItem/Mouth";
import Hands from "../../components/MyItem/Hands";
import Cloth from "../../components/MyItem/Cloth";

import RandomBox from "../../components/RandomBox/RandomBox";
import { flexbox } from "@mui/system";
function Item() {
  const [itemNum, setItemNum] = useState(-1);
  let data = [
    "예쁜 눈알",
    "좋은 눈알",
    "멋진 눈알",
    "멋진 선글라스",
    "꽝",
    "예쁜 선글라스",
    "망가진 선글라스",
    "초롱초롱한 눈알",
    "멍청한 눈알",
  ];

  const parts = ["머리", "눈", "입", "손", "옷"];
  const [selected, setSelected] = useState(Array(parts.length).fill(false));
  useEffect(() => {
    setSelected([false, false, false, false, true]);
  }, []);

  const [url, setUrl] = useState();
  const [eyeUrl, setEyeUrl] = useState();
  const [mouthUrl, setMouthUrl] = useState();
  const [handUrl, setHandUrl] = useState();
  const [clothUrl, setClothUrl] = useState();

  const [showBox, setShowBox] = useState(false);
  const [part, setPart] = useState("");
  const onClick = (idx) => {
    const newArr = Array(parts.length).fill(false);
    newArr[idx] = true;
    setSelected(newArr);
  };
  const [showImg, setShowImg] = useState(false);

  return (
    <div className="pageBox">
      <Navbar />
      <div className="itemPage">
        <div className="myNft">
          <div className="otterNft">
            <img
              className="char base"
              src={require("../../assets/images/otter.png")}
              alt="base"
            />
            <img className="char head" src={url} alt="head" />
            <img className="char eye" src={eyeUrl} alt="eye" />
            <img className="char mouth" src={mouthUrl} alt="mouth" />
            <img className="char hand" src={handUrl} alt="hand" />
            <img className="char cloth" src={clothUrl} alt="cloth" />
          </div>
          <div className="select">
            {parts.map((part, idx) => (
              <div
                className={"part " + (selected[idx] ? "chosen" : null)}
                key={idx}
                onClick={() => onClick(idx)}
              >
                {part}
              </div>
            ))}
          </div>
          {selected[0] ? (
            <MyItem itemsPerPage={4} setUrl={setUrl} />
          ) : selected[1] ? (
            <Eyes itemsPerPage={8} setUrl={setEyeUrl} />
          ) : selected[2] ? (
            <Mouth itemsPerPage={8} setUrl={setMouthUrl} />
          ) : selected[3] ? (
            <Hands itemsPerPage={8} setUrl={setHandUrl} />
          ) : (
            <Cloth itemsPerPage={8} setUrl={setClothUrl} />
          )}
        </div>

        <div className="itemShop">
          <div className="shopName">아이템 상점</div>
          <div className="shoppart">
            <RandomBox
              showBox={showBox}
              setShowBox={setShowBox}
              part={part}
              showImg={showImg}
              setShowImg={setShowImg}
            />
            <div
              className="giftDiv"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <span>머리</span>
              <img
                className="giftbox"
                alt="giftbox"
                src={require("../../assets/images/present.png")}
                style={{ width: "30%" }}
              />
              <button
                onClick={() => {
                  setShowBox(true);
                  setPart("01");
                  setTimeout(() => {
                    setShowImg(true);
                  }, 4000);
                }}
              >
                뽑기
              </button>
            </div>
            <div
              className="giftDiv"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <span>눈</span>
              <img
                className="giftbox"
                alt="giftbox"
                src={require("../../assets/images/present.png")}
                style={{ width: "30%" }}
              />
              <button
                onClick={() => {
                  setShowBox(true);
                  setPart("02");
                  setTimeout(() => {
                    setShowImg(true);
                  }, 4000);
                }}
              >
                뽑기
              </button>
            </div>
            <div
              className="giftDiv"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <span>입</span>
              <img
                className="giftbox"
                alt="giftbox"
                src={require("../../assets/images/present.png")}
                style={{ width: "30%" }}
              />
              <button
                onClick={() => {
                  setShowBox(true);
                  setPart("03");
                  setTimeout(() => {
                    setShowImg(true);
                  }, 4000);
                }}
              >
                뽑기
              </button>
            </div>
            <div
              className="giftDiv"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <span>손</span>
              <img
                className="giftbox"
                alt="giftbox"
                src={require("../../assets/images/present.png")}
                style={{ width: "30%" }}
              />
              <button
                onClick={() => {
                  setShowBox(true);
                  setPart("04");
                  setTimeout(() => {
                    setShowImg(true);
                  }, 4000);
                }}
              >
                뽑기
              </button>
            </div>
            <div
              className="giftDiv"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <span>옷</span>
              <img
                className="giftbox"
                alt="giftbox"
                src={require("../../assets/images/present.png")}
                style={{ width: "30%" }}
              />
              <button
                onClick={() => {
                  setShowBox(true);
                  setPart("05");
                  setTimeout(() => {
                    setShowImg(true);
                  }, 4000);
                }}
              >
                뽑기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Item;
