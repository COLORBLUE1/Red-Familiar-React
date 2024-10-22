import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Contenedormain } from "../../../assets/style/stylecomponets/styled";
import { Button } from "@mui/material";
import { Header } from "../../Blocks/Header";
import { NavBarDef } from "../../Home/NavBarDef";

const Contenedornoty = styled.div`
  font-family: Raleway;
  width: 100%;
  height: auto; // Cambiado a auto para ajustar al contenido
  display: grid;
  justify-items: center;
  align-content: center;
  margin-top: 50px;
`;

const NotificationCard = styled.div`
  background: #eaf5f5;
  border-radius: 10px;
  padding: 10px;
  margin: 10px 0;
  width: 320px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

export function Notificaciones() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Aquí puedes simular las notificaciones o recibirlas desde un prop, contexto, etc.
    const welcomeNotification = "¡Bienvenido a nuestra aplicación!";
    const loginNotification = "¡Has iniciado sesión exitosamente!";

    // Simulando la llegada de notificaciones
    setNotifications([welcomeNotification, loginNotification]);

    // Limpiar las notificaciones después de un tiempo (opcional)
    const timer = setTimeout(() => {
      setNotifications([]);
    }, 10000); // Eliminar notificaciones después de 10 segundos

    return () => clearTimeout(timer); // Limpia el temporizador al desmontar
  }, []);

  return (
    <Contenedormain>
      <Header volver="/home" app="Notification" />
      <Contenedornoty>
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <NotificationCard key={index}>
              {notification}
            </NotificationCard>
          ))
        ) : (
          <p>No hay notificaciones.</p>
        )}
      </Contenedornoty>
      <NavBarDef />
    </Contenedormain>
  );
}
