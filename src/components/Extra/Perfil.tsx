import { useEffect, useState } from "react";
import { Header } from "../Blocks/Header";
import { imgpruebas, portada } from "../const";
import { Avatar, Button } from "@mui/material";
import styled from "styled-components";
import { NavBarDef } from "../Home/NavBarDef";
import ImageGallery from "../Blocks/ImageGallery";
import { Link } from "react-router-dom";
import { firestore } from "../../firebase/firebaseConfig";
import { query, where, getDocs, collection } from "firebase/firestore";

export const Boton = styled.button`
  width: clamp(11.25rem, 6.786rem + 11.905vw, 17.5rem);
  height: 50px;
  font-size: clamp(1.25rem, 0.804rem + 1.19vw, 1.875rem);
  text-align: center;
  padding: 10px;
  background-color: #ff7674;
  border: none;
  border-radius: 10px;
  color: #fff;
  cursor: pointer;
  margin-bottom: 20px;
  margin-top: 20px;
  transition: all 0.3s ease-in-out;
`;

const Sectioncontenido = styled.section`

  width: 100%;
  height: auto;
  background: #ffffff85;
  border-radius: 25px 25px 0 0;
  height: 100vh;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0;
  }

  nav ul {
    display: flex;
    width: 100%;
    gap: 50px;
    align-items: center;
    justify-content: center;
    padding: 0;

    li {
      margin: 20px 0;
      cursor: pointer;
      color: white;
      padding: 10px;
      border-radius: 15px;
    }
  }
`;

const Contenedoruser = styled.div`

  display: grid;
  grid-template-columns: 50% 50%;
`;

const Contenedorall = styled.section`
 position: relative;
  top: 50px;
  background-color: rgba(255, 255, 255, .25);
  width: clamp(25rem, 16.071rem + 23.81vw, 37.5rem);
  overflow-y: auto;
  margin: auto;
  border-radius: 40px;
  height: auto;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0;
  }
`;

const Contenedorbotones = styled.div`

  gap: 10px;
  display: flex;
  justify-content: center;
`;

const Follow = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;

  div {
    display: grid;
    justify-items: center;
    strong {
      color: #fff;
    }

    p {
      margin: 0;
      color: gray;
    }
  }
`;

const Avataruser = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;

  div:nth-child(2) {
    display: grid;
    align-items: center;

    p {
      margin: 0;
      color: gray;
    }
  }
`;

export const Perfil = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [activeItem, setActiveItem] = useState("Fotos");
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [authorId, setAuthorId] = useState(null); // Estado para almacenar el ID del autor

  useEffect(() => {
    const fetchUserProfile = async () => {
      const email = userData.email; // Correo específico a buscar
      const usersRef = collection(firestore, "users");
      const q = query(usersRef, where("email", "==", email)); // Consulta para buscar por email
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data(); // Obtiene el primer documento que coincide
        setUserProfile(userData);
        setAuthorId(userData.id); // Almacena el ID del autor
      } else {
        console.log("No such user!");
      }
    };

    fetchUserProfile();
  }, [userData.email]);

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  return (
    <Contenedorall>
      <section style={{ width: "100%", height: 150, overflow: "hidden" }}>
        <Header volver="/home" app="Perfil" />
        <img
          style={{ width: "100%", height: 150, objectFit: "cover" }}
          src={portada}
          alt=""
        />
      </section>
      <section style={{ padding: 20 }}>
        <Contenedoruser>
          <Avataruser>
            <div>
              <Avatar
                alt={userProfile?.name || "Usuario"}
                src={userProfile?.profilePic || imgpruebas}
                sx={{ width: 56, height: 56 }}
              />
            </div>
            <div>
              <strong>{userProfile?.name || "Usuario"}</strong>
              <p>{userProfile?.bio || "Descripción"}</p>
            </div>
          </Avataruser>
          <Follow>
            <div>
              <strong>Seguidores</strong>
              <p>{userProfile?.followers || "0"}</p>
            </div>
            <div>
              <strong>Seguidos</strong>
              <p>{userProfile?.following || "0"}</p>
            </div>
          </Follow>
        </Contenedoruser>
        <Contenedorbotones>
          <Link to="/ajustecuenta">
            <Boton>Editar perfil</Boton>
          </Link>
        </Contenedorbotones>
      </section>
      <Sectioncontenido>
        <div>
          {/* Pasar el ID del autor como prop a ImageGallery */}
          {authorId && <ImageGallery autoridP={authorId} />}
        </div>
      </Sectioncontenido>
      <NavBarDef />
    </Contenedorall>
  );
};
