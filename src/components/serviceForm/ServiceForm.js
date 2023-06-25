import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { API_URL } from "../../config";

function ServiceForm({ service, onCreate, onEdit }) {
  const getDefaultValues = () => {
    if (service) {
      const { id, title, body, price } = service;
      return { defaultValues: { id: id, title: title, body: body, price: price } };
    } else {
      return { defaultValues: { title: "", body: "", email: "" } };
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm(getDefaultValues());

  const onSubmit = (data) => {
    if (service) {
      axios
        .put(`${API_URL}/services/${service.id}`, data)
        .then(() => {
          onEdit();
          alert("Paslauga pakoreguota");
        })
        .catch((error) => {
          alert("Klaida kuriant paslaugą");
        });
    } else {
      axios
        .post(`${API_URL}/services`, data)
        .then((response) => {
          const createdService = response.data;
          onCreate(createdService);
          alert("Paslauga sukurta!");
        })
        .catch((error) => {
          alert("Klaida kuriant paslauga");
        });
      reset();
    }
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

      {service ? <input type="submit" value="Išsaugoti paslaugą" /> : <input type="submit" value="Sukurti paslaugą" />}
    </form>
  );
}

export default ServiceForm;
