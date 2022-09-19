import React, { useState } from "react";

import BidList from "./BidList.jsx"

const sellRequest = [
    {
        time: '2022-09-01 13:15',
        price: '520'
    },
    {
        time: '2022-09-01 13:24',
        price: '560'
    },
    {
        time: '2022-09-01 13:42',
        price: '600'
    }
]

function UnSoldOwner() {
    const [price, setPrice] = useState(0)
    const requestPriceChange = (e) => {
        setPrice(e.target.value)
    }
    const requestClick = () => {
        console.log(price)
    }
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
            <BidList title="요청 내역" date="요청 시간" price="제안가(SSF)" bidLog={sellRequest}/>
        </div>
    )
}

export default UnSoldOwner;