import React from "react";
import axios from "axios";

import { API_URL } from "../../config";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RingLoader } from "react-spinners";

import Container from "../../components/container/Container";

function Services() {
  const [services, setServices] = useState([]);

  async function fetchData() {
    const res = await axios.get(`${API_URL}/services`);
    setServices(res.data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (!services) {
    return <RingLoader color="rgba(214, 142, 54, 1)" />;
  }

  return (
    <Container>
      {services.map((service) => (
        <div className="service-info" key={service.id}>
          <h2>Paslaugų sąrašas:</h2>
          <span>Paslaugos pavadinimas:</span>
          <Link to={`/service/${service.id}`}> {service.title}</Link>
        </div>
      ))}
    </Container>
  );
}

export default Services;
