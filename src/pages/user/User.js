import React from "react";
import axios from "axios";

import { API_URL } from "../../config";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { RingLoader } from "react-spinners";
import Container from "../../components/container/Container";

function User() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  async function fetchData() {
    const res = await axios.get(`${API_URL}/users/${id}?_embed=clothes&_embed=orders`);
    setUser(res.data);
  }

  useEffect(() => {
    fetchData();
  }, [id]);

  if (!user) {
    return <RingLoader color="rgba(214, 142, 54, 1)" />;
  }

  return (
    <Container>
      <div className="user-info">
        <h2>Vartotojo informacija:</h2>
        <h4 className="user-name">{user.name}</h4>
        <div className="contact-info">
          <h4>Kontaktai:</h4>
          <a className="email" href={"mailto:" + user.email}>
            Elektroninis paštas {user.email}
          </a>
          <a className="phone" href={"tel:" + user.phone}>
            Telefono numeris {user.phone}
          </a>
        </div>
      </div>
      <div className="clothes-container">
        <h3>Drabužių sąrašas</h3>

        <ul className="clothes-list">
          {user.clothes.map((userClothing) => (
            <li className="clothing-el" key={userClothing}>
              <span> Rūbai: </span>
              <Link to={`/clothes/${userClothing.id}`}>{userClothing.name}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="orders-container">
        <h3>Drabužių sąrašas</h3>

        <ul className="orders-list">
          {user.orders.map((userOrder) => (
            <li className="orders-el" key={userOrder}>
              <span> Užsakymai: </span>
              <Link to={`/orders/${userOrder.id}`}>({userOrder.id})</Link>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
}

export default User;
