import React from "react";

import "./Navigation.css";

import { Navbar, Container, Nav } from "react-bootstrap";
import { useState, useEffect } from "react";

import { NavLink } from "react-router-dom";

function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Navbar expand="lg" className={scrolled ? "scrolled" : ""}>
      <Container>
        <Navbar.Brand href="/home">
          <h2 className="logo">Drabužių taisymas</h2>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <span className="navbar-toggler-icon"></span>
        </Navbar.Toggle>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink className="nav-link" to="/home">
              Pradžia
            </NavLink>

            <NavLink className="nav-link" to="/users">
              Vartotojai
            </NavLink>

            <NavLink className="nav-link" to="/clothes">
              Drabužiai
            </NavLink>

            <NavLink className="nav-link" to="/services">
              Paslaugos
            </NavLink>

            <NavLink className="nav-link" to="/orders">
              užsakymai
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
