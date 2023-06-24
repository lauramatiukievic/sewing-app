import React from "react";
import axios from "axios";

import { API_URL } from "../../config";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RingLoader } from "react-spinners";

import Container from "../../components/container/Container";

function Clothing() {
  const { id } = useParams();
  const [clothing, setClothing] = useState([]);

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

  return (
    <Container>
      <div className="clothing-info">
        <h2>Drabužio informacija:</h2>
        {/* <h4>Vartotojo vardas: {clothing.user.name}</h4> */}
        <h4>Registruojamas drabužis: {clothing.name}</h4>
        <div className="clothing-data">
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
    </Container>
  );
}

export default Clothing;
