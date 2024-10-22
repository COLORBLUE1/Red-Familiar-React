import { TbPencil } from "react-icons/tb";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/userSlice.js";
import { Button } from "@mui/material";
import {
  Contenedormenumap,
  Contenido,
  Option,
  Sectionhome
} from "../../assets/style/stylecomponets/styled";
import styled from "styled-components";
import { Header } from "../Blocks/Header.js";

export const Boton = styled.button`
  width: 100%;
  height: 50px;
  font-size: clamp(1.25rem, 0.804rem + 1.19vw, 1.875rem);
  text-align: center;
  padding: 10px;
  background-color: #c8f3f4;
  border: none;
  border-radius: 10px;
  color: gray;
  cursor: pointer;
  margin-bottom: 20px;
  margin-top: 20px;
  transition: all 0.3s ease-in-out;
`;

export const Ajustesmap = () => {
  const label = { inputProps: { "aria-label": "Switch demo" } };
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAuth = async (provider) => {
    try {
      let user;
      switch (provider) {
        case "Map":
          navigate("/ajustesmap");
          break;
        case "Facebook":
          user = await facebookLogin();
          break;
        case "Salir":
          console.log("voy saliendo");
          user = await logout();
          navigate("/signin"); // Redirige a /home después del login
          break;
        default:
          break;
      }

      if (user) {
        dispatch(setUser(user));
        navigate("/home"); // Redirige a /home después del login
      }
    } catch (error) {
      console.error("Error during social login", error);
    }
  };

  const cityactual = localStorage.getItem("userLocation");

  return (
    <Sectionhome>
      <Header volver="/home" />
      <Contenedormenumap>
          <img
            className="animate__animated animate__pulse"
            src="https://i.postimg.cc/HntT2xgP/map.png"
            alt="Map"
          />
        <Option>
          <Contenido>{cityactual}</Contenido>
          <TbPencil />
        </Option>
        <Button
          variant="contained"
          sx={{
            width: 320,
            lineHeight: 1,
            height: 40,
            background: "#eaf5f5",
            borderRadius: 10,
            margin: (0, 2),
            color: "#878686",
          }}
          disableElevation
        >
          Workout reminder
        </Button>
        <Button
          variant="contained"
          sx={{
            width: 320,
            lineHeight: 1,
            height: 40,
            background: "#eaf5f5",
            borderRadius: 10,
            margin: (0, 2),
            color: "#878686",
          }}
          disableElevation
        >
          Workout reminder
        </Button>
        <Boton>Guardar</Boton>
      </Contenedormenumap>
    </Sectionhome>
  );
};
