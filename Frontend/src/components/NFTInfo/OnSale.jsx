import React from "react";

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
  
function Price() {
    return(
      <div className="price-info">
        <div className="current">
          <span>현재가</span>
          <span>{auctionInfo.currentPrice}SSF</span>
        </div>
        <div className="bid">
          <span>입찰가</span>
          <button>입찰</button>
        </div>
      </div>
    )
}
  
function BidList() {
    const bidLog = auctionInfo.bidLog.map((bid) => 
        <li key={bid}>{bid.time} {bid.price}</li>
    )
    console.log(bidLog)
    return(
        <div className="bid-log">
            <h3>입찰 내역</h3>
            <div className="bid-title">
                <span>입찰 시간</span>
                <span>입찰 가격(SSF)</span>
            </div>
            <hr/>
            <ul>{bidLog}</ul>
        </div>
    )
}

function OnSale({start, end}) {
    return(
        <div>
            <div className="sale-info">
                <h3>분양 정보</h3>
                <div>
                    <span>진행기간</span>
                    <span>{start} ~ {end}</span>
                </div>
            </div>
            <Price/>
            <BidList/>
        </div>
    )
}

export default OnSale;