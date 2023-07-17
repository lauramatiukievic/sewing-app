import React from "react";
import "./Home.scss";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import headerImage from "../../photo/b0756a3416bab815807722c5244deb64.jpg";

// import Container from "../../components/container/Container";

function Home() {
  return (
    <section className="banner" id="home">
      <Container className="home-container">
        <Row className="align-items-center">
          <Col xs={12} md={6} xl={7} className="registration">
            <p>Registruokis, pridėk drabužį ir pasirink reikiama paslauga</p>
            <Link className="users-link" to={"/users"}>
              <p className="registration-title">Pradėti registraciją</p>
            </Link>
          </Col>
          <Col xs={12} md={6} xl={5}>
            <img className="singer" src={headerImage} alt="Headder Img" />
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Home;
