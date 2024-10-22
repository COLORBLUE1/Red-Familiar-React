import { Link, useNavigate } from "react-router-dom"; // Importa useNavigate
import { Logo } from "../../const";
import styled from "styled-components";
import { useEffect, useState } from "react";

const Contenedor = styled.div`
  display: flex;
  justify-content: center;
`;

const Contenedorheader = styled.nav`
  margin-top: 40px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: #fff;
  width: 100%;
  position: fixed;
  z-index: 999;
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(5px);

  div {
    display: flex;
    gap: 10px;
    align-items: center;
    img {
      width: 40px;
      height: 40px;
    }
    p {
      color: #000;
      font-family: Roboto;
    }
  }

  ul {
    display: flex;
    gap: 20px;
    align-items: center;

    li {
      color: #000;
      font-family: Roboto;
      padding: 6px;

      a {
        text-decoration: none;
        color: #000;
      }
    }

    .ingresarButon {
      background: #aba5ff6e;
      border-radius: 10px;
      transition: all 0.5s linear;
      width: 90px;
      padding: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: none;
      cursor: pointer; // Añadir cursor para mejor experiencia
      color: #fff;
      a {
        text-decoration: none;
        color: #fff;
      }
    }

    .ingresarButon:active {
      background: #aba5ff;
    }
  }

  .hamburger {
    display: none;
    flex-direction: column;
    cursor: pointer;

    div {
      width: 30px;
      height: 4px;
      background: #000;
      margin: 4px 0;
    }
  }

  @media (max-width: 768px) {
    width: 20%;
    z-index: 888;

    .hamburger {
      display: flex;
      position: absolute;
      left: 120px;
    }

    ul {
      display: none; /* Oculta la lista de navegación por defecto */
    }
  }
`;

const Menu = styled.ul`
  position: fixed;
  top: 0;
  right: 0;
  width: 50%;
  height: 100%;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(5px);
  padding: 20px;
  transition: transform 0.3s ease;
  transform: translateX(100%); // Menú oculto inicialmente
  z-index: 998;

  &.open {
    transform: translateX(0); // Muestra el menú
  }

  li {
    color: #000;
    font-family: Roboto;
    padding: 10px 0;

    a {
      text-decoration: none;
      color: #000;
    }
  }

  .ingresarButon {
    background: #aba5ff6e;
    border-radius: 10px;
    transition: all 0.5s linear;
    width: 90px;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    color: #fff;
    a {
      text-decoration: none;
      color: #fff;
    }
  }

  .ingresarButon:active {
    background: #aba5ff;
  }
`;

const Headerlanding = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navigate = useNavigate(); // Usar useNavigate para redirección

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsOpen(false); // Cierra el menú al cambiar a vista de escritorio
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleIngresarClick = () => {
    navigate("/map"); // Navegar a la ruta "/map"
  };

  return (
    <Contenedor>
      <Contenedorheader>
        <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div>
          <img src={Logo} alt="" />
          <p>J&C</p>
        </div>
        {/* Menú normal en desktop */}
        {!isMobile && (
          <ul>
            <li>
              <a href="#inicial">Home</a>
            </li>
            <li>
              <a href="#hacer">Perfil</a>
            </li>
            <li>
              <a href="#nosotros">Sobre nosotros</a>
            </li>
            <li>
              <button
                className="ingresarButon"
                type="button"
                onClick={handleIngresarClick}
              >
                Ingresar
              </button>
            </li>
          </ul>
        )}
      </Contenedorheader>
      {isMobile && (
        <>
          <Menu className={isOpen ? "open" : ""}>
            <li>
              <a href="#inicial">Home</a>
            </li>
            <li>
              <a href="#hacer">Perfil</a>
            </li>
            <li>
              <a href="#nosotros">Sobre nosotros</a>
            </li>
            <li>
              <button
                className="ingresarButon"
                type="button"
                onClick={handleIngresarClick}
              >
                Ingresar
              </button>
            </li>
          </Menu>
          {isOpen && (
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "rgba(0, 0, 0, 0.5)",
                zIndex: 997,
              }}
              onClick={() => setIsOpen(false)}
            />
          )}
        </>
      )}
    </Contenedor>
  );
};

export default Headerlanding;
