import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome/Welcome";
import Item from "./pages/Item/Item";
import Shop from "./pages/Shop/Shop";
import Game from "./pages/Game/Game";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/game" element={<Game />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/item" element={<Item />} />
      </Routes>
    </Router>
  );
}

export default App;
