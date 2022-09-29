// canvas API, canvas-touch-events, react-scratch-coupon을 이용한 ScratchGame
// 주요 모듈 import
import ScratchCard from 'react-scratch-coupon';
import Cover from './Cover.jpg';
import img1 from './pictures/img1.png'

// component 선언
// const ScratchGame = () => {}
//
/**
 * @todo 스크래치 게임 구성을 생각해야됨
 * 1. 세 개의 스크래치가 모두 동일하면 당첨되는 슬롯머신 형태로 할까?
 * 2. 네 개의 카드가 있고, 최대한 조금 긁은 뒤에 카드를 맞추는 형태로 할까?
 * 3. (가능성 낮음) 긁어서 나오는 QR(지금은 링크)를 통해 다른 게임으로 이동하는 기능? 
 */


function ScratchGame(props) {


    return (
    <>
      <h1>스크래치 게임!</h1>
	    <ScratchCard position="relative" width={300} height={300} cover={Cover}>
		    {/* <form className="form" >
			    <h2>Hello There!</h2>
			    <h1><code>Coupon code : 1651613335</code></h1>
			    <div>
				    <input type="text" name="code" placeholder="Coupon Code"></input>
			    </div>
			    <div>
				    <input type="submit" value="Submit"></input>
			    </div>
		    </form> */}
        <img position="absolute" width={300} height={300} src={img1} alt="" />
	    </ScratchCard>
			<ScratchCard position="relative" width={300} height={300} cover={Cover}>
				<img position="absolute" width={300} height={300} src={img1} alt="" />
			</ScratchCard>
			<ScratchCard position="relative" width={300} height={300} cover={Cover}>
				<img position="absolute" width={300} height={300} src={img1} alt="" />
			</ScratchCard>
    </>
    )
}

export default ScratchGame;