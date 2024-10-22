import { Logo } from "./const.ts";
import React from "react";
import {
  facebookLogin,
  googleLogin,
  mailRegister,
  setUser,
  checkUserAuth,
} from "../redux/slices/userSlice.js";
import {
  Contenedormain,
  Img,
  Contenedoricon,
  Contenedortwe,
  LoginGF,
  TextField,
  Boton,
  Contenedorinput,
} from "../assets/style/stylecomponets/styled.js";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export const Contenedorsinun = styled.div`
    background: rgba(255, 255, 255, .25);
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);
  border: 1.5px solid rgba(209, 213, 219, 0.3);
  display: grid;
  justify-items: center;
  width: clamp(25rem, 16.071rem + 23.81vw, 37.5rem);
  font-family: Roboto;
  border-radius:20px;
  color: #ffffff7d;
  margin: 0 auto;
  margin-top:40px;
  height: auto;
  overflow-y: auto;

  &::-webkit-scrollbar {
  width:0;
`;

// Define el esquema de validación con Yup
const validationSchema = Yup.object({
  name: Yup.string().required("Nombre completo es requerido"),
  email: Yup.string()
    .email("Correo incorrecto")
    .required("Correo es requerido"),
  password: Yup.string()
    .min(6, "La contraseña debe tener mínimo 6 caracteres")
    .required("Contraseña es requerida"),
});

export function Signun() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Estado para manejar errores de formulario
  const [formError, setFormError] = React.useState("");

  // Selector para verificar si el usuario está autenticado
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  // Efecto para redirigir si el usuario ya está autenticado
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    } else {
      dispatch(checkUserAuth()); // Verifica el estado de autenticación
    }
  }, [isAuthenticated, navigate, dispatch]);

  // Función que maneja el envío del formulario
  const handleSubmit = async (values, { resetForm }) => {
    setFormError(""); // Limpiar errores previos
    try {
      const response = await mailRegister(values);
      dispatch(setUser(response));
      resetForm();
      navigate("/home"); // Redirige a /home después del registro
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
      setFormError(error.message); // Mostrar el mensaje de error en el estado
    }
  };

  // Función para manejar el inicio de sesión con redes sociales
  const handleAuth = async (provider) => {
    try {
      let user;
      switch (provider) {
        case "Google":
          user = await googleLogin();
          break;
        case "Facebook":
          user = await facebookLogin();
          break;
        default:
          throw new Error("Proveedor no soportado");
      }

      if (user) {
        dispatch(setUser(user));
        navigate("/home"); // Redirige a /home después del login
      }
    } catch (error) {
      if (error.code === "auth/popup-closed-by-user") {
        setFormError(
          "El proceso de inicio de sesión fue cancelado. Por favor, intente de nuevo."
        );
      } else if (error.code === "auth/network-request-failed") {
        setFormError(
          "Hubo un problema con la conexión de red. Por favor, verifique su conexión a Internet e intente de nuevo."
        );
      } else {
        console.error("Error al iniciar sesión:", error);
        setFormError("Ocurrió un error. Por favor, intente de nuevo.");
      }
    }
  };

  return (
    <Contenedorsinun>
      <Contenedoricon>
        <Img src={Logo} alt="logo de la app" />
        <Formik
          initialValues={{ name: "", email: "", photoURL: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              <Contenedorinput>
                <div>
                  <Field
                    as={TextField}
                    type="text"
                    name="name"
                    placeholder="Ingrese nombre *"
                  />
                  <ErrorMessage
                    style={{
                      color: "#ff000069",
                      fontWeight: "800",
                      textAlign: "left",
                      marginTop: 10,
                      marginLeft: 20,
                    }}
                    name="name"
                    component="div"
                  />
                </div>
                <div>
                  <Field
                    as={TextField}
                    type="email"
                    name="email"
                    placeholder="Ingrese correo *"
                  />
                  <ErrorMessage
                    style={{
                      color: "#ff000069",
                      fontWeight: "800",
                      textAlign: "left",
                      marginTop: 10,
                      marginLeft: 20,
                    }}
                    name="email"
                    component="div"
                  />
                </div>
                <div>
                  <Field
                    as={TextField}
                    type="text"
                    name="photoURL"
                    placeholder="Ingrese una url de imagen"
                  />
                  <ErrorMessage
                    style={{
                      color: "#ff000069",
                      fontWeight: "800",
                      textAlign: "left",
                      marginTop: 10,
                      marginLeft: 20,
                    }}
                    name="photoURL"
                    component="div"
                  />
                </div>
                <div>
                  <Field
                    as={TextField}
                    type="password"
                    name="password"
                    placeholder="Ingrese su contraseña *"
                  />
                  <ErrorMessage
                    style={{
                      color: "#ff000069",
                      fontWeight: "800",
                      textAlign: "left",
                      marginTop: 10,
                      marginLeft: 20,
                    }}
                    name="password"
                    component="div"
                  />
                </div>
                {formError && <div style={{ color: "red" }}>{formError}</div>}
                <Boton type="submit">Registrarme</Boton>
              </Contenedorinput>
            </Form>
          )}
        </Formik>
      </Contenedoricon>
      <Contenedortwe>
        <LoginGF>
          <h4>O Regístrate con</h4>
          <div>
            <Button onClick={() => handleAuth("Google")}>
              <FcGoogle style={{ width: 40, height: 50 }} />
            </Button>
            <Button onClick={() => handleAuth("Facebook")}>
              <FaFacebook style={{ width: 40, height: 50, color: "#0863f7" }} />
            </Button>
          </div>
        </LoginGF>
      </Contenedortwe>
    </Contenedorsinun>
  );
}
