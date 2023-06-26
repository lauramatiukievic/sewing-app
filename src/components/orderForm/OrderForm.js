import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { API_URL } from "../../config";
import { useState } from "react";
import { RingLoader } from "react-spinners";

function OrderForm({ order, onCreate, onEdit }) {
  const [users, setUsers] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [clothings, setCltohings] = useState(null);
  const [services, setServices] = useState(null);

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
    axios.get(`${API_URL}/users?_embed=clothings`).then((res) => {
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

  const usersOptionEl = () =>
    users
      .filter((user) => user.clothings.length > 0)
      .map((user) => (
        <option key={user.id} value={user.id}>
          {user.name}
        </option>
      ));

  const clothingOptionEl = () =>
    clothings
      .filter((clothing) => (selectedUserId ? clothing.userId === selectedUserId : false))
      .map((clothing) => (
        <option key={clothing.id} value={clothing.id}>
          {clothing.name}
        </option>
      ));

  const serviceOptionEl = () =>
    services.map((service) => (
      <option key={service.id} value={service.id}>
        {service.title}
      </option>
    ));

  if (!users || !services || !clothings) {
    return <RingLoader color="rgba(214, 142, 54, 1)" />;
  }

  const setCurrentUser = (event) => {
    const userId = Number(event.target.value);
    setSelectedUserId(userId); // set userId instead of user object
  };

  return (
    <form className="form-data" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-select">
        {" "}
        <select type="number" name="userId" {...register("userId", { required: true, setValueAs: (value) => Number(value), onChange: setCurrentUser })}>
          <option value="" disabled>
            Pasirinkite vartotoja
          </option>
          {usersOptionEl()}
        </select>
        {errors && errors.userId && <span> Užpildyti privaloma!</span>}
      </div>

      <div className="form-select">
        {" "}
        <select type="number" name="clothingId" disabled={!selectedUserId} {...register("clothingId", { required: true, setValueAs: (value) => Number(value) })}>
          <option value="" disabled>
            Pasirinkite drabužį
          </option>
          {selectedUserId && clothingOptionEl()}
        </select>
        {errors && errors.clothingId && <span> Užpildyti privaloma!</span>}
      </div>

      <div className="form-select">
        {" "}
        <select type="number" name="serviceId" {...register("serviceId", { required: true, setValueAs: (value) => Number(value) })}>
          <option value="" disabled>
            Pasirinkite paslaugą
          </option>
          {serviceOptionEl()}
        </select>
        {errors && errors.serviceId && <span> Užpildyti privaloma!</span>}
      </div>
      <div className="form-input">
        <label>Užsakymo aprašymas: </label>
        <input {...register("body", { required: true })} />
        {errors && errors.body && <span> Užpildyti privaloma!</span>}
      </div>
      {order ? <input className="submit-input" type="submit" value="Išsaugoti užsakymą" /> : <input className="submit-input" type="submit" value="Sukurti užsakymą" />}
    </form>
  );
}

export default OrderForm;
