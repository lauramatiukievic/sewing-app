import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { API_URL } from "../../config";
import { useState } from "react";

function OrderForm(props) {
  const [users, setUsers] = useState([]);
  const [clothings, setCltohings] = useState([]);
  const [services, setServices] = useState([]);

  const getDefaultValues = () => {
    return { defaultValues: { userId: "", clothingId: "", serviceId: "" } };
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
  }, []);
  useEffect(() => {
    axios.get(`${API_URL}/clothings`).then((res) => {
      setCltohings(res.data);
    });
  }, []);
  useEffect(() => {
    axios.get(`${API_URL}/services`).then((res) => {
      setServices(res.data);
    });
  }, []);

  const onSubmit = (data) => {
    axios
      .post(`${API_URL}/orders`, data)
      .then((response) => {
        const createdClothing = response.data;
        props.onCreate(createdClothing);
        alert("Užsakymas sukurtas!");
      })
      .catch((error) => {
        alert("Klaida kuriant užsakymą");
      });
    reset();
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

      <input type="submit" />
    </form>
  );
}

export default OrderForm;
