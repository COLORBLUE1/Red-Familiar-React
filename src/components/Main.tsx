import { TbBackground } from "react-icons/tb";
import { Contenedormain } from "../assets/style/stylecomponets/styled.js";
import { Home } from "./Home.js";
import { NavBarDef } from "./Home/NavBarDef.js";

export function Main() {
  return (
    <Contenedormain>
      <Home />
    </Contenedormain>
  );
}
