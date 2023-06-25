import React from "react";
import axios from "axios";

import { API_URL } from "../../config";
import { useEffect, useState } from "react";

import { RingLoader } from "react-spinners";

import Container from "../../components/container/Container";
import { useParams } from "react-router";

function Service() {
  const { id } = useParams();
  const [service, setService] = useState([]);

  async function fetchData() {
    const res = await axios.get(`${API_URL}/services/${id}`);
    setService(res.data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (!service) {
    return <RingLoader color="rgba(214, 142, 54, 1)" />;
  }

  return (
    <Container>
      <div className="service-info" key={service.id}>
        <h2>Paslaugos pavadinimas: {service.title}</h2>
        <p>Paslaugos aprašymas:{service.body}</p>
        <p>Paslaugos kaina: {service.price} e.</p>
      </div>
    </Container>
  );
}

export default Service;
