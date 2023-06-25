import React from "react";
import axios from "axios";

import { API_URL } from "../../config";
import { useEffect, useState } from "react";

import { RingLoader } from "react-spinners";

import Container from "../../components/container/Container";
import { Link } from "react-router-dom";

function Orders() {
  const [orders, setOrders] = useState([]);

  async function fetchData() {
    axios.get(`${API_URL}/orders?_expand=user&_expand=service`).then((response) => {
      const orders = response.data;
      axios.get(`${API_URL}/clothings`).then((response) => {
        const clothings = response.data;
        const ordersWithClothings = orders.map((order) => ({
          ...order,
          clothing: clothings.find((clothing) => clothing.id === order.clothingId),
        }));
        console.log(ordersWithClothings);

        setOrders(ordersWithClothings);
      });
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (!orders) {
    return <RingLoader color="rgba(214, 142, 54, 1)" />;
  }
  return (
    <Container>
      {orders.map((order) => (
        <div key={order.id}>
          <Link to={`/order/${order.id}`}>Užsakymas(1)</Link>
          <h2>
            Vartotojas: <Link to={`/users/${order.user.id}`}>{order.user.name}</Link>
          </h2>
          <h2>
            Drabužis:<Link to={`/clothes/${order.clothing.id}`}> {order.clothing.name}</Link>
          </h2>
          <h3>
            Paslauga: <Link to={`/services/${order.service.id}`}> {order.service.title}</Link>
          </h3>
        </div>
      ))}
    </Container>
  );
}

export default Orders;
