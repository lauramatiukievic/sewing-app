import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { API_URL } from "../../config";
import { useState } from "react";

function ClothingForm(props) {
  const [users, setUsers] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    axios.get(`${API_URL}/users`).then((res) => {
      setUsers(res.data);
    });
  }, []);

  const onSubmit = (data) => {
    axios
      .post(`${API_URL}/clothings`, data)
      .then((response) => {
        const createdClothing = response.data;
        props.onCreate(createdClothing);
        alert("Drabužis sukurtas!");
      })
      .catch((error) => {
        alert("Klaida kuriant drabužį");
      });
  };

  const usersOptionEl = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));
  return (
    <form className="user-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-select">
        {" "}
        <select name="userId" {...register("userId", { required: true })}>
          {usersOptionEl}
        </select>
      </div>

      <div className="form-input">
        <label>
          Vardas:
          <input {...register("name", { required: true })} />
          {errors && errors.name && <span> Užpildyti privaloma!</span>}
        </label>
      </div>
      <div className="form-input">
        <label>
          Dydis:
          <input {...register("size", { required: true })} />
          {errors && errors.email && <span> Užpildyti privaloma!</span>}
        </label>
      </div>
      <div className="form-input">
        <label>
          Nešiotojas:
          <input {...register("gender", { required: true })} />
          {errors && errors.phone && <span> Užpildyti privaloma!</span>}
        </label>
      </div>
      <div className="form-input">
        <label>
          Audinys:
          <input {...register("fabric", { required: true })} />
          {errors && errors.phone && <span> Užpildyti privaloma!</span>}
        </label>
      </div>
      <div className="form-input">
        <label>
          Spalva:
          <input {...register("color", { required: true })} />
          {errors && errors.phone && <span> Užpildyti privaloma!</span>}
        </label>
      </div>
      <div className="form-input">
        <label>
          Nuotrauka:
          <input {...register("photo", { required: true })} />
          {errors && errors.phone && <span> Užpildyti privaloma!</span>}
        </label>
      </div>
      <input type="submit" />
    </form>
  );
}

export default ClothingForm;
