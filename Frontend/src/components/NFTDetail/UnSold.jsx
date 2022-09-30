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
                        <input onChange={requestPriceChange}className="bid-input"/>
                        <button className="bid-btn" onClick={requestClick}>요청</button>
                    </div>
                </div>
            </div>
            <hr/>
            {nftUnsoldOne > 0 ? (
                <BidList title="요청 내역" time="요청 시간" price="제안가(SSF)" bidLog={nftUnsoldOne}/>
            ) : (
                <div>
                    <h3>요청 받은 내역이 없습니다</h3>
                </div>
            )}
            
        </div>
    )
}

export default UnSoldOwner;