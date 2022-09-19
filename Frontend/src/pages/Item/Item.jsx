import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Item.css"
import Canvas from "../../components/Canvas/Canvas";
import { useState } from "react";

import otter from "../../assets/images/otter.png"
function Item() {
  const [itemNum, setItemNum] = useState(-1);
  const data = ["예쁜 눈알", "좋은 눈알", "멋진 눈알", "멋진 선글라스", "꽝", "예쁜 선글라스", "망가진 선글라스", "초롱초롱한 눈알", "멍청한 눈알"];
  const pickedItem = data[itemNum];
  const onClickHandler = () => {
    setItemNum([Math.floor(Math.random() * data.length)])
    console.log(itemNum)
  };
  return (
  <div className="pageBox">
    <Navbar/>
    <div className="itemPage">
    <div className="myNft">
        <img src={otter} alt="basic otter" className="otter"/>
        <Canvas/>
      <div className="myItems">내가 가진 아이템</div>
    </div>
    <div className="itemShop">아이템들
    <button onClick={onClickHandler}>뽑기</button></div>

   
  </div>
  </div>
  );
}

export default Item;
