import React, { useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Item.css";

import { useState } from "react";
import { Buffer } from "buffer";
import MyItem from "../../components/MyItem/MyItem";
import Eyes from "../../components/MyItem/Eyes";
import Mouth from "../../components/MyItem/Mouth";
import Hands from "../../components/MyItem/Hands";
import Cloth from "../../components/MyItem/Cloth";
import { useNavigate } from "react-router-dom";
import RandomBox from "../../components/RandomBox/RandomBox";
import { create } from "ipfs-http-client";
import html2canvas from "html2canvas";
import axios from "axios";
function Item() {
  const parts = ["머리", "눈", "입", "손", "옷"];
  const [selected, setSelected] = useState(Array(parts.length).fill(false));
  useEffect(() => {
    setSelected([false, false, false, false, true]);
  }, []);
  const navigate = useNavigate();
  const [url, setUrl] = useState(null);
  const [eyeUrl, setEyeUrl] = useState(null);
  const [mouthUrl, setMouthUrl] = useState(null);
  const [handUrl, setHandUrl] = useState(null);
  const [clothUrl, setClothUrl] = useState(null);
  const apiUrl = "http://j7a606.p.ssafy.io:8080/";
  const [showBox, setShowBox] = useState(false);
  const [part, setPart] = useState("");
  const onClick = (idx) => {
    const newArr = Array(parts.length).fill(false);
    newArr[idx] = true;
    setSelected(newArr);
  };
  const [number, setNumber] = useState();
  const [rgb, setRgb] = useState();
  const [rare, setRare] = useState();
  const handleInfo = (num, rgb, rare) => {
    setNumber(num);
    setRgb(rgb);
    setRare(rare);
  }
  const [showImg, setShowImg] = useState(false);
  const projectId = "2FHqbLTE55XfCP0BjQ8er0prKtE";
  const projectSecret = "0291ff7b1c1bd3704962f9cd27e9fba8";
  const auth =
    "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");
  const client = create({
    host: "ipfs.infura.io",
    port: 5001,
    protocol: "https",
    apiPath: "/api/v0",
    headers: {
      authorization: auth,
    },
  });
  const [name, setName] = useState("");
  const dataURLtoFile = (dataurl, fileName) => {
    let arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], fileName, { type: mime });
  };
  const getIndex = (imgurl) => {
    //이미지 경로를 넣으면 split해서 몇번째 아이템인지 아이디를 가져오는 함수
    if (imgurl !== null) {
      return parseInt(imgurl.split("/")[3].split("_")[1], 10);
    } else {
      return 0;
    }
  };
  const [itemId, setItemId] = useState("");
  const [eyeId, setEyeId] = useState("");
  const [mouthId, setMouthId] = useState("");
  const [handId, setHandId] = useState("");
  const [clothId, setClothId] = useState("");
  const token = window.localStorage.getItem("token");
  const nftHandler = async (e) => {
    e.preventDefault();
    let file = "";
    if (name.length !== 0) {
      await html2canvas(document.getElementById("otterImg")).then((canvas) => {
        let data = canvas.toDataURL();
        console.log("data" + data);

        file = dataURLtoFile(data, "otterNft");
        // window.localStorage.setItem("nft", JSON.stringify(data));
      });

      const created = await client.add(file);
      const tokenURI = `https://www.infura-ipfs.io/ipfs/${created.path}`;
      console.log(tokenURI);
      console.log(token);
      const eyes = eyeId;
      const fashion = clothId;
      const hands = handId;
      const head = itemId;
      const mouth = mouthId;
      const params = {
        eyes: eyes,
        fashion: fashion,
        hands: hands,
        head: head,
        mouth: mouth,
        name: name,
        tokenURI: tokenURI,
      };
      axios
        .put(
          apiUrl + "api/shop/nft",

          params,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
          { withCredentials: true }
        )
        .then((res) => console.log(res));

      // navigate("/main");
      // alert("발급 완료! 메인페이지로 넘어갑니다!");
    } else {
      alert("수달 이름을 정해주세요");
    }
  };
  const handleInput = (e) => {
    setName(e.target.value);
  };
  const onSubmit = () => {};
  return (
    <div className="pageBox">
      <Navbar />
      <div className="itemPage">
        <div className="myNft">
          <div className="otterNft">
            <div id="otterImg">
              <img
                className="char base"
                src={require("../../assets/images/otter.png")}
                alt="base"
              />
              <img className="char head" src={url} alt="" title="head" />
              <img className="char eye" src={eyeUrl} alt="" title="eye" />
              <img className="char mouth" src={mouthUrl} alt="" title="mouth" />
              <img className="char hand" src={handUrl} alt="" title="hand" />
              <img className="char cloth" src={clothUrl} alt="" title="cloth" />
            </div>

            <form
              style={{
                height: "10%",
                marginTop: "90%",
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
              onSubmit={onSubmit}
            >
              <input
                id="otterName"
                placeholder="수달이름"
                style={{ marginRight: "10%", width: "90%" }}
                onChange={handleInput}
              />
              <button
                type="submit"
                style={{
                  zIndex: "5",
                  // marginLeft: "80%",
                  // // height: "10%",
                  width: "30%",
                  // marginTop: "90%",
                  backgroundColor: "#f3e9dc",
                  fontFamily: "neo",
                  cursor: "pointer",
                }}
                onClick={nftHandler}
              >
                발급하기
              </button>
            </form>
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
            <MyItem itemsPerPage={8} setUrl={setUrl} setItemId={setItemId} />
          ) : selected[1] ? (
            <Eyes itemsPerPage={8} setUrl={setEyeUrl} setEyeId ={setEyeId}/>
          ) : selected[2] ? (
            <Mouth itemsPerPage={8} setUrl={setMouthUrl} setMouthId = {setMouthId}/>
          ) : selected[3] ? (
            <Hands itemsPerPage={8} setUrl={setHandUrl} setHandId = {setHandId}/>
          ) : (
            <Cloth itemsPerPage={8} setUrl={setClothUrl} setClothId = {setClothId}/>
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
              num={number}
              rgb={rgb}
              rare={rare}
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
                  console.log(typeof 1);
               
                    axios
                      .get(apiUrl + `api/item/${1}`, {
                        headers: { Authorization: `Bearer ${token}` },
                      })
                      .then((res) => handleInfo(res.data.number, res.data.rgb, res.data.rare))
                  
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
                  axios
                      .get(apiUrl + `api/item/${2}`, {
                        headers: { Authorization: `Bearer ${token}` },
                      })
                      .then((res) => handleInfo(res.data.number, res.data.rgb, res.data.rare))
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
                  axios
                      .get(apiUrl + `api/item/${3}`, {
                        headers: { Authorization: `Bearer ${token}` },
                      })
                      .then((res) => handleInfo(res.data.number, res.data.rgb, res.data.rare))
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
                  axios
                      .get(apiUrl + `api/item/${4}`, {
                        headers: { Authorization: `Bearer ${token}` },
                      })
                      .then((res) => handleInfo(res.data.number, res.data.rgb, res.data.rare))
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
                  axios
                      .get(apiUrl + `api/item/${5}`, {
                        headers: { Authorization: `Bearer ${token}` },
                      })
                      .then((res) => handleInfo(res.data.number, res.data.rgb, res.data.rare))
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
