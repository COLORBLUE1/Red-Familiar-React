import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { imgpruebas } from "../const.ts";
import styled from "styled-components";

const Contenedorerror = styled.div`
  display: grid;
  justify-content: center;
  height: 100vh;
  background-color: #f1f1f1;
  justify-items: center;
  align-items: center;
  align-content: center;
  strong {
    margin: 20px;
  }

  img {
    width: 200px;
    height: 200px;
  }
`;

export const Error = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/signin");
    }, 1500); // Redirige después de 1 segundo

    return () => clearTimeout(timer); // Limpia el temporizador si el componente se desmonta
  }, [navigate]);

  return (
    <Contenedorerror className="not-found-page">
      <strong>Esa ruta no existe</strong>

      <div>
        <img
          src="https://res.cloudinary.com/dehpi4905/image/upload/v1729201602/J-C/wcii9oslj3ire3wuhpwj.png"
          alt="Character"
          className="animated-character"
        />
      </div>
      <strong>Te redirijitemos al Login</strong>
    </Contenedorerror>
  );
};
