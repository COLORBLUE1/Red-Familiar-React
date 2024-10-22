import styled from "styled-components";

const Contenedorfooter = styled.section`
    height: 200px;
    display: flex;
    align-items: center;
    color: #000;
    padding: 10px;
    background-color: #f5f5f5;
  
  a {
    color: #5b82ff;
    text-decoration: none;
  }

  a:hover {
    color: gray;
    text-decoration: none;
  }

  div {
    display: grid;
    width: 100%;
    justify-items: center;
    align-items: center;
    h4 {
      display: grid;
      justify-items: center;
    }

    p {
      color: gray;
      text-align: center;
    }
  }
`;

const Footer = () => {
  return (
    <Contenedorfooter>
      <div>
        <h4>2024</h4>
        <a href=" https://agileinnova.org/">@Angile Innova</a>
      </div>

      <div>
        <h4>Desarrollo y diseño</h4>
        <p>
          Tu privacidad es nuestra prioridad. Al utilizar nuestro sitio, aceptas
          nuestras políticas de privacidad y el uso de cookies. Consulta
          nuestras políticas para más detalles sobre cómo protegemos tu
          información.
        </p>
      </div>
    </Contenedorfooter>
  );
};

export default Footer;
