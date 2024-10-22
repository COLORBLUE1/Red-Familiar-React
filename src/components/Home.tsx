import { Button } from "@mui/material";
import { Contenedormain } from "../assets/style/stylecomponets/styled.js";
import { Main } from "./Home/Main";
import { posts } from "../assets/File/Data.js";
import {
  createAsync,
  readAsync,
  setExercises,
} from "../redux/slices/Post_users.js";
import { NavBarDef } from "./Home/NavBarDef.js";

export function Home() {
  //Agragar collecion a base de datos

  //  async function add() {
  //   posts.forEach(async (posts) => {
  //      await createAsync(posts);
  //    });
  //  }

  return (
    <Contenedormain>
      {/* Cntenedor del contenido del home */}
  
      <Main />
     {/* Agregar collecion
      <Button onClick={add}>Agregar</Button>*/}
    </Contenedormain>
  );
}
