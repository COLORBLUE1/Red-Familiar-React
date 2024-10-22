import { useNavigate } from "react-router-dom";
import { Logo } from "./const.ts";
import "../assets/style/css/Font.css";
import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 
import {
  Img,
  Contenedoricon,
  Contenedortwe,
  LoginGF,
  TextField,
  Contenedorinput,
  Boton,
} from "../assets/style/stylecomponets/styled.js";
import { onAuthStateChanged } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import {
  facebookLogin,
  googleLogin,
  setUser,
  mailLogin,
} from "../redux/slices/userSlice.js";
import { useDispatch } from "react-redux";
import { auth } from "../firebase/firebaseConfig.js";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import styled from "styled-components";

export const Contenedorlogin = styled.div`
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
  email: Yup.string()
    .email("Correo incorrecto")
    .required("Correo es requerido"),
  password: Yup.string()
    .min(6, "La contraseña debe tener minimo 6 caracteres")
    .required("Contraseña es requerida"),
});

export function Singing() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await mailLogin(values.email, values.password);
      dispatch(setUser(response));
      toast.success("¡Inicio de sesión exitoso!"); // Agrega esta línea
      navigate("/home");
    } catch (error) {
      setErrors({ email: "Correo o contraseña incorrectos" });
    } finally {
      setSubmitting(false);
    }
  };

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
          break;
      }

      if (user) {
        dispatch(setUser(user));
        navigate("/home"); // Redirige a /home después del login
      }
    } catch (error) {
      console.error("Error during social login", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          setUser({
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            isAuthenticated: true,
          })
        );
        navigate("/home"); // Redirige a /home si el usuario ya está autenticado
      }
    });

    return () => unsubscribe(); // Limpia la suscripción al desmontar el componente
  }, [dispatch, navigate]);

  return (
    <Contenedorlogin>
      <Contenedoricon>
        <Img
          className="animate__animated animate__fadeInDown"
          src={Logo}
          alt="logo de la app"
        />
        <Contenedorinput>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
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
                <Field
                  as={TextField}
                  style={{ margin: 10 }}
                  type="email"
                  name="email"
                  placeholder="Email"
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
                <Field
                  as={TextField}
                  style={{ margin: 10 }}
                  type="password"
                  name="password"
                  placeholder="Password"
                />

                <Boton type="submit" disabled={isSubmitting}>
                  Comenzar
                </Boton>
              </Form>
            )}
          </Formik>
        </Contenedorinput>
        <ToastContainer /> 
      </Contenedoricon>
      <Contenedortwe>
        <LoginGF>
          <h4>Iniciar con</h4>
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
      <h4>
        ¿No tienes cuenta? <Link to={"/signun"}>Registrarse</Link>
      </h4>
    </Contenedorlogin>
  );
}
