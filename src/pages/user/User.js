import React from "react";
import axios from "axios";
import "./User.scss";

import { API_URL } from "../../config";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { RingLoader } from "react-spinners";
import Container from "../../components/container/Container";
import UserForm from "../../components/userForm/UserForm";

import orderImage from "../../photo/orderrr.jpg";
import clothesIamge from "../../photo/drabuziaisarasui.jpg";

function User() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  const [isEdit, setIsEdit] = useState(false);
  const [userDeleted, setUserDeleted] = useState(false);
  async function fetchData() {
    const res = await axios.get(`${API_URL}/users/${id}?_embed=clothings`);
    const orders = await axios.get(`${API_URL}/orders?_expand=user&userId=${id}&_expand=service`);

    const userWithOrders = { ...res.data, orders: orders.data };

    setUser(userWithOrders);
  }

  useEffect(() => {
    fetchData();
  }, [id]);

  if (!user) {
    return <RingLoader color="rgba(214, 142, 54, 1)" />;
  }

  const editUser = () => {
    fetchData();
    setIsEdit(false);
  };
  const userDeleteHandler = () => {
    axios
      .delete(`${API_URL}/users/${id}`)
      .then((res) => {
        setUserDeleted(true);
        alert(`${user.name} buvo ištrintas`);
      })
      .catch((error) => {
        alert("Nepavyksta ištrinti vartotojo");
      });
  };

  return (
    <Container>
      <div className="user-page">
        {userDeleted ? (
          <>
            <h1>Vartotojas ištrintas</h1>
            <Link className="delete-title" to={"/users"}>
              Grįžti į vartotojų sąrašą
            </Link>
          </>
        ) : (
          <div className="about">
            <div className="about-info">
              {isEdit && <UserForm user={user} onEdit={editUser}></UserForm>}
              <div className="user-info-title">
                <h2>Vartotojo informacija:</h2>
              </div>
              <div className="user-information">
                <div className="about-user">
                  <div className="user-info-details">
                    <h4 className="user-name"> Vardas: {user.name}</h4>
                    <span>{user.RadioGroup}</span>
                    <div className="contact-info">
                      <h4>Kontaktai:</h4>
                      <div className="connection-info">
                        <a className="email" href={"mailto:" + user.email}>
                          Elektroninis paštas: {user.email}
                        </a>
                        <a className="phone" href={"tel:" + user.phone}>
                          Telefono numeris: {user.phone}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="list-order-clothes">
                  {user.clothings && user.clothings.length !== 0 ? (
                    <div className="clothe-container">
                      <div className="clothes-title">
                        <h3>Drabužių sąrašas </h3>
                        {/* <img src={clothesIamge} alt="clothes" /> */}
                      </div>
                      <ul className="clothes-list">
                        {user.clothings.map((clothing) => (
                          <li className="clothing-el" key={clothing.id}>
                            <Link className="clothing-link" to={`/clothes/${clothing.id}`}>
                              {clothing.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <div className="order-title">
                      <h2>Drabužių sarašas yra tuščias</h2>
                      {/* <img src={clothesIamge} alt="clothes" /> */}
                    </div>
                  )}
                  {user.orders && user.orders.length !== 0 ? (
                    <div className="orders-container">
                      <div className="order-title">
                        <h3>Užsakytos paslaugos</h3>
                        {/* <img src={orderImage} alt="oder" /> */}
                      </div>
                      {user.orders.map((order) => (
                        <div className="orders-el" key={order.id}>
                          <Link className="order-link" to={`/orders/${order.id}`}>
                            <span>Užsakymai</span>({order.service.title})
                          </Link>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="order-title">
                      <h2>Paslaugų sarašas yra tuščias</h2>
                      {/* <img src={orderImage} alt="oder" /> */}
                    </div>
                  )}
                </div>
              </div>
              <div className="user-buttons">
                {!isEdit && (
                  <button className="edit-data" onClick={() => setIsEdit(true)}>
                    Koreguoti vartotoją
                  </button>
                )}
                <button className="delete-data" onClick={userDeleteHandler}>
                  Ištrinti vartotoją
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
}

export default User;
