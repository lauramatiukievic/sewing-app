import React from "react";
import "./Navigation.scss";

import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <nav className="page-header">
      <NavLink className="header-title" to="/home">
        Drabužių taisymas
      </NavLink>
      <ul className="link-list">
        <li className="nav-list">
          <NavLink className="nav-link" to="/home">
            Pradžia
          </NavLink>
        </li>
        <li className="nav-list">
          <NavLink className="nav-link" to="/users">
            Vartotojai
          </NavLink>
        </li>
        <li className="nav-list">
          <NavLink className="nav-link" to="/clothes">
            Drabužiai
          </NavLink>
        </li>
        <li className="nav-list">
          <NavLink className="nav-link" to="/services">
            Paslaugos
          </NavLink>
        </li>
        <li className="nav-list">
          <NavLink className="nav-link" to="/orders">
            užsakymai
          </NavLink>
        </li>
        <li className="nav-list">
          <NavLink className="nav-link" to="/search">
            Paieška
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
