import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { API_URL } from "../../config";
import { useState } from "react";

function OrderForm({ order, onCreate, onEdit }) {
  const [users, setUsers] = useState([]);
  const [clothings, setCltohings] = useState([]);
  const [services, setServices] = useState([]);

  const getDefaultValues = () => {
    if (order) {
      const { id, userId, clothingId, serviceId, body } = order;
      return { defaultValues: { id: id, userId: userId, clothingId: clothingId, serviceId: serviceId, body: body } };
    } else {
      return { defaultValues: { id: "", userId: "", clothingId: "", serviceId: "", body: "" } };
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm(getDefaultValues());

  useEffect(() => {
    axios.get(`${API_URL}/users`).then((res) => {
      setUsers(res.data);
    });
    axios.get(`${API_URL}/clothings`).then((res) => {
      setCltohings(res.data);
    });
    axios.get(`${API_URL}/services`).then((res) => {
      setServices(res.data);
    });
  }, []);

  const onSubmit = (data) => {
    if (order) {
      axios
        .put(`${API_URL}/orders/${order.id}`, data)
        .then(() => {
          onEdit();
          alert("Užsakymas pakoreguotas");
        })
        .catch((error) => {
          alert("Klaida koreguojant užsakymą");
        });
    } else {
      axios
        .post(`${API_URL}/orders`, data)
        .then((response) => {
          const createdClothing = response.data;
          onCreate(createdClothing);
          alert("Užsakymas sukurtas!");
        })
        .catch((error) => {
          alert("Klaida kuriant užsakymą");
        });
      reset();
    }
  };

  const usersOptionEl = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  const clothingOptionEl = clothings.map((clothing) => (
    <option key={clothing.id} value={clothing.id}>
      {clothing.name}
    </option>
  ));

  const serviceOptionEl = services.map((service) => (
    <option key={service.id} value={service.id}>
      {service.title}
    </option>
  ));
  return (
    <form className="user-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-select">
        {" "}
        <select type="number" name="userId" {...register("userId", { required: true, setValueAs: (value) => Number(value) })}>
          <option value="" disabled>
            Pasirinkite vartotoja
          </option>
          {usersOptionEl}
        </select>
        {errors && errors.userId && <span> Užpildyti privaloma!</span>}
      </div>
      <div className="form-select">
        {" "}
        <select type="number" name="clothingId" {...register("clothingId", { required: true, setValueAs: (value) => Number(value) })}>
          <option value="" disabled>
            Pasirinkite drabužį
          </option>
          {clothingOptionEl}
        </select>
        {errors && errors.clothingId && <span> Užpildyti privaloma!</span>}
      </div>

      <div className="form-select">
        {" "}
        <select type="number" name="serviceId" {...register("serviceId", { required: true, setValueAs: (value) => Number(value) })}>
          <option value="" disabled>
            Pasirinkite paslaugą
          </option>
          {serviceOptionEl}
        </select>
        {errors && errors.serviceId && <span> Užpildyti privaloma!</span>}
      </div>
      <div className="form-input">
        <label>
          Užsakymo aprašymas:
          <input {...register("body", { required: true })} />
          {errors && errors.body && <span> Užpildyti privaloma!</span>}
        </label>
      </div>
      {order ? <input type="submit" value="Išsaugoti užsakymą" /> : <input type="submit" value="Sukurti užsakymą" />}
    </form>
  );
}

export default OrderForm;
