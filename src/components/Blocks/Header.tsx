import { AiOutlineLeft } from "react-icons/ai";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Contenedorheaderadd = styled.div`
  background: linear-gradient(180deg, #0000002e, #00000000);
  display: flex;
  align-items: center;
   width: clamp(25rem, 16.071rem + 23.81vw, 37.5rem);
  justify-content: center;
  margin-bottom: 20px;
  position: absolute;
`;

const Volver = styled.div`
  position: absolute;
  left: 40px;
`;

export function Header({ volver, app }) {
  return (
    <Contenedorheaderadd>
      <Volver>
        <Link to={volver}>
          <AiOutlineLeft style={{ color: "#fff" }} />
        </Link>
      </Volver>
      <div>
        <h4 style={{ color: "#fff" }}>{app}</h4>
      </div>
    </Contenedorheaderadd>
  );
}
