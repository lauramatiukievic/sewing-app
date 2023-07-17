import React from "react";
import axios from "axios";

import { API_URL } from "../../config";
import { useEffect, useState } from "react";

import { RingLoader } from "react-spinners";
import { Link } from "react-router-dom";

import Container from "../../components/container/Container";
import { useParams } from "react-router";
import ServiceForm from "../../components/serviceForm/ServiceForm";

function Service() {
  const { id } = useParams();
  const [service, setService] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [serviceDeleted, setServiceDeleted] = useState(false);

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
  const editService = () => {
    fetchData();
    setIsEdit(false);
  };

  const serviceDeleteHandler = () => {
    axios
      .delete(`${API_URL}/services/${id}`)
      .then((res) => {
        setServiceDeleted(true);
        alert(`${service.title} buvo ištrintas`);
      })
      .catch((error) => {
        alert("Nepavyksta ištrinti paslaugos");
      });
  };
  return (
    <Container>
      {serviceDeleted ? (
        <>
          <h1>Paslauga ištrintas</h1>
          <Link className="delete-title" to={"/services"}>
            Grįžti į paslaugų sąrašą
          </Link>
        </>
      ) : (
        <>
          <div className="about">
            {isEdit && <ServiceForm service={service} onEdit={editService} />}
            <div className="service-info" key={service.id}>
              <h2>Paslaugos pavadinimas: {service.title}</h2>
              <p>Paslaugos aprašymas:{service.body}</p>
              <p>Paslaugos kaina: {service.price} e.</p>
            </div>

            {!isEdit && (
              <button className="edit-data" onClick={() => setIsEdit(true)}>
                Koreguoti paslaugą
              </button>
            )}
            <button className="delete-data" onClick={serviceDeleteHandler}>
              Ištrinti paslaugą
            </button>
          </div>
        </>
      )}
    </Container>
  );
}

export default Service;
