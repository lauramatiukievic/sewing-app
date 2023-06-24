import { Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./pages/hoem/Home";
import Users from "./pages/users/Users";
import User from "./pages/user/User";
import Clothes from "./pages/clothes/Clothes";
import Clothing from "./pages/clothing/Clothing";
import Serveses from "./pages/serveses/serveses";
import Serves from "./pages/serves/Serves";
import Orders from "./pages/orders/orders";
import Search from "./pages/search/Search";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/home" element={<Home>Pradžia</Home>} />
        <Route path="/users" element={<Users>Vartotojai</Users>} />
        <Route path="/users:id" element={<User>Vartotojas</User>} />
        <Route path="/clothes" element={<Clothes>Drabužiai</Clothes>} />
        <Route path="/clothes:id" element={<Clothing>Drabužis</Clothing>} />
        <Route path="/clothes" element={<Clothes>Drabužiai</Clothes>} />
        <Route path="/serveses" element={<Serveses>Paslaugos</Serveses>} />
        <Route path="/serveses:id" element={<Serves>Paslauga</Serves>} />
        <Route path="/orders" element={<Orders>Užsakymai</Orders>} />
        <Route path="/search" element={<Search>Paieška</Search>} />
      </Routes>
    </div>
  );
}

export default App;
