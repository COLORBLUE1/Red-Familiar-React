import styled from "styled-components";
import { Contenedormain } from "../../../assets/style/stylecomponets/styled";
import { imgpruebas } from "../../const";
import { Header } from "../../Blocks/Header";

const Contenedornoty = styled.div`
  font-family: Raleway;
  padding: 20px 0;
  width: 100%;
  display: grid;
  justify-items: center;
  align-content: center;
`;

const Pworkoutsadded = styled.p`
  padding: 30px;
`;

export function Workoutsadded() {
  return (
    <Contenedormain>
      <Contenedornoty>
        <Header volver="/noty" app="Notification" />

        <img
          src="https://res.cloudinary.com/dehpi4905/image/upload/v1726088494/Buffalo%20app/Extra/besqomjl37w9h2z9twfj.png"
          alt=""
        />
        <Pworkoutsadded>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. In architecto
          non aut. Nobis nihil explicabo ut, earum necessitatibus voluptatum,
          pariatur, facere esse minima facilis veniam temporibus! Perspiciatis
          quo sapiente quos. Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Ratione perspiciatis amet veritatis dolores mollitia temporibus!
          Ipsa incidunt, soluta debitis veritatis, consequuntur blanditiis
          voluptatem nam corporis praesentium error, quis dolor nisi!
        </Pworkoutsadded>
      </Contenedornoty>{" "}
    </Contenedormain>
  );
}
