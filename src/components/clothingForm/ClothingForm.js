import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { API_URL } from "../../config";
import { useState } from "react";

function ClothingForm({ clothing, onCreate, onEdit }) {
  const [users, setUsers] = useState([]);

  const getDefaultValues = () => {
    if (clothing) {
      const { id, name, size, gender, fabric, color, photo, userId } = clothing;
      return { defaultValues: { id: id, name: name, size: size, gender: gender, fabric: fabric, color: color, photo: photo, userId: userId } };
    } else {
      return { defaultValues: { userId: "", id: "", name: "", size: "", gender: "", fabric: "", color: "", photo: "" } };
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
  }, []);

  const onSubmit = (data) => {
    if (clothing) {
      axios
        .put(`${API_URL}/clothings/${clothing.id}`, data)
        .then(() => {
          onEdit();
          alert("Drabužis pakoreguotas");
        })
        .catch((error) => {
          alert("Klaida koreguojant drabužį");
        });
    } else {
      axios
        .post(`${API_URL}/clothings`, data)
        .then((response) => {
          const createdClothing = response.data;
          onCreate(createdClothing);
          alert("Drabužis sukurtas!");
        })
        .catch((error) => {
          alert("Klaida kuriant drabužį");
        });
      reset();
    }
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
        <select name="userId" {...register("userId", { required: true, setValueAs: (value) => Number(value) })}>
          <option value="" disabled>
            Pasirinkite vartotoja
          </option>
          {usersOptionEl}
        </select>
        {errors && errors.userId && <span> Užpildyti privaloma!</span>}
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
          {errors && errors.size && <span> Užpildyti privaloma!</span>}
        </label>
      </div>
      <div className="form-input">
        <label>
          Nešiotojas:
          <input {...register("gender", { required: true })} />
          {errors && errors.gender && <span> Užpildyti privaloma!</span>}
        </label>
      </div>
      <div className="form-input">
        <label>
          Audinys:
          <input {...register("fabric", { required: true })} />
          {errors && errors.fabric && <span> Užpildyti privaloma!</span>}
        </label>
      </div>
      <div className="form-input">
        <label>
          Spalva:
          <input {...register("color", { required: true })} />
          {errors && errors.color && <span> Užpildyti privaloma!</span>}
        </label>
      </div>
      <div className="form-input">
        <label>
          Nuotrauka:
          <input {...register("photo", { required: true })} />
          {errors && errors.photo && <span> Užpildyti privaloma!</span>}
        </label>
      </div>

      {clothing ? <input type="submit" value="Išsaugoti drabužį" /> : <input type="submit" value="Sukurti drabužį" />}
    </form>
  );
}

export default ClothingForm;
