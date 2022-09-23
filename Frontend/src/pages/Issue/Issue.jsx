import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Issue.css";
function Issue() {
  let imgUrl = JSON.parse(window.localStorage.getItem("nft")).split(",")[1];
  const [disabled, setDisabled] = useState(false);
  const disableHandler = () => {
    if (disabled) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };
  const [saleDisabled, setSaleDisabled] = useState(true);
  const [selected, setSelected] = useState(true);
  const [notSaleDisabled, setNotSaleDisabled] = useState(false);
  return (
    <div>
      <Navbar />
      <div className="nftTitle">당신의 수달이 태어났어요</div>
      <div className="settingNft">
        <div className="nftInfo">
          <img
            id="comp"
            width="300px"
            height="400px"
            alt="nftimg"
            // src={`data:image/png;base64,${imgUrl}`}
            src={`data:image/png;base64,${imgUrl}`}
          />
          <span>컨트랙트주소</span>
        </div>
        <div className="setting">
          <form className="forsale">
            <div className="saleornot">
              <input
                id="ForSale"
                type="checkbox"
                style={{ scale: "2" }}
                value="true"
                checked={selected}
                onClick={() => {
                  setSelected(!selected);
                  setSaleDisabled(!saleDisabled);
                  disableHandler();
                  setNotSaleDisabled(!notSaleDisabled);
                }}
                disabled={saleDisabled}
              />

              <label className="isSale" htmlFor="ForSale">
                분양
              </label>

              <input
                id="notSale"
                type="checkbox"
                style={{ scale: "2", marginLeft: "7%" }}
                value="false"
                onClick={() => {
                  disableHandler();
                  setSelected(!selected);
                  setSaleDisabled(!saleDisabled);
                  setNotSaleDisabled(!notSaleDisabled);
                }}
                disabled={notSaleDisabled}
                checked={!selected}
              />
              <label className="isSale" htmlFor="notSale">
                미분양
              </label>
            </div>
            <div>
              <input
                id="nftName"
                className="border"
                type="text"
                placeholder="이름"
                style={{ width: "50%", marginTop: "5%", height: "4vh" }}
                disabled={disabled}
              />
            </div>
            <input
              id="nftPrice"
              className="border"
              type="number"
              placeholder="분양가(SSF)"
              style={{ width: "50%", marginTop: "5%", height: "4vh" }}
              disabled={disabled}
            />
            <div style={{ display: "flex", alignItems: "center" }}>
              <label
                htmlFor="nftDate"
                style={{ marginRight: "7%", fontSize: "1vw" }}
              >
                경매마감일
              </label>
              <input
                id="nftDate"
                className="border"
                type="date"
                style={{
                  width: "30%",
                  marginTop: "5%",
                  height: "4vh",
                  marginBottom: "5%",
                  borderRadius: "5%",
                }}
                disabled={disabled}
              />
            </div>
            <button
              className="saveBtn"
              onClick={() => {
                window.localStorage.removeItem("nft");
              }}
            >
              완료
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Issue;
