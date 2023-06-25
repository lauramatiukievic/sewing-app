
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";

import Home from "./pages/home/Home";
import Users from "./pages/users/Users";
import User from "./pages/user/User";
import Clothes from "./pages/clothes/Clothes";
import Clothing from "./pages/clothing/Clothing";
import Orders from "./pages/orders/Orders";
import Order from "./components/order/Order";
import Search from "./pages/search/Search";
import Navigation from "./components/navigation/Navigation";
import Services from "./pages/services/Services";
import Service from "./pages/service/Service";

function App() {
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/home" element={<Home>Pradžia</Home>} />
        <Route path="/users" element={<Users>Vartotojai</Users>} />
        <Route path="/users/:id" element={<User>Vartotojas</User>} />
        <Route path="/users/:id/orders" element={<Orders>Vieno vartotojo užsakymai</Orders>} />

        <Route path="/clothes" element={<Clothes>Drabužiai</Clothes>} />
        <Route path="/clothes/:id" element={<Clothing>Drabužis</Clothing>} />

        <Route path="/services" element={<Services>Paslaugos</Services>} />
        <Route path="/services/:id" element={<Service>Paslaugos</Service>} />

        <Route path="/orders" element={<Orders>Užsakymai</Orders>} />
        <Route path="/orders/:id" element={<Order>Užsakymas</Order>} />

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
