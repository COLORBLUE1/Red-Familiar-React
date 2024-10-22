import { Sectionhome } from "../../assets/style/stylecomponets/styled";
import { NavBarDef } from "./NavBarDef";
import Cards from "../Blocks/Cards_all";
import "animate.css";

import { motion, AnimatePresence } from 'framer-motion';



export function Main() {

  return (
    <>
      <Sectionhome>
            <Cards />
            <NavBarDef />
      </Sectionhome>
    </>
  );
}
