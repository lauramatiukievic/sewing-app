import React from "react";
import axios from "axios";
import "./Users.scss";

import { API_URL } from "../../config";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RingLoader } from "react-spinners";

import Container from "../../components/container/Container";
import UserForm from "../../components/userForm/UserForm";

import usermale from "../../photo/vyras.jpg";
import userfemale from "../../photo/moteris.jpg";

function Users() {
  const [users, setUsers] = useState([]);

  async function fetchData() {
    const res = await axios.get(`${API_URL}/users?_embed=orders`);
    setUsers(res.data.toReversed());
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (!users) {
    return <RingLoader color="rgba(214, 142, 54, 1)" />;
  }

  let createUser = (user) => {
    setUsers((users) => [user, ...users]);
  };

  return (
    <Container>
      <div className="users-page">
        <UserForm onCreate={createUser}></UserForm>
        <div className="users-container">
          <h2 className="page-title">Vartotojų saršas</h2>
          <div className="users-list">
            {users.map((user) => (
              <div className="users-name" key={user.id}>
                {user.RadioGroup === "Moteris" ? <img className="user-image" src={usermale} alt="male" /> : <img className="user-image" src={userfemale} alt="female" />}
                <div className="about-users">
                  <Link className="users-link" to={`/users/${user.id}`}>
                    {user.name}
                  </Link>

                  <span className="orders">(Užsakymų skaičius {user.orders ? user.orders.length : 0})</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Users;
