import { Routes, Route, Link } from "react-router-dom";
import "./App.css";

import Home from "./pages/home/Home";
import Users from "./pages/users/Users";
import User from "./pages/user/User";
import Clothes from "./pages/clothes/Clothes";
import Clothing from "./pages/clothing/Clothing";
import Serveses from "./pages/serveses/Serveses";
import Serves from "./pages/serves/Serves";
import Orders from "./pages/orders/Orders";
import Search from "./pages/search/Search";
import Navigation from "./components/navigation/Navigation";

function App() {
  return (
    <div className="App">
      <Navigation />
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

        <Route
          path="*"
          element={
            <div>
              <h1>404 klaida. Puslapis nerastas</h1>
              <Link to="/home">Grįžti į pradžią</Link>
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
