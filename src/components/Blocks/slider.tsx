import Button from "@mui/material/Button";
import styled from "styled-components";
import { imgpruebas } from "../const.ts";

export const Contenedorsroll = styled.div`
  overflow: hidden;
  overflow-x: scroll;
  padding: 30px;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Contenedormainsroll = styled.div`
  display: grid !important;
  padding: 30px;
  div {
    display: flex;
    gap: 10px;
  }
`;
export const Opcionmain = styled.div`
      display: flex;
    gap: 10px;
    justify-content: center;
        background: #2e3562;
        border-radius: 50px;
  }
`;
export const Cardslider = styled.div`
      display: grid !important;
      grid-template-columns: 65% 35%;

    div{
        display: grid !important;
           justify-items: start;
      h4{
      margin: 0;
      font-size: 20px;
      }
      p{
      font-size: 12px;
      text-align: left;
       margin: 0;
      }
  }

  div img{
  width: 70px;
    height: 100%;
  }
}
`;

export const Carrusel = () => {
  return (
    <Contenedormainsroll>
      <Contenedorsroll className="animate__animated animate__pulse">
        <Button
          variant="contained"
          sx={{
            minWidth: 320,
            lineHeight: 1,
            height: 200,
            background: "#2E3562",
            borderRadius: 10,
          }}
          disableElevation
        >
          <Cardslider>
            <div>
              <h4>Warm up</h4>
              <p>Before training, be sure to warm up, give it 5 - 10 minutes</p>
            </div>
            <div>
              <img src="https://res.cloudinary.com/dehpi4905/image/upload/v1726020590/Buffalo%20app/Extra/prbvakdyqe9iavktr7n2.png" alt="" />
            </div>
          </Cardslider>
        </Button>
        <Button
          variant="contained"
          sx={{
            minWidth: 320,
            lineHeight: 1,
            height: 200,
            background: "#2E3562",
            borderRadius: 10,
          }}
          disableElevation
        >
          <Cardslider>
            <div>
              <h4>Warm up</h4>
              <p>Before training, be sure to warm up, give it 5 - 10 minutes</p>
            </div>
            <div>
              <img src="https://res.cloudinary.com/dehpi4905/image/upload/v1726020590/Buffalo%20app/Extra/prbvakdyqe9iavktr7n2.png" alt="" />
            </div>
          </Cardslider>
        </Button>
        <Button
          variant="contained"
          sx={{
            minWidth: 320,
            lineHeight: 1,
            height: 200,
            background: "#2E3562",
            borderRadius: 10,
          }}
          disableElevation
        >
          <Cardslider>
            <div>
              <h4>Warm up</h4>
              <p>Before training, be sure to warm up, give it 5 - 10 minutes</p>
            </div>
            <div>
              <img src="https://res.cloudinary.com/dehpi4905/image/upload/v1726020590/Buffalo%20app/Extra/prbvakdyqe9iavktr7n2.png" alt="" />
            </div>
          </Cardslider>
        </Button>
      </Contenedorsroll>
    </Contenedormainsroll>
  );
};
