import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Foods from "./containers/Foods";
import Orders from "./containers/Orders";
import Restaurants from "./containers/Restaurants";

function App() {
  return (
    <Router>
      <Routes>
        {/* 店舗一覧ページ */}
        <Route path="/restaurants" element={<Restaurants />} />
        {/* フード一覧ページ */}
        <Route path="/restaurants/:restaurantsId/foods" element={<Foods />} />
        {/* 注文ページ */}
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </Router>
  );
}

export default App;
