import React from "react";
import axios from "axios";
import "./Clothes.scss";

import { API_URL } from "../../config";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RingLoader } from "react-spinners";

import Container from "../../components/container/Container";
import ClothingForm from "../../components/clothingForm/ClothingForm";

function Clothes() {
  const [clothes, setClothes] = useState(null);
  async function fetchData() {
    const res = await axios.get(`${API_URL}/clothings?_expand=user`);
    setClothes(res.data.toReversed());
    console.log(res.data);
  }

  useEffect(() => {
    fetchData();
  }, []);
  if (!clothes) {
    return <RingLoader color="rgba(214, 142, 54, 1)" />;
  }
  let createClothing = (clothing) => {
    fetchData();
  };

  return (
    <Container>
      <ClothingForm onCreate={createClothing} />
      <div className="about-clothes">
        <h2>Drabužiai</h2>
        <div className="clothes-container">
          {clothes.map((clothing) => (
            <div className="clothes-info" key={clothing.id}>
              <div className="user-name">
                <span>Vartotojas:</span>
                <Link className="users-link" to={`/users/${clothing.user.id}`}>
                  {" "}
                  {clothing.user.name}
                </Link>
              </div>
              <div className="clothing-name">
                <span>Drabužis: </span>
                <Link className="clothes-link" to={`/clothes/${clothing.id}`}>
                  {clothing.name}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}

export default Clothes;
