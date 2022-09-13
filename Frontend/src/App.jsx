import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome/Welcome";
import Item from "./pages/Item/Item";
import Shop from "./pages/Shop/Shop";
import Game from "./pages/Game/Game";
import Information from "./pages/Information/Information";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/game" element={<Game />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/item" element={<Item />} />
      </Routes>
      <Routes>
        <Route path="/information" element={<Information />} />
      </Routes>
    </Router>
  );
}

export default App;
