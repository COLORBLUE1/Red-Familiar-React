import React, { useEffect } from "react";
import { Contenedortwe, Boton } from "../assets/style/stylecomponets/styled.js";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Comentario = styled.p`
  font-size: 20px;
  margin-top: 60px;
  width: 300px;
  text-align: center;
`;

const Contenedormain = styled.div`
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
    display: grid;
    justify-items: center;
  &::-webkit-scrollbar {
  width:0;
`;

export function Map() {
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const location = { latitude, longitude };

          try {
            const apiKey = "72b9e33e4d80d0c815bc6f38488d7af2";
            const response = await fetch(
              `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
            );
            const data = await response.json();

            console.log("API Response:", data);

            if (data && data.name) {
              location.city = data.name;
            } else {
              location.city = "Unknown location";
            }

            localStorage.setItem("userLocation", JSON.stringify(location));
          } catch (error) {
            console.error("Error getting location or city:", error);
          }
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);
  
  return (
    <Contenedormain>
      <div>
        <Comentario>Tomando ciudad</Comentario>
      </div>

      <div>
        <img
          className="animate__animated animate__pulse"
          src="https://i.postimg.cc/HntT2xgP/map.png"
          alt="Map"
        />
      </div>

      <Contenedortwe>
        <Link to={"/signin"}>
          <Boton>Continuar</Boton>
        </Link>
      </Contenedortwe>
    </Contenedormain>
  );
}
