import React from "react";
import axios from "axios";

import { API_URL } from "../../config";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { RingLoader } from "react-spinners";
import Container from "../../components/container/Container";
import UserForm from "../../components/userForm/UserForm";

function User() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  const [isEdit, setIsEdit] = useState(false);
  const [userDeleted, setUserDeleted] = useState(false);
  async function fetchData() {
    const res = await axios.get(`${API_URL}/users/${id}?_embed=clothings&_embed=orders`);
    setUser(res.data);

    console.log(res.data);
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
        console.log(res.data);
        setUserDeleted(true);
        alert(`${user.name} was deleted`);
      })
      .catch((error) => {
        alert("Klaida koreguojant drabužį");
      });
  };

  return (
    <Container>
      {userDeleted ? (
        <>
          <h1>Vartotojas ištrintas</h1>
          <Link to={"/users"}>Grįžti į vartotojų sąrašą</Link>
        </>
      ) : (
        <>
          {isEdit && <UserForm user={user} onEdit={editUser}></UserForm>}
          <button className="delete-data" onClick={userDeleteHandler}>
            Delete User
          </button>
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
          {user.clothings ? (
            <div className="clothes-container">
              <h3>Drabužių sąrašas</h3>

              <ul className="clothes-list">
                {user.clothings.map((clothing) => (
                  <li className="clothing-el" key={clothing.id}>
                    <span> Rūbai: </span>
                    <Link to={`/clothes/${clothing.id}`}>{clothing.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <h2>Drabužių sarašas yra tuščias</h2>
          )}
          {user.orders ? (
            <div className="orders-container">
              <h3>Užsakymų sąrašas</h3>

              <ul className="orders-list">
                {user.orders.map((order) => (
                  <li className="orders-el" key={order.id}>
                    <span> Užsakymai: </span>
                    <Link to={`/orders/${order.id}`}>({order.id})</Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <h2>Paslaugų sarašas yra tuščias</h2>
          )}
          {!isEdit && <button onClick={() => setIsEdit(true)}>Koreguoti vartotoją</button>}
        </>
      )}
    </Container>
  );
}

export default User;
