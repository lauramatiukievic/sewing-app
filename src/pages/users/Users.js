import React from "react";
import axios from "axios";
import "./Users.scss";

import { API_URL } from "../../config";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RingLoader } from "react-spinners";

import Container from "../../components/container/Container";
import UserForm from "../../components/userForm/UserForm";

function Users() {
  const [users, setUsers] = useState([]);

  async function fetchData() {
    const res = await axios.get(`${API_URL}/users?_embed=orders`);
    setUsers(res.data.toReversed());
    console.log(res.data);
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
    <Container className="users-body">
      <UserForm onCreate={createUser}></UserForm>
      <div className="users-container">
        <ul className="users-list">
          {users.map((user) => (
            <li className="users-name" key={user.id}>
              <Link className="users-link" to={`/users/${user.id}`}>
                {user.name}
              </Link>
              <span className="orders">(Užsakymų skaičius {user.orders ? user.orders.length : 0})</span>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
}

export default Users;
