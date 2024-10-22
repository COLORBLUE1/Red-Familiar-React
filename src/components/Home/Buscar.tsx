import { TextField } from "../../assets/style/stylecomponets/styled";
import { NavBarDef } from "./NavBarDef";
import { useState, useEffect } from "react";
import { firestore } from "../../firebase/firebaseConfig"; // Asegúrate de importar tu configuración de Firestore
import { collection, onSnapshot } from "firebase/firestore";
import styled from "styled-components";
import { Link } from "react-router-dom"; // Asegúrate de importar Link

const Contenedorbuscar = styled.div`
  position: relative;
  top: 50px;
  background-color: transparent;
  height: 100vh;
  width: clamp(25rem, 16.071rem + 23.81vw, 37.5rem);
  overflow-y: auto;
  margin: auto;
  border-radius: 40px;
  height: 100vh;
  overflow-y: auto;
  border: none;
  margin: auto;
  display: flex;
  justify-content: center;
  padding: 30px 10px;

  .searchBack {
    margin: 10px;

    a {
      color: gray;
      text-decoration: none;
      font-size: 20px;
      display: flex;
      align-items: center;
      font-family:Roboto;
      transition: all 0.3s linear;
    }

       a:hover {
      color: aqua;

    }

    .searchEntry {
      background: rgb(255 255 255 / 58%);
      -webkit-backdrop-filter: blur(5px);
      backdrop-filter: blur(5px);
      border: 1.5px solid rgba(209, 213, 219, 0.3);
      display: flex;
      align-items: center;
      margin: 5px 0;
      width: 100%;
      padding: 10px;
      border-radius: 20px;
      display: flex;
      align-items: center;
      margin: 5px 0;
      transition: all 0.2s linear;
    }

    img {
      border-radius: 50%;
      width: 40px;
      height: 40px;
      margin-right: 10px;
    }
  }

  .searchEntry:hover {
    scale:1.1;
    }
`;

export function Buscar() {
  const [value, setValue] = useState("");
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      setIsLoading(true);
      setError(null);

      // Referencia a la colección "users"
      const usersRef = collection(firestore, "users");

      // Usar onSnapshot para escuchar cambios en tiempo real
      const unsubscribe = onSnapshot(usersRef, (snapshot) => {
        const data = [];
        const searchQuery = value.toLowerCase();

        snapshot.forEach((doc) => {
          const userData = doc.data();
          if (
            userData.name.toLowerCase().startsWith(searchQuery) &&
            searchQuery.length > 0
          ) {
            data.push(userData); // Guarda todo el objeto del usuario
          }
        });

        setResult(data);
        setIsLoading(false);
      });

      return () => unsubscribe(); // Limpia el listener cuando se desmonta
    };

    if (value.length > 0) {
      fetchData();
    } else {
      setResult([]);
    }
  }, [value]);

  return (
    <Contenedorbuscar>
      <div>
        <TextField
          type="text"
          className="searchBar"
          onChange={(event) => setValue(event.target.value)}
          value={value}
        />

        <p>Recent searches</p>

        <div className="searchBack">
          {result.map((user, index) => (
            <Link to={`/perfil/${user.id}`} key={index}>
              <div className="searchEntry">
                <img src={user.profilePic} alt={`${user.name}'s avatar`} />
                <span>{user.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <NavBarDef />
    </Contenedorbuscar>
  );
}
