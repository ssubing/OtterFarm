import React, { useEffect, useState } from "react";

import BidList from "./BidList.jsx"

import shop from "../../api/shop";

function UnSold(props) {
    const nftId = props.nftId
    //nft 판매 요청하는 값
    const [price, setPrice] = useState(0)
    const requestPriceChange = (e) => {
        setPrice(e.target.value)
    }
    const [reqInfo, setReqInfo] = useState(null);
    //요청하기 클릭했을 경우
    const requestClick = () => {
        const params = {
            nftId: nftId,
            price : price
        }
        shop
        .nftReqSale(params)
        .then((result) => {
            window.location.reload()
            console.log(result)
        })
        .catch((error) => {
            console.log(error);
        });
    }
    //요청 내역 조회
    useEffect(() => {
        const params = nftId;
        shop
        .nftUnsoldOne(params)
        .then((result) => {
            setReqInfo(result.data)
        })
        .catch((error) => {
            console.log(error)
        })
    }, [])
    if(reqInfo !== null) {
        return( 
            <div>
                <div className="sell-request">
                    <h3>분양 요청</h3>
                    <div className="bid">
                        <span>요청가</span>
                        <div>
                            <input type="number" onChange={requestPriceChange}className="bid-input"
                            style={{marginRight: "10px", textAlign: "right", fontFamily: 'neo', fontSize: '20px', width: '205px'}}/>
                            <button className="bid-btn" onClick={requestClick}>요청</button>
                        </div>
                    </div>
                </div>
                <hr/>
                <BidList title="요청 내역" time="요청 시간" price="제안가(SSF)" bidLog={reqInfo}/>
            </div>
        )
    }
}

export default UnSold;