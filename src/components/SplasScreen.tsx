import { Logo } from "./const.ts";
import {
  Pantalla,
  Img,
  Splasconten,
} from "../assets/style/stylecomponets/styled.js";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

//Logica

export const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/landing");
    }, 2000); // Redirige después de 1 segundo

    return () => clearTimeout(timer); // Limpia el temporizador si el componente se desmonta
  }, [navigate]);

  return (
    <Pantalla>
      <Splasconten>
        <Img className="animate__animated animate__pulse" src={Logo} alt="Logo" />
      </Splasconten>
    </Pantalla>
  );
};
