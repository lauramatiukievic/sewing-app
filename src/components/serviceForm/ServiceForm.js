import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { API_URL } from "../../config";

function ServiceForm(props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    axios
      .post(`${API_URL}/services`, data)
      .then((response) => {
        const createdService = response.data;
        props.onCreate(createdService);
        alert("Paslauga sukurtas!");
      })
      .catch((error) => {
        alert("Klaida kuriant paslauga");
      });
    reset();
  };
  return (
    <form className="user-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-input">
        <label>
          Pavadinimas:
          <input {...register("title", { required: true })} />
          {errors && errors.title && <span> Užpildyti privaloma!</span>}
        </label>
      </div>
      <div className="form-input">
        <label>
          Paslaugos aprašymas:
          <input {...register("body", { required: true })} />
          {errors && errors.body && <span> Užpildyti privaloma!</span>}
        </label>
      </div>
      <div className="form-input">
        <label>
          Paslaugos kaina:
          <input {...register("price", { required: true })} />
          {errors && errors.price && <span> Užpildyti privaloma!</span>}
        </label>
      </div>
      <input type="submit" />
    </form>
  );
}

export default ServiceForm;
