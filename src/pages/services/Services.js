import React from "react";
import axios from "axios";

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
      <ServiceForm onCreate={createService} />
      {services.map((service) => (
        <div className="service-info" key={service.id}>
          {" "}
          <h2>Paslaugos pavadinimas: </h2>
          <Link to={`/services/${service.id}`}>{service.title}</Link>
          <p>Paslaugos aprašymas:{service.body}</p>
          <p>Paslaugos kaina: {service.price} e.</p>
        </div>
      ))}
    </Container>
  );
}

export default Services;
