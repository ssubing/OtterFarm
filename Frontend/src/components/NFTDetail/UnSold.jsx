import React, { useEffect, useState } from "react";

import BidList from "./BidList.jsx"
import { useDispatch, useSelector } from "react-redux";

import shop from "../../api/shop";
import { setNftUnsoldOne } from "../../store/modules/shop";

function UnSoldOwner() {
    const [price, setPrice] = useState(0)
    const requestPriceChange = (e) => {
        setPrice(e.target.value)
    }
    const requestClick = () => {
        console.log(price)
        console.log(nftUnsoldOne.id)
    }

    //요청 내역 조회
    const dispatch = useDispatch();
    useEffect(() => {
        const params = 11;
        shop
        .nftUnsoldOne(params)
        .then((result) => {
            dispatch(setNftUnsoldOne(result.data))
        })
        .catch((error) => {
            console.log("오류")
            console.log(error)
        })
    }, [])

    const nftUnsoldOne = useSelector((state) => state.nftUnsoldOne);

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
            <BidList title="요청 내역" time="요청 시간" price="제안가(SSF)" bidLog={nftUnsoldOne}/>
        </div>
    )
}

export default UnSoldOwner;