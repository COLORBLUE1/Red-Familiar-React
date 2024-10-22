import { BG, imgpruebas, Logo, pantalla1, pantalla2 } from "../const.ts";
import Headerlanding from "./components/Headerlanding.tsx";
import Footer from "./components/Footer.tsx";
import styled from "styled-components";
import "animate.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { Img, Splasconten } from "../../assets/style/stylecomponets/styled.js";

const Pantalla = styled.section`
  background: #fff;
  background-size: cover;
  display: grid;
  align-items: center;
  justify-content: center;
`;

const ContenidoInicial = styled.section`
  margin-top: 200px;
  height: 500px;
  padding: 30px;
  text-align: center;

  span {
    color: aqua;
  }

  h1 {
    margin: auto;
    margin-bottom: 0;
    font-width: 800;
    font-size: clamp(1.875rem, -3.482rem + 14.286vw, 9.375rem);
    color: #000;
  }

  h2 {
    color: #363636;
    margin-top: 0;
    font-size: 20px;
    font-width: 600;
    font-family: Roboto;
  }

  p {
    margin: auto;
    width: clamp(21.875rem, 10.714rem + 29.762vw, 37.5rem);
    text-align: center;
    color: #363636;
  }
`;

const Contenidodos = styled.section`
  padding: 30px;
  max-width: 70vw;
  margin: 150px auto;
  div {
    margin: 30px;
    display: flex;
    figure {
      img {
        width: 200px;
        height: 400px;
      }
    }
    p {
    }
    div {
      display: block;
      items-aling: center;
      width: 40%;
      margin: auto;
      h3 {
        color: #000;
        font-size: 25px;
      }
      p {
        margin: 0;
        color: #747474;
      }
    }
  }

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;

    div {
      flex-wrap: wrap;
      text-align: center;
    }

    div h3 {
      font-size: 10px;
    }
    div p {
      font-size: 15px;
    }
  }
`;
const Contenidotres = styled.section`
  background: #f3ffff;
  backdrop-filter: blur(5px);
  border: 1.5px solid rgba(209, 213, 219, 0.3);
  padding: 30px;
  max-width: 70vw;
  margin: 200px auto;
  border-radius: 80px;
  display: flex;
  justify-content: center;
  div {
    display: flex;
    margin: 30px;
    flex-wrap: wrap;
    figure {
      img {
        width: 200px;
        height: 200px;
        border-radius: 50%;
      }
    }
    p {
      color: #0000008f;
    }
    div {
      display: block;
      items-aling: center;
      width: 40%;
      margin: auto;
      h3 {
        color: #000;
      }
      p {
        margin: 0;
      }
    }
  }

  @media (max-width: 768px) {
    div {
      flex-wrap: wrap;
      text-align: center;
    }
  }
`;

