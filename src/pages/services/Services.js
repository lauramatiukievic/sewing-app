import React from "react";
import axios from "axios";

import { API_URL } from "../../config";
import { useEffect, useState } from "react";

import { RingLoader } from "react-spinners";

import Container from "../../components/container/Container";
import ServiceForm from "../../components/serviceForm/ServiceForm";

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
  let createService = (service) => {
    setServices((services) => [...services, service]);
  };

  return (
    <Container>
      <ServiceForm onCreate={createService} />
      {services.map((service) => (
        <div className="service-info" key={service.id}>
          <h2>Paslaugos pavadinimas: {service.title}</h2>
          <p>Paslaugos aprašymas:{service.body}</p>
          <p>Paslaugos kaina: {service.price} e.</p>
        </div>
      ))}
    </Container>
  );
}

export default Services;
