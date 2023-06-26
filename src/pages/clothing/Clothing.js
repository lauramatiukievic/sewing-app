import React from "react";
import axios from "axios";
import "./Clothing.scss";

import { API_URL } from "../../config";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RingLoader } from "react-spinners";
import { Link } from "react-router-dom";

import Container from "../../components/container/Container";
import ClothingForm from "../../components/clothingForm/ClothingForm";

function Clothing() {
  const { id } = useParams();
  const [clothing, setClothing] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [userDeleted, setUserDeleted] = useState(false);

  async function fetchData() {
    const res = await axios.get(`${API_URL}/clothings/${id}?_expand=user`);
    setClothing(res.data);
    console.log(res.data);
  }

  useEffect(() => {
    fetchData();
  }, [id]);

  if (!clothing) {
    return <RingLoader color="rgba(214, 142, 54, 1)" />;
  }

  const editClothing = () => {
    fetchData();
    setIsEdit(false);
  };

  const userDeleteHandler = () => {
    axios
      .delete(`${API_URL}/clothings/${id}`)
      .then((res) => {
        console.log(res.data);
        setUserDeleted(true);
        alert(`${clothing.name} buvo ištrintas`);
      })
      .catch((error) => {
        alert("Nepavyksta ištrinti drabužio");
      });
  };

  return (
    <Container>
      <div className="clothing-page">
        {userDeleted ? (
          <>
            <h1>Drabužis ištrintas</h1>
            <Link className="delete-title" to={"/clothes"}>
              Grįžti į Drabužių sąrašą
            </Link>
          </>
        ) : (
          <div className="clothing-data">
            <div className="about">
              {isEdit && <ClothingForm clothing={clothing} onEdit={editClothing} />}
              <div className="clothing-info">
                <div className="registration-data">
                  <h2>Drabužio informacija:</h2>
                  <h4>Vartotojo vardas: {clothing.user.name}</h4>
                  <h4>Registruojamas drabužis: {clothing.name}</h4>
                </div>
                <div className="clothing-charac">
                  <h3>Drabužio charakteristika:</h3>
                  <p>Dydis: {clothing.size}</p>
                  <p>Nešiotojas: {clothing.gender}</p>
                  <p>Audinys: {clothing.fabric}</p>
                  <p>Spalva: {clothing.color}</p>
                </div>
                <div className="clothing-photo">
                  <h3>Drabužio nuotrauka:</h3>
                  <img width="150" height="150" src={clothing.photo} alt="" />
                </div>
              </div>
              <div className="clothing-buttons">
                {!isEdit && <button onClick={() => setIsEdit(true)}> Koreguoti drabužį </button>}
                <button className="delete-data" onClick={userDeleteHandler}>
                  Ištrinti drabužį
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
}

export default Clothing;
