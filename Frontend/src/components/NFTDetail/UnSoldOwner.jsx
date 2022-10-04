import React, { useState } from "react";
import { useSelector } from "react-redux";
import Web3 from "web3";
import {
    ERC20ABI,
    ERC20Address,
    SudalAuctionABI,
    SudalAuctionAddress,
    SudalFarmABI,
    SudalFarmAddress,
} from "../../util/web3abi"

import DateTimePicker from 'react-datetime-picker';

import "./UnSoldOwner.css"
import BidList from "./BidList.jsx"

function UnSoldOwner() {
    //nft 상세 정보
    const nftUnsoldOne = useSelector((state) => state.nftUnsoldOne);

    //가격
    const [price, setPrice] = useState(0)
    const sellPriceChange = (e) => {
        setPrice(e.target.value)
    }

    //분양하기 클릭할 경우
    const auctionClick = () => {
        if(price >= 0) {
            console.log("분양한다")
            console.log("마감일 : " + auctionTime)
            console.log("가격 : " + price)
            auctionTest()
        } else {
            alert('가격을 제대로 입력해주세요.')
        }
    }

    //초기 날짜 = 지금 현재 시간
    const currentDate = new Date()
    const [auctionTime, setAuctionTime] = useState(currentDate)

    //날짜를 선택했을 경우
    function handleDateChange(value) {
        setAuctionTime(value)
    }

    const tokenId = localStorage.getItem('tokenId')
    // const [account, setAccount] = useState()

    const auctionTest = async () => {
        let web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.requestAccounts();
        console.log(accounts[0])
        const SudalFarmContract = new web3.eth.Contract(
            SudalFarmABI,
            SudalFarmAddress
        );
        // nft 권한 허용
        const approval = await SudalFarmContract.methods
            .approve(SudalAuctionAddress, tokenId)
            .send({ from: accounts[0] });
        if (approval.status) {
          // 경매 시작
            const SudalAuctionContract = new web3.eth.Contract(
                SudalAuctionABI,
                SudalAuctionAddress
            );
            await SudalAuctionContract.methods
            .createAuction(tokenId, auctionTime, price)
            .send({ from: accounts[0] });
        }
    };

    return(
        <div>
            <BidList style={{margin: "30px 0"}} title="요청 내역" date="요청 시간" price="제안가(SSF)" bidLog={nftUnsoldOne}/>
            <hr/>
            <div className="sell-request">
                <h3>분양하기</h3>
                <div className="bid">
                    <span>분양가</span>
                    <div>
                        <input type="number" min={0} onChange={sellPriceChange} className="bid-input" 
                        style={{margin: "0", textAlign: "right", fontFamily: 'neo', fontSize: '20px', width: '205px'}}/>
                        <span> SSF</span>
                    </div>
                </div>
                <div className="sell-end-date">
                    <span>분양 마감일</span>
                    <DateTimePicker format='yyyy-MM-dd HH:mm' minDate={currentDate} onChange={handleDateChange} value={auctionTime} />
                </div>
                <div className="request-btn-wrap">
                    <button className="request-btn" onClick={auctionClick}>분양하기</button>
                </div>
            </div>
        </div>
    )
}

export default UnSoldOwner;