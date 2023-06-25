import React from "react";
import axios from "axios";

import { API_URL } from "../../config";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RingLoader } from "react-spinners";
import { Link } from "react-router-dom";

import Container from "../../components/container/Container";
import OrderForm from "../orderForm/OrderForm";

function Order() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  async function fetchData() {
    axios.get(`${API_URL}/orders/${id}?_expand=user&_expand=service`).then((response) => {
      const orders = response.data;
      axios.get(`${API_URL}/clothings`).then((response) => {
        const clothing = response.data;
        const ordersWithClothings = {
          ...orders,
          clothing: clothing,
        };
        console.log(ordersWithClothings);

        setOrder(ordersWithClothings);
      });
    });
  }

  useEffect(() => {
    fetchData();
  }, [id]);

  if (!order) {
    return <RingLoader color="rgba(214, 142, 54, 1)" />;
  }

  const editOrder = () => {
    fetchData();
    setIsEdit(false);
  };

  return (
    <Container>
      {isEdit && <OrderForm order={order} onEdit={editOrder} />}
      <div className="order-info">
        <h2>
          Vartotojas: <Link to={`/users/${order.user.id}`}>{order.user.name}</Link>
        </h2>
        <h2>
          Drabužis:<Link to={`/clothes/${order.clothing.id}`}> {order.clothing[0].name}</Link>
        </h2>
        <h3>
          Paslauga: <Link to={`/services/${order.service.id}`}> {order.service.title}</Link>
        </h3>
        <p>Užsakymo aprašymas: {order.body}</p>

        {!isEdit && <button onClick={() => setIsEdit(true)}>Koreguoti užsakymą</button>}
      </div>
    </Container>
  );
}

export default Order;
