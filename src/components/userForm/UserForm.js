import React from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { API_URL } from "../../config";
import FormImage from "../formImage/FormImage";
import { RadioGroup, FormControlLabel, Radio } from "@mui/material";

import usermale from "../../photo/vyras.jpg";
import userfemale from "../../photo/moteris.jpg";

function UserForm({ onCreate, user, onEdit }) {
  const getDefaultValues = () => {
    if (user) {
      const { id, name, phone, email } = user;
      return { defaultValues: { id: id, name: name, phone: phone, email: email } };
    } else {
      return { defaultValues: { name: "", phone: "", email: "" } };
    }
  };
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm(getDefaultValues());

  const onSubmit = (data) => {
    if (user) {
      axios
        .put(`${API_URL}/users/${data.id}`, data)
        .then(() => {
          onEdit();
          alert("Vartotojas pakoreguotas");
        })
        .catch((error) => {
          alert("Klaida koreguojant vartotoją");
        });
    } else {
      axios
        .post(`${API_URL}/users`, data)
        .then((response) => {
          const createdUser = response.data;
          onCreate(createdUser);
          alert("Vartotojas sukurtas!");
        })
        .catch((error) => {
          alert("Klaida kuriant vartotoja");
        });
      reset();
    }
  };

  return (
    <form className="form-data" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-header">
        {user ? <h2 className="form-title">Pakoreguoti varotoją</h2> : <h2 className="form-title">Sukurti naują vartotoją</h2>}
        <FormImage />
      </div>
      <div className="form-content">
        <div className="form-input">
          <label>Vardas: </label>
          <input {...register("name", { required: true })} />
          {errors && errors.name && <span> Užpildyti privaloma!</span>}
        </div>
        <section>
          <label>Jūsų lytis</label>
          <Controller
            render={({ field }) => (
              <RadioGroup aria-label="gender" {...field}>
                <FormControlLabel value="Moteris" control={<Radio />} label="Vyras" />
                <FormControlLabel value="Vyras" control={<Radio />} label="Moteris" />
              </RadioGroup>
            )}
            name="RadioGroup"
            control={control}
          />
        </section>
        <div className="form-input">
          <label>Elektroninis paštas: </label>
          <input {...register("email", { required: true })} />
          {errors && errors.email && <span> Užpildyti privaloma!</span>}
        </div>
        <div className="form-input">
          <label>Telefono numeris: </label>
          <input {...register("phone", { required: true })} />
          {errors && errors.phone && <span> Užpildyti privaloma!</span>}
        </div>
      </div>
      {user ? <input className="submit-input" type="submit" value="Išsaugoti vartotoją" /> : <input className="submit-input" type="submit" value="Pridėti vartotoją" />}
    </form>
  );
}

export default UserForm;
