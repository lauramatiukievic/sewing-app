import React from "react";
import "./Home.scss";
import { Link } from "react-router-dom";

import Container from "../../components/container/Container";

function Home() {
  return (
    <div className="home-page">
      <Container className="home-container">
        <div className="registration">
          <p>Registruokis, pridėk drabužį ir pasirink reikiama paslauga</p>
          <Link className="users-link" to={"/users"}>
            <p className="registration-title">Pradėti registraciją</p>
          </Link>
        </div>
      </Container>
    </div>
  );
}

export default Home;
