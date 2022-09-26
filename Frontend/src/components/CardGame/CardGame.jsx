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
            result.push(<div className="card-wrap">
                <div className="card">
                    <div className="card-front" onClick={cardClick}></div>
                    <img className={`card-back img${i}`} src={img} alt="sudal"/>
                </div>
            </div>)
        }
        return result
    }

    //카드 클릭했을 경우
    function cardClick(e) {
        let imgClass = e.target.nextSibling.classList[1]
        //첫 카드 뒤집기
        if(!cardSrc) {
            openCard = document.querySelector(`.${imgClass}`)
            cardSrc = e.target.nextSibling.src
            e.target.parentElement.classList.add("flip-front")
        }
        //두 번째 카드 뒤집기
        else if(cardSrc && !cardSrc2) {
            openCard2 = document.querySelector(`.${imgClass}`)
            cardSrc2 = e.target.nextSibling.src
            e.target.parentElement.classList.add("flip-front")
            if(cardSrc && cardSrc2 && cardSrc === cardSrc2) {
                cardSrc = ''
                cardSrc2 = ''
            }
            //두 카드가 같은 카드가 아닐 경우
            else if(cardSrc && cardSrc2 && cardSrc !== cardSrc2) {
                console.log("second");
                openCard.parentElement.classList.remove("flip-front")
                openCard2.parentElement.classList.remove("flip-front")
                cardSrc = ''
                cardSrc2 = ''
            }
        }
    }

    return(
        <div>
            <h1>같은 그림 찾기</h1>
            <h4>점수 : {score}</h4>
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