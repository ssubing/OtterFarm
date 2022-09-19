import Navbar from "../../components/Navbar/Navbar";
import "./Guide.css";
import Button from "@material-ui/core/Button";
import game from "../../assets/images/game.png";
const Guide = () => {
  return (
    <div className="guide">
      <Navbar></Navbar>
      <div className="description">
        <div className="title">수달농장</div>
        <div className="line"></div>
        <p className="content">
          수달농장은 게임을 통해 나만의 수달(NFT)를 만드는 서비스!
        </p>
        <div className="title">수달꾸미기</div>
        <div className="line"></div>
        <p className="content">모은 수달머니로 당신의 수달을 꾸며보세요</p>
        <div className="title">수달샵</div>
        <div className="line"></div>
        <p className="content">
          다른 사람들이 키운 수달을 경매를 통해 분양받을 수 있어요!
        </p>
        <div className="title">
          게임하기
          <Button
            style={{
              fontFamily: "neo",
              fontWeight: "bold",
              backgroundColor: "#DAB49D",
              marginLeft: "10px",
            }}
            variant="contained"
            href="/game"
          >
            게임하러 가기
          </Button>
        </div>
        <div className="line"></div>
        <div className="game">
          <img src={game} alt="game" className="game-thumbnail"></img>
          <p className="content">
            뿌슝빠슝
            <br />
            <br />이 게임은 뿌슝빠슝 합니다 😎
          </p>
        </div>
      </div>
    </div>
  );
};

export default Guide;
