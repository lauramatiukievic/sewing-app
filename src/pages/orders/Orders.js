import React from "react";
import axios from "axios";
import "./Orders.scss";

import { API_URL } from "../../config";
import { useEffect, useState } from "react";

import { RingLoader } from "react-spinners";

import Container from "../../components/container/Container";
import { Link } from "react-router-dom";
import OrderForm from "../../components/orderForm/OrderForm";

import hanger from "../../photo/pakaba.jpg";

function Orders() {
  const [orders, setOrders] = useState(null);

  async function fetchData() {
    axios.get(`${API_URL}/orders?_expand=user&_expand=service`).then((response) => {
      const orders = response.data;
      axios.get(`${API_URL}/clothings?_embed=user`).then((response) => {
        const clothings = response.data;
        const ordersWithClothings = orders.map((order) => ({
          ...order,
          clothing: clothings.find((clothing) => clothing.id === order.clothingId),
        }));
        console.log(ordersWithClothings);

        setOrders(ordersWithClothings.toReversed());
      });
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (!orders) {
    return <RingLoader color="rgba(214, 142, 54, 1)" />;
  }

  let createOrder = (order) => {
    fetchData();
  };
  return (
    <Container>
      <div className="orders-page">
        <OrderForm onCreate={createOrder} />
        <div className="about-orders">
          <h2 className="page-title">Užsakymai:</h2>
          <div className="orders-content">
            {orders.map((order) => (
              <div className="orders-info" key={order.id}>
                <div>
                  <img src={hanger} alt="hanger" />
                </div>
                <h2>
                  <Link className="users-link" to={`/users/${order.user.id}`}>
                    {order.user.name}
                  </Link>
                </h2>
                <h3>
                  <Link className="clothes-link" to={`/clothes/${order.clothing.id}`}>
                    {order.clothing.name}
                  </Link>
                </h3>
                <h3>
                  <Link className="services-link" to={`/services/${order.service.id}`}>
                    {" "}
                    {order.service.title}
                  </Link>
                </h3>
                <span>
                  <Link className="orders-link" to={`/orders/${order.id}`}>
                    Užsakymo informacija...
                  </Link>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Orders;
