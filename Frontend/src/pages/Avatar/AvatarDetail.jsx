import React from "react";
import Navbar from "../../components/Navbar/Navbar";

import OnSale from "../../components/NFTDetail/OnSale";
import NFTInfo from "../../components/NFTDetail/NFTInfo";
import UnSoldOwner from "../../components/NFTDetail/UnSoldOwner"

import "./AvatarDetail.css"



const avatarInfo = {
  owner: '이선민',
  address: '0x123515adfasdfbaf44ea907c797788d8dbf',
  start: '2022-09-01 12:00',
  end: '2022-09-04 12:00',
  likeCnt: '20',
  isSale: true
}

function AvatarDetail() {
  return (
    <div className="avatar-wrap">
      <Navbar/>
      <div className="detail-content">
        <NFTInfo {...avatarInfo}/>
        <div className="sale-wrap">
          {/* <OnSale {...avatarInfo}/> */}
          <UnSoldOwner/>
        </div>
      </div>
    </div>
  );
}

export default AvatarDetail;
