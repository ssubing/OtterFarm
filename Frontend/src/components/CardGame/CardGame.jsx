import React, { useState, useRef } from "react";

import card01 from '../../assets/images/CardGame/card01.png'
import card02 from '../../assets/images/CardGame/card02.png'
import card03 from '../../assets/images/CardGame/card03.png'
import card04 from '../../assets/images/CardGame/card04.png'
import card05 from '../../assets/images/CardGame/card05.png'
import card06 from '../../assets/images/CardGame/card06.png'
import card07 from '../../assets/images/CardGame/card07.png'
import card08 from '../../assets/images/CardGame/card08.png'
import card09 from '../../assets/images/CardGame/card09.png'

import start from '../../assets/images/CardGame/start.png'

import "./CardGame.css"

function CardGame() {
    //점수
    const [score, setScore] = useState(0)
    //맞힌 카드 개수
    // const [cardNum, setCardNum] = useState(0)
    //카드 목록
    const cardList = [
        card01, card01,
        card02, card02,
        card03, card03,
        card04, card04,
        card05, card05,
        card06, card06,
        card07, card07,
        card08, card08,
        card09, card09
    ]
    //열린 카드가 짝이 맞는지 확인하기 위한 변수
    let openCard = '';
    let openCard2 = '';

    let cardSrc = ''
    let cardSrc2 = ''

    //게임 시작 여부
    // let startFlag = false
    const [startFlag, setStartFlag] = useState(false)

    //난수 생성
    function createRandom(min, max) {
        let ranNum = Math.floor(Math.random() * (max-min+1)) + min;
        return ranNum
    }

    //카드 세팅
    const cardSetting = () => {
        let result = [];
        for(let i = 0; i < 18; i++) {
            let idx = createRandom(0, 17-i)
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
    const cardRef = useRef()
    //시작할 경우 카드를 잠깐 보여줘야 한다
    function cardGameStart() {
        setStartFlag(true)
        console.log("게임 시작")
    }

    let cardNum = 0;
    

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
            //뒤집은 카드가 2개 존재하고 그 두 개의 카드가 같을 경우
            if(cardSrc && cardSrc2 && cardSrc === cardSrc2) {
                cardSrc = cardSrc2 = ''
                cardNum += 1;
                // setScore((prev) => prev + 50);
                // setScore(score + 50)
            }
            //두 카드가 같은 카드가 아닐 경우
            else if(cardSrc && cardSrc2 && cardSrc !== cardSrc2) {
                //시간을 두고 다시 뒤집어진다
                setTimeout(() => {
                    openCard.parentElement.classList.remove("flip-front")
                    openCard2.parentElement.classList.remove("flip-front")
                    //선택한 카드 초기화
                    //이미 선택한 카드가 뒤집어질때까지 다른 카드를 선택할 수 없게 한다
                    cardSrc = cardSrc2 = ''
                }, 400);
            }
        }
    }
    if(!startFlag) { 
        return(
            <div>
                <h1>같은 수달 찾기</h1>
                <div className="card-game-before" ref={cardRef}>
                    <button className="card-start-btn" nClick={cardGameStart}>시작하기</button>
                    <img src={start} alt="시작전"/>
                </div>
            </div>
        )
    }
    else {
        return(
            <div>
                <h1>같은 수달 찾기</h1>
                <h4>점수 : {score}</h4>
                <div className="card-game-wrap" ref={cardRef}>
                    <div className="card-game-flex">
                        {cardSetting()}
                    </div>
                </div>
            </div>
        )
    }
}

export default React.memo(CardGame);