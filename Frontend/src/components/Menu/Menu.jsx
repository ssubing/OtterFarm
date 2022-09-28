import "./Menu.css";
const Menu = ({onClick})=> 
    <div className="Menu">
        <bitton className="menuBtn" onClick={onClick}>Play Tetris</bitton>
    </div>

export default Menu;