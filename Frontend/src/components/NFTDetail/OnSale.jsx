import React, { useState, useEffect } from "react";
import BidList from "./BidList.jsx"

import { useDispatch, useSelector } from "react-redux";
import shop from "../../api/shop";
import { setNftOnsaleOne } from "../../store/modules/shop";

import "./OnSale.css"

//가격
function Price() {
  const [price, setPrice] = useState(0)
  const bidPriceChange = (e) => {
    setPrice(e.target.value)
  }
  const bidClick = () => {
    console.log(price)
  }

  const nftOnsaleOne = useSelector((state) => state.nftOnsaleOne);

    return(
      <div className="price-info">
        <div className="current">
          <span>현재가</span>
          <span>{nftOnsaleOne.first_price}SSF</span>
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


function OnSale() {
  const nftOnsaleOne = useSelector((state) => state.nftOnsaleOne);
  //분양 내역 조회
  const dispatch = useDispatch();

  useEffect(() => {
      const params = 11;
      shop
      .nftOnsaleOne(params)
      .then((result) => {
          dispatch(setNftOnsaleOne(result.data))
      })
      .catch((error) => {
          console.log("오류")
          console.log(error)
      })
  }, [])

    return(
        <div>
            <div className="sale-info">
                <h3>분양 정보</h3>
                <div className="auction-date">
                    <span>진행기간 : </span>
                    <span>{nftOnsaleOne.start} ~ {nftOnsaleOne.end}</span>
                </div>
            </div>
            <hr/>
            <Price/>
            <hr/>
            <BidList title="입찰 내역" date="입찰 시간" price="입찰 가격(SSF)" bidLog={nftOnsaleOne.bidLogs}/>
        </div>
    )
}

export default OnSale;