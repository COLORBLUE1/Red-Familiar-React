import styled from "styled-components";
import { readAsync, setExercises } from "../../redux/slices/Post_users";
import { useDispatch, useSelector } from "react-redux";
import { Cards } from "./Cards_all";
import { useEffect, useState } from "react";
import { Boton } from "../../assets/style/stylecomponets/styled";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";

async function refreshStore(dispatch) {
  console.log("Actualizando");
  const response = await readAsync();
  dispatch(setExercises(response));
}

const handleClick = (value, setSelectedValue, setShowCreateButton) => {
  // Aquí puedes hacer lo que necesites con el valor
  console.log("Valor del botón:", value);
  setSelectedValue(value);
  if (value === "Myexercises") {
    setShowCreateButton(true); // Muestra el botón para crear ejercicios
  } else {
    setShowCreateButton(false); // Oculta el botón para crear ejercicios
  }
};

export const Contenedorsroll = styled.div`
  margin: 10px;
  display: flex;
  overflow: hidden;
  overflow-x: scroll;
  width: 70vw;
  padding: 30px;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Contenedormainsroll = styled.div`
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
`;

export const Botoncrearcontent = styled.div`
  display: flex;
  justify-content: center;
`;

export const Menuscroll = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = useState("exercises");
  const [showCreateButton, setShowCreateButton] = useState(false);

  // Llama a refreshStore cuando el componente se monta
  useEffect(() => {
    refreshStore(dispatch);
  }, [dispatch]);

  return (
    <section>
      <Contenedormainsroll>
        <Opcionmain>
          <Button
            variant="contained"
            sx={{
              minWidth: 150,
              lineHeight: 1,
              height: 40,
              background: "#2E3562",
              borderRadius: 10,
            }}
            disableElevation
            onClick={() =>
              handleClick("exercises", setSelectedValue, setShowCreateButton)
            }
          >
            Discover
          </Button>

          <Button
            variant="contained"
            sx={{
              minWidth: 150,
              lineHeight: 1,
              height: 40,
              background: "#2E3562",
              borderRadius: 10,
              color: "gray",
            }}
            disableElevation
            onClick={() =>
              handleClick("Myexercises", setSelectedValue, setShowCreateButton)
            }
          >
            My workouts
          </Button>
        </Opcionmain>

        <Contenedorsroll className="animate__animated animate__bounceIn">
          <Button
            variant="contained"
            sx={{
              minWidth: 110,
              lineHeight: 1,
              height: 25,
              background: "#2E3562",
              borderRadius: 10,
            }}
            disableElevation
            onClick={() =>
              handleClick("exercises", setSelectedValue, setShowCreateButton)
            }
          >
            All body
          </Button>

          <Button
            variant="contained"
            sx={{
              minWidth: 80,
              lineHeight: 1,
              height: 25,
              background: "#2E3562",
              borderRadius: 10,
              color: "gray",
            }}
            disableElevation
            onClick={() =>
              handleClick("Triceps", setSelectedValue, setShowCreateButton)
            }
          >
            Triceps
          </Button>
          <Button
            variant="contained"
            sx={{
              minWidth: 80,
              lineHeight: 1,
              height: 25,
              background: "#2E3562",
              borderRadius: 10,
              color: "gray",
            }}
            disableElevation
            onClick={() =>
              handleClick("Biceps", setSelectedValue, setShowCreateButton)
            }
          >
            Biceps
          </Button>
          <Button
            variant="contained"
            sx={{
              minWidth: 80,
              lineHeight: 1,
              height: 25,
              background: "#2E3562",
              borderRadius: 10,
              color: "gray",
            }}
            disableElevation
            onClick={() =>
              handleClick("Breast", setSelectedValue, setShowCreateButton)
            }
          >
            Breast
          </Button>
          <Button
            variant="contained"
            sx={{
              minWidth: 80,
              lineHeight: 1,
              height: 25,
              background: "#2E3562",
              borderRadius: 10,
              color: "gray",
            }}
            onClick={() =>
              handleClick("Back", setSelectedValue, setShowCreateButton)
            }
            disableElevation
          >
            Back
          </Button>
          <Button
            variant="contained"
            sx={{
              minWidth: 80,
              lineHeight: 1,
              height: 25,
              background: "#2E3562",
              borderRadius: 10,
              color: "gray",
            }}
            onClick={() =>
              handleClick("Legs", setSelectedValue, setShowCreateButton)
            }
            disableElevation
          >
            Legs
          </Button>
        </Contenedorsroll>
      </Contenedormainsroll>

      <Cards musculo={selectedValue} refreshStore={refreshStore} />

      {/* Aquí está el botón para crear ejercicios */}
      {showCreateButton && (
        <Botoncrearcontent>
          <Boton
            class="animate__animated animate__backInUp"
            variant="contained"
            sx={{
              minWidth: 300,
              lineHeight: 1,
              height: 40,
              background: "#2E3562",
              borderRadius: 10,
            }}
            disableElevation
            onClick={() => {
              navigate("/createexersices");
            }}
          >
            Create new workout
          </Boton>
        </Botoncrearcontent>
      )}
    </section>
  );
};
