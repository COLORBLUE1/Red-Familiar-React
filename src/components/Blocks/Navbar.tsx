import { BiSolidBellRing } from "react-icons/bi";

import {
  Noty,
  Perfilcontenedor,
} from "../../assets/style/stylecomponets/styled";
import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import { useState } from "react";
import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

const useOnClickOutside = (ref, handler) => {
  React.useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) return;
      handler(event);
    };
    document.addEventListener("mousedown", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [ref, handler]);
};

export function Navbar() {
  const user = useSelector((store) => store.user);

  const [open, setOpen] = React.useState(false);
  const node = React.useRef();
  useOnClickOutside(node, () => setOpen(false));

  return (
    <Perfilcontenedor>
      <div ref={node}>
        <Burger open={open} setOpen={setOpen} />
        <Menu open={open} setOpen={setOpen} />
      </div>

      <div>
        <h4>Hi!</h4>
        <p>{user?.displayName || "Usuario"}</p>
      </div>
      <Noty>
        <BiSolidBellRing />
      </Noty>
    </Perfilcontenedor>
  );
}
