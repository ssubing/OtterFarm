import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Item.css";
import Canvas from "../../components/Canvas/Canvas";
import { useState } from "react";
import otter from "../../assets/images/otter.png";
import MyItem from "../../components/MyItem/Head";
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

  const parts = ['머리', '눈', '입', '손', '옷'];
  const [selected,setSelected] = useState(Array(parts.length).fill(false));
  const pickedItem = data[itemNum];
  const onClickHandler = () => {
    setItemNum([Math.floor(Math.random() * data.length)]);
    console.log(itemNum);
  };

  const [url, setUrl] = useState();
  const [clicked, setClicked] = useState(false);
  const onClick = (idx) => {
        const newArr = Array(parts.length).fill(false);
        newArr[idx] = true;
        setSelected(newArr);
  }
  
  return (
    <div className="pageBox">
      <Navbar />
      <div className="itemPage">
        <div className="myNft">
          {/* <img src={otter} alt="basic otter" className="otter"/> */}
          <Canvas url={otter} width={300} height={400} url2={url} />
          <div className="select">
          {parts.map((part, idx)=> <div className={"part " + (selected[idx]? "chosen" : null)} key={idx} onClick={() => onClick(idx)}>{part}</div> )}
          </div>
          <MyItem itemsPerPage={8} settingUrl={setUrl} />
        </div>
        <div className="itemShop">
          아이템들
          <button onClick={onClickHandler}>뽑기</button>
        </div>
      </div>
    </div>
  );
}

export default Item;
