import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome/Welcome";
import Main from "./pages/Main/Main";
import Item from "./pages/Item/Item";
import Shop from "./pages/Shop/Shop";
import Game from "./pages/Game/Game";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/main" element={<Main />} />
        <Route path="/game" element={<Game />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/item" element={<Item />} />
      </Routes>
    </Router>
  );
}

export default App;
