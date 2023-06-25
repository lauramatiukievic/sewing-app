import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { API_URL } from "../../config";

function UserForm(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    axios
      .post(`${API_URL}/users`, data)
      .then((response) => {
        const createdUser = response.data;
        props.onCreate(createdUser);
        alert("Vartotojas sukurtas!");
      })
      .catch((error) => {
        alert("Klaida kuriant vartotoja");
      });
  };

  return (
    <form className="user-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-input">
        <label>
          Vardas:
          <input {...register("name", { required: true })} />
          {errors && errors.name && <span> Užpildyti privaloma!</span>}
        </label>
      </div>
      <div className="form-input">
        <label>
          Elektroninis paštas:
          <input {...register("email", { required: true })} />
          {errors && errors.email && <span> Užpildyti privaloma!</span>}
        </label>
      </div>
      <div className="form-input">
        <label>
          Telefono numeris:
          <input {...register("phone", { required: true })} />
          {errors && errors.phone && <span> Užpildyti privaloma!</span>}
        </label>
      </div>
      <input type="submit" />
    </form>
  );
}

export default UserForm;