const Contenidocuarto = styled.section`
  display: flex;
  padding: 30px;
  max-width: 70vw;
  margin: auto;
  flex-wrap: wrap;
  border-radius: 5%;
  div {
    margin: 30px;
    display: flex;
    items-aling: center;
    figure {
      display: grid;
      gap: 20px;
      justify-items: center;

      h3 {
        color: #000;
        margin: 0;
      }
      p {
        margin: 0;
        color: #0000008f;
      }
      img {
        width: 200px;
        height: 200px;
        border-radius: 50%;
      }
    }
    div {
      display: flex;
      items-aling: center;
      width: 40%;
      margin: auto;
      p {
        margin: 0;
      }
    }
  }

  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
  }
`;
const Contenidoadicional = styled.section`
  display: flex;
  padding: 30px;
  max-width: 70vw;
  margin: 200px auto;
  border-radius: 5%;
 
    justify-content: center;
  
      img {
        width: 400px;
        height: 400px;
      }
    
  }



`;
const Span = styled.span`
width: 100%;
margin:auto;

h2{
color:#898989;
text-align:center;
font-size: 30px;
}
  }
`;
export const Landing = () => {
  /* Inicializamos animaciones de scroll con AOS */
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <Pantalla>
      <Headerlanding />
      <ContenidoInicial>
        <h1 className="animate__animated animate__fadeInDown" id="inicial">
          <span className="animate__animated animate__fadeIn">J</span>untos{" "}
          <span className="animate__animated animate__fadeIn"> & </span>{" "}
          <span className="animate__animated animate__fadeIn">C</span>
          ompartiendo
        </h1>
        <h2 className="animate__animated animate__fadeInUp">
          Red <span>Familiar</span>
        </h2>
        <p className="animate__animated animate__fadeInDown">
          ¡Bienvenido a nuestra red familiar! Con nuestra app, podrás mantenerte
          conectado con tus seres queridos de manera segura y sencilla. Disfruta
          de la geolocalización en tiempo real, que te permitirá saber dónde se
          encuentran tus familiares en cualquier momento. Comparte fotos,
          noticias y momentos especiales en un espacio privado solo para tu
          familia.
        </p>
      </ContenidoInicial>
      <Contenidodos>
        <div>
          <figure data-aos="fade-right">
            <img
              className="animate__animated animate__fadeInUp"
              src={pantalla1}
              alt=""
            />
          </figure>
          <div data-aos="fade-up">
            <h3>Reacciona a fotos de seres queridos</h3>
            <p>
              reacciona a las fotos de tus seres queridos. Expresa tus emociones
              con un simple gesto y hazles saber lo mucho que significan para
              ti, donde quiera que estés.
            </p>
          </div>
        </div>
        <div>
          <div data-aos="fade-down">
            <h3>Disfruta publicar tus momentos más especiales</h3>
            <p>
              Cada recuerdo merece ser contado, y ahora puedes hacerlo de una
              forma sencilla y única. Captura la magia, publica y permite que
              los demás se sumen a tu alegría."
            </p>
          </div>
          <figure data-aos="fade-left">
            <img src={pantalla2} alt="" />
          </figure>
        </div>
      </Contenidodos>
      <Contenidotres id="hacer">
        <div>
          <figure data-aos="fade-right">
            <img
              className="animate__animated animate__fadeInUp"
              src="https://i.postimg.cc/HntT2xgP/map.png"
              alt=""
            />
          </figure>
          <div data-aos="fade-up">
            <h3>Puedes ver la ubicación de tus seres queridos</h3>
            <p>
              Ahora puedes ver la ubicación de tus seres queridos en tiempo
              real, brindándote tranquilidad y conexión, sin importar la
              distancia."
            </p>
          </div>
        </div>
      </Contenidotres>
      <Span data-aos="fade-up">
        <h2>Desarrolladores</h2>
      </Span>
      <Contenidocuarto id="nosotros">
        <div>
          <div data-aos="fade-up"></div>
          <figure data-aos="fade-right">
            <a href="https://github.com/josephRodriri/" target="_blank">
              <img
                className="animate__animated animate__fadeInUp"
                src="https://res.cloudinary.com/dehpi4905/image/upload/v1728453062/J-C/nju9cb6obzg6wujva5o0.png"
                alt=""
              />
            </a>
            <h3>Joseph Rodriguez</h3>
            <p>Desarrollador web</p>
          </figure>
        </div>
        <div>
          <div data-aos="fade-up"></div>
          <figure data-aos="fade-right">
            <a href="https://portafolio-v2-three.vercel.app/" target="_blank">
              {" "}
              <img
                className="animate__animated animate__fadeInUp"
                src="https://avatars.githubusercontent.com/u/106413561?s=400&u=a6b3cbd811ee9c6e211750fc25395125086b44af&v=4"
                alt=""
              />
            </a>
            <h3>Camilo Sol</h3>
            <p>Desarrollador web</p>
          </figure>
        </div>
      </Contenidocuarto>

      <Contenidoadicional>
        <img
          className="animate__animated animate__pulse"
          src={Logo}
          alt="Logo"
        />
      </Contenidoadicional>
      <Footer />
    </Pantalla>
  );
};
