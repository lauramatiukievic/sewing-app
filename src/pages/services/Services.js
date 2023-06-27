import React from "react";
import axios from "axios";
import "./Services.scss";

import { API_URL } from "../../config";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { RingLoader } from "react-spinners";

import Container from "../../components/container/Container";
import ServiceForm from "../../components/serviceForm/ServiceForm";

function Services() {
  const [services, setServices] = useState([]);

  async function fetchData() {
    const res = await axios.get(`${API_URL}/services`);
    setServices(res.data.toReversed());
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (!services) {
    return <RingLoader color="rgba(214, 142, 54, 1)" />;
  }
  let createService = (service) => {
    setServices((services) => [service, ...services]);
  };

  return (
    <Container>
      <div className="services-page">
        <ServiceForm onCreate={createService} />
        <div className="services-content">
          <h2 className="page-title">Paslaugos:</h2>
          <div className="services-container">
            {services.map((service) => (
              <div className="services-info" key={service.id}>
                <h2>Paslaugos pavadinimas: </h2>
                <Link className="services-link" to={`/services/${service.id}`}>
                  {service.title}
                </Link>
                <p>Paslaugos aprašymas: {service.body}</p>
                <p>Paslaugos kaina: {service.price} e.</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Services;
