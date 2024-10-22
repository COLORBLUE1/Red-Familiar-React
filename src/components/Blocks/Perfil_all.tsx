import { useEffect, useState } from "react";
import { Header } from "../Blocks/Header";
import { imgpruebas, portada } from "../const";
import { Avatar } from "@mui/material";
import styled from "styled-components";
import { NavBarDef } from "../Home/NavBarDef";
import ImageGallery from "../Blocks/ImageGallery";
import { useParams } from "react-router-dom";
import { firestore } from "../../firebase/firebaseConfig";
import {
  query,
  where,
  getDocs,
  collection,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";

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
`;

const Contenedoruser = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
`;

const Contenedorall = styled.section`
  position: relative;
  top: 50px;
  background-color: transparent;
  height: 100vh;
  width: clamp(25rem, 16.071rem + 23.81vw, 37.5rem);
  overflow-y: auto;
  margin: auto;
  border-radius: 40px;
  font-family: Roboto;

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

export const Perfil_all = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchUserProfile = async () => {
      console.log("ID del usuario desde params:", id); // Verifica el ID

      const usersRef = collection(firestore, "users");
      const q = query(usersRef, where("id", "==", id));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        setUserProfile(userData);
        console.log("Datos del usuario:", userData); // Verifica los datos del usuario
      } else {
        console.log("No se encontró el usuario en la colección.");
      }
    };

    fetchUserProfile();
  }, [id]);

  const handleFollow = async () => {
    if (userProfile) {
      const userRef = collection(firestore, "users");
      const id = userProfile.id;
  
      try {
        // Realizamos la consulta para obtener el documento del usuario.
        const q = query(userRef, where("id", "==", id));
        const querySnapshot = await getDocs(q);
  
        if (querySnapshot.empty) {
          console.error("No se encontró el documento del usuario.");
          return;
        }
  
        // Obtén la referencia al primer documento que coincida (debería ser único).
        const userDocRef = querySnapshot.docs[0].ref;
        const userData = querySnapshot.docs[0].data();
  
        console.log("Datos del usuario:", userData);
        console.log("Referencia del documento:", userDocRef.path);
  
        // Actualizamos los seguidores.
        const newFollowersCount = isFollowing
          ? userProfile.followers - 1
          : userProfile.followers + 1;
  
        if (newFollowersCount < 0) {
          console.error("El número de seguidores no puede ser negativo.");
          return;
        }
  
        // Realizamos la actualización del documento con los nuevos seguidores.
        await updateDoc(userDocRef, {
          followers: newFollowersCount,
        });
  
        // Actualizamos el estado local para reflejar el cambio.
        setUserProfile((prevProfile) => ({
          ...prevProfile,
          followers: newFollowersCount,
        }));
  
        // Cambiar el estado de seguimiento.
        setIsFollowing(!isFollowing);
  
        console.log("Seguidores actualizados correctamente");
      } catch (error) {
        console.error("Error al actualizar los seguidores:", error);
      }
    }
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
          <Boton onClick={handleFollow}>
            {isFollowing ? "Dejar de seguir" : "Seguir"}
          </Boton>
        </Contenedorbotones>
      </section>
      <Sectioncontenido>
        <div>
          <ImageGallery autoridP={id} />
        </div>
      </Sectioncontenido>
      <NavBarDef />
    </Contenedorall>
  );
};
