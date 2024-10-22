import { Header } from "../Blocks/Header";
import { imgpruebas } from "../const";
import { Avatar } from "@mui/material";
import styled from "styled-components";
import { NavBarDef } from "../Home/NavBarDef";
import ImageGallery from "../Blocks/ImageGallery";
import { Link } from "react-router-dom";
//import { Boton } from "../../assets/style/stylecomponets/styled.js";

export const Boton = styled.button`
  width: 250px;
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
  color: white;
`;

const Sectioncontenido = styled.section`
    
width: 100%;
          height: auto;
          background: #ffffff85;
          border-radius: 25px 25px 0 0;


 nav ul{
     display: flex;
    width: 100%;
    gap: 50px;
    align-items: center;
    justify-content: center;
    padding: 0;

    li{
    margin: 20px 0;
    cursor:pointer;
    color: white;
    }
 }
  }
`;

const Contenedoruser = styled.div`
    display: grid;
    grid-template-columns: 50% 50%;
  }
  div:nth-first-child{
  display: flex;
  }
`;

const Contenedorall = styled.section`
   height: 100vh;
  overflow-y: auto;
    background: #6CE5E8;
        width: clamp(25rem, 16.071rem + 23.81vw, 37.5rem);
        margin: auto;

        
  &::-webkit-scrollbar {
    width:0;
  }
  }

`;
const Contenedorbotones = styled.div`
  gap: 20px;
    display: flex;
  }

`;

const Follow = styled.div`
display: flex;
    justify-content: center;
    gap: 10px;

    div{
    display: grid;
    justify-items: center;
    strong{
    color: #fff;
    }
    
    p{
    margin: 0;
    color: gray;
    }
    }
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
    strong{
    }
    
    p{
    margin: 0;
    color: gray;
    }
    }
  }
`;

/* active 

    background: gray;
    padding: 10px;
    border-radius: 20px;
    width: 50px;
*/

const PerfilUsers = () => {
  return (
    <Contenedorall>
      <section style={{ width: "100%", height: 150, overflow: "hidden" }}>
        <Header volver="/home" app="Perfil" />
        <img
          style={{ width: "100%", height: 150, objectFit: "cover" }}
          src={imgpruebas}
          alt=""
        />
      </section>
      <section style={{ padding: 20 }}>
        <Contenedoruser>
          <Avataruser>
            <div>
              {/* Perfil, nombre, descripcion */}
              <Avatar
                alt="Remy Sharp"
                src={imgpruebas}
                sx={{ width: 56, height: 56 }}
              />
            </div>
            <div>
              <strong>User</strong>
              <p>Descripcion</p>
            </div>
          </Avataruser>
          {/* Seguidores */}
          <Follow>
            <div>
              <strong>Followers</strong>
              <p>15615 M</p>
            </div>
            <div>
              <strong>Follow</strong>
              <p>15615 M</p>
            </div>
          </Follow>
          {/* Botones */}
        </Contenedoruser>
        <Contenedorbotones>
          <Link to="/cuenta">
            <Boton>Editar perfil</Boton>
          </Link>
          <Link to="/cuenta">
            <Boton>Compartir perfil</Boton>
          </Link>
        </Contenedorbotones>
      </section>
      <Sectioncontenido>
        <div>
          <nav>
            <ul>
              <li>Fotos</li>
              <li>Videos</li>
              <li>Albumes</li>
            </ul>
          </nav>
          <ImageGallery />
        </div>
      </Sectioncontenido>
      <NavBarDef />
    </Contenedorall>
  );
};

export default Perfil;
