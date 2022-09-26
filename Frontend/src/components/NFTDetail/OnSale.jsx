import React, { useState } from "react";
import BidList from "./BidList.jsx"

import "./OnSale.css"

//현재 가격과 입찰기록
const auctionInfo = {
    currentPrice: '1050',
    bidLog: [
      {
        time: '2022-09-01 13:15',
        price: '1030'
      },
      {
        time: '2022-09-01 13:24',
        price: '1042'
      },
      {
        time: '2022-09-01 13:42',
        price: '1050'
      }
    ]
}
//가격
function Price() {
  const [price, setPrice] = useState(0)
  const bidPriceChange = (e) => {
    setPrice(e.target.value)
  }
  const bidClick = () => {
    console.log(price)
  }
    return(
      <div className="price-info">
        <div className="current">
          <span>현재가</span>
          <span>{auctionInfo.currentPrice}SSF</span>
        </div>
        <div className="bid">
          <span>입찰가</span>
          <div>
            <input onChange={bidPriceChange}className="bid-input"/>
            <button className="bid-btn" onClick={bidClick}>입찰</button>
          </div>
        </div>
      </div>
    )
}
  


function OnSale({start, end}) {
    return(
        <div>
            <div className="sale-info">
                <h3>분양 정보</h3>
                <div className="auction-date">
                    <span>진행기간 : </span>
                    <span>{start} ~ {end}</span>
                </div>
            </div>
            <hr/>
            <Price/>
            <hr/>
            <BidList title="입찰 내역" date="입찰 시간" price="입찰 가격(SSF)" bidLog={auctionInfo.bidLog}/>
        </div>
    )
}

export default OnSale;