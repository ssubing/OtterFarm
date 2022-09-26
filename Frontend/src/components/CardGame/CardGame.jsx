import React, { useState, useRef } from "react";

import hood from '../../assets/images/sudalhood.png'
import king from '../../assets/images/sudalking.png'
import man from '../../assets/images/sudalman.png'
import otter from '../../assets/images/otter.png'
import yellow from '../../assets/images/yellow.png'
import red from '../../assets/images/red.png'
import green from '../../assets/images/green.png'
import ssafy from '../../assets/images/ssafy.png'

import "./CardGame.css"

function CardGame() {
    //점수
    const [score, setScore] = useState(0)
    //맞힌 카드 개수
    const [cardNum, setCardNum] = useState(0)
    //카드 목록
    const cardList = [
        hood, hood,
        king, king,
        man, man,
        otter, otter,
        yellow, yellow,
        red, red,
        green, green,
        ssafy, ssafy
    ]
    //열린 카드가 짝이 맞는지 확인하기 위한 변수
    let openCard = '';
    let openCard2 = '';

    let cardSrc = ''
    let cardSrc2 = ''

    const cardRef = useRef();

    function createRandom(min, max) {
        let ranNum = Math.floor(Math.random() * (max-min+1)) + min;
        return ranNum
    }
    //카드 세팅
    const cardSetting = () => {
        let result = [];
        for(let i = 0; i < 16; i++) {
            let idx = createRandom(0, 15-i)
            let img = cardList.splice(idx, 1)
            result.push(<div className="card-wrap" onClick={cardClick}><img className={`image${i}`} src={img}/></div>)
        }
        return result
    }

    function cardClick(e) {
        console.log(e)
        // console.log(e.target.children[0].src)
        // e.target.classList.add("visible")
        //첫번째 카드
        if(!openCard) {
            openCard = e.target.children[0]
            cardSrc = e.target.children[0].src
            console.log("첫번째")
            console.log(cardSrc)
            e.target.children[0].classList.add("visible")
        }
        else if(openCard && !openCard2) {
            openCard2 = e.target.children[0]
            cardSrc2 = e.target.children[0].src
            console.log("두번째")
            console.log(cardSrc2)
            e.target.children[0].classList.add("visible")
            if(cardSrc === cardSrc2) {
                console.log("둘이 같아")
            } else {
                openCard.classList.remove("visible")
                openCard2.classList.remove("visible")
                openCard = ''
                openCard2 = ''
                cardSrc = ''
                cardSrc2 = ''
                console.log("둘이 달라")
            }
        }
        else {
            console.log("놉!")
        }
            // const card = document.querySelector('.image0')
        // cardRef.current.className += "hide"
        // cardRef.current.className = "hide"
        // console.log(e.target.className)
        // cardRef.current.style = "width:300px; height:300px; background:red;"
        // if(!openCard) {
            
            
           
        //     // document.querySelector(e.target.className).classList.add('hide')
        // }
        // else if(openCard && ! openCard2) {
        //     openCard2 = e.target
        // }
    }
    return(
        <div>
            <h1>같은 그림 찾기</h1>
            <button>시작하기</button>
            <div className="card-game-wrap">
                <div className="card-game-flex">
                    {cardSetting()}
                {/* {cardList.map((card, idx) => (
                  
                    <div className="card-wrap" onClick={cardClick}>
                        <img className={`image${idx}`} src={card} alt="짜증나~~" />
                    </div>)
                    
                )} */}
                </div>
            </div>
        </div>
    )
}

export default CardGame;