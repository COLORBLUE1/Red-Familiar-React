import { AddCircleOutline, Home, Search } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { BsBellFill } from "react-icons/bs";
import { Avatar, BottomNavigationAction } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { firestore } from "../../firebase/firebaseConfig";
import { query, where, getDocs, collection } from "firebase/firestore";

const Contenedornavbar = styled.div`
  background: #3e3e3e7a;
  backdrop-filter: blur(5px);
  border: 1.5px solid rgba(209, 213, 219, 0.3);
  color: #fff;
  position: fixed;
  bottom: 0; /* Asegúrate de que esté en la parte inferior */
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 50px;
  border-radius: 0;

  /* Estilo para pantallas grandes (computadoras) */
  @media (min-width: 768px) {
    background: rgba(255, 255, 255, .25);
  backdrop-filter: blur(5px);
  border: 1.5px solid rgba(209, 213, 219, 0.3);
    margin: auto 0;
    width: 50px;
    height: auto;
    flex-direction: column;
    justify-content: center;
    padding: 10px;
    bottom: 50%; 
    transform: translateY(50%); 
    left: 100px; 
    border-radius: 10px;
    display: flex;
    gap: 50px;
    align-items: center;
    position: fixed; /* Mantener fijo en pantallas grandes también */
  }
`;

const StyledBottomNavigationAction = styled(BottomNavigationAction)`
  transition: transform 0.2s ease, background-color 0.2s ease;
  
  &:hover {
  
    transform: scale(1.1); 

  &:active {
    transform: scale(0.95); 
  }
`;

export function NavBarDef() {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const email = userData.email;
      const usersRef = collection(firestore, "users");
      const q = query(usersRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        setUserProfile(userData);
      } else {
        console.log("No such user!");
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <Contenedornavbar>
      <StyledBottomNavigationAction
        component={Link}
        to="/home"
        icon={<Home sx={{ color: "#fff", width: 25, height: 25 }} />}
      />
      <StyledBottomNavigationAction
        component={Link}
        to="/buscar"
        icon={<Search sx={{ color: "#fff", width: 25, height: 25 }} />}
      />
      <StyledBottomNavigationAction
        component={Link}
        to="/newpost"
        icon={
          <AddCircleOutline sx={{ color: "blue", width: 25, height: 25 }} />
        }
      />
      <StyledBottomNavigationAction
        component={Link}
        to="/notificaciones"
        icon={<BsBellFill style={{ color: "#fff", width: 25, height: 25 }} />}
      />
      <StyledBottomNavigationAction
        component={Link}
        to="/perfil"
        icon={
          <Avatar
            alt="Remy Sharp"
            src={userProfile?.profilePic || ""}
            sx={{ width: 35, height: 35 }}
          />
        }
      />
    </Contenedornavbar>
  );
}
