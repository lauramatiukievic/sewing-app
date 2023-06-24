import React from "react";
import axios from "axios";

import { API_URL } from "../../config";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RingLoader } from "react-spinners";

import Container from "../../components/container/Container";

function Clothes() {
  const [clothes, setClothes] = useState([]);
  async function fetchData() {
    const res = await axios.get(`${API_URL}/clothings?_expand=user`);
    setClothes(res.data);
    console.log(res.data);
  }

  useEffect(() => {
    fetchData();
  }, []);
  if (!clothes) {
    return <RingLoader color="rgba(214, 142, 54, 1)" />;
  }

  return (
    <Container>
      <div>
        <h2>Drabužiai</h2>

        {clothes.map((clothing) => (
          <div key={clothing.id}>
            <div>
              <span>Vartotojas:</span>
              <Link to={`/users/${clothing.user.id}`}> {clothing.user.name}</Link>
            </div>
            <div>
              <span>Drabužis: </span>
              <Link to={`/clothes/${clothing.id}`}>{clothing.name}</Link>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}

export default Clothes;
