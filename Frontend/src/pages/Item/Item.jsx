import React, { useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Item.css";
import Canvas from "../../components/Canvas/Canvas";
import { useState } from "react";
import otter from "../../assets/images/otter.png";
import MyItem from "../../components/MyItem/MyItem";
import Eyes from "../../components/MyItem/Eyes";
import Mouth from "../../components/MyItem/Mouth";
import Hands from "../../components/MyItem/Hands";
import Cloth from "../../components/MyItem/Cloth";
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
  useEffect(()=> {
    setSelected([false,false,false,false,true])
  },[])
  const pickedItem = data[itemNum];
  const onClickHandler = () => {
    setItemNum([Math.floor(Math.random() * data.length)]);
    console.log(itemNum);
  };

  const [url, setUrl] = useState();
  const [eyeUrl, setEyeUrl] = useState();
  const [mouthUrl, setMouthUrl] = useState();
  const [handUrl, setHandUrl] = useState();
  const [clothUrl, setClothUrl] = useState();
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
          <div className="otterNft">
            <img className="char base" src={require("../../assets/images/otter.png")}/>
            <img className="char head" src={url}/>
            <img className="char eye" src={eyeUrl}/>
            <img className="char mouth" src={mouthUrl}/>
            <img className="char hand" src={handUrl}/>
            <img className="char cloth" src={clothUrl}/>
          </div>
          <div className="select">
          {parts.map((part, idx)=> <div className={"part " + (selected[idx]? "chosen" : null)} key={idx} onClick={() => onClick(idx)}>{part}</div> )}
          </div>
          {selected[0] ? 
          <MyItem itemsPerPage={4} setUrl={setUrl}/>:
          selected[1]?
          <Eyes  itemsPerPage={4} setUrl={setEyeUrl}/> :
          selected[2]?
          <Mouth  itemsPerPage={4} setUrl={setMouthUrl}/> :
          selected[3] ?
          <Hands itemsPerPage={4} setUrl={setHandUrl}/>:
          <Cloth itemsPerPage={8} setUrl={setClothUrl}/>
}
          
          {/* <div className="inventory">
          {selected[0]? 
          <Head itemsPerPage={8} settingUrl={setUrl} /> :
          selected[1] ?
          <Eyes itemsPerPage={8} settingUrl={setUrl} /> :
          selected[2] ?
          <Mouth itemsPerPage={8} settingUrl={setUrl} /> :
          selected[3] ?
          <Hands itemsPerPage={8} settingUrl={setUrl} /> :
          <Cloth itemsPerPage={8} settingUrl={setUrl} /> }
          </div> */}
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
