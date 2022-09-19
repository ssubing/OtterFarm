import React, { useState } from "react";

import DateTimePicker from 'react-datetime-picker';

import "./UnSoldOwner.css"
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
    const sellPriceChange = (e) => {
        setPrice(e.target.value)
    }
    const requestClick = () => {
        console.log(price)
    }
    const [date, setDate] = useState(new Date())
    
    return(
        <div>
            <BidList style={{margin: "30px 0"}}title="요청 내역" date="요청 시간" price="제안가(SSF)" bidLog={sellRequest}/>
            <hr/>
            <div className="sell-request">
                <h3>분양하기</h3>
                <div className="bid">
                    <span>분양가</span>
                    <div>
                        <input onChange={sellPriceChange} className="bid-input" style={{margin: "0"}}/>
                    </div>
                </div>
                <div className="sell-end-date">
                    <span>분양 마감일</span>
                    <DateTimePicker onChange={setDate} value={date} />
                </div>
                <div className="request-btn-wrap">
                    <button className="request-btn" onClick={requestClick}>분양하기</button>
                </div>
            </div>
        </div>
    )
}

export default UnSoldOwner;