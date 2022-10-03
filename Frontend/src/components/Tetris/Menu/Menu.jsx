import "./Menu.css";

const Menu = ({ handleStart }) => (
  <div className="Menu">
    <button className="Button" onClick={handleStart}>
      테트리스 시작
    </button>
  </div>
);

export default Menu;
