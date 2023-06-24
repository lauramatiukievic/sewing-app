import React from "react";
import axios from "axios";

import { API_URL } from "../../config";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Container from "../../components/container/Container";

function Users() {
  const [users, setUsers] = useState([]);

  async function fetchData() {
    const res = await axios.get(`${API_URL}/users?_embed=orders`);
    setUsers(res.data);
    console.log(res.data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container>
      <div className="users-container">
        <ul>
          {users.map((user) => (
            <li className="user-name" key={user.id}>
              <Link to={`/users/${user.id}`} className="users-link">
                {user.name}(Užsakymų skaičius {user.orders.length})
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
}

export default Users;
