import {
  Sectionhome,
  Option,
  Contenedormenucuenta,
} from "../../assets/style/stylecomponets/styled";
import { Avatar } from "@mui/material";
import styled from "styled-components";
import { firestore, storage } from "../../firebase/firebaseConfig"; // Asegúrate de importar tu configuración de firestore y storage
import {
  query,
  where,
  getDocs,
  collection,
  updateDoc,
  doc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { imgpruebas } from "../const";
import { logout } from "../../redux/slices/userSlice.js";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Importa las funciones adecuadas de Firebase Storage
import Snackbar from "@mui/material/Snackbar"; // Importa Snackbar
import MuiAlert from "@mui/material/Alert"; // Importa Alert
import React from "react";
import { Header } from "../Blocks/Header.js";
import { useNavigate } from "react-router-dom";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const Datosusuario = styled.div`
  display: grid;
  justify-items: center;
  margin-top: 100px;
  margin-bottom: 50px;
`;

export const Boton1 = styled.button`
  width: clamp(20rem, 16rem + 18vw, 37.5rem);
  height: 50px;
  font-size: clamp(1.25rem, 0.804rem + 1.19vw, 1.875rem);
  text-align: center;
  padding: 10px;
  background-color: #20ce27;
  border: none;
  border-radius: 10px;
  color: #fff;
  cursor: pointer;
  margin: auto;
  margin-bottom: 20px;
  margin-top: 20px;
  transition: all 0.3s ease-in-out;
`;

export const Boton2 = styled.button`
  width: 50%;
  height: 50px;
  font-size: clamp(1.25rem, 0.804rem + 1.19vw, 1.875rem);
  text-align: center;
  padding: 10px;
  background-color: #c87272;
  border: none;
  border-radius: 10px;
  color: #fff;
  cursor: pointer;
  margin: auto;
  margin-bottom: 20px;
  margin-top: 150px;
  transition: all 0.3s ease-in-out;
`;

export function Ajustecuenta() {
  const [userProfile, setUserProfile] = useState(null);
  const [activeItem, setActiveItem] = useState("Fotos");
  const [editableProfile, setEditableProfile] = useState({});
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [file, setFile] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false); // Estado para controlar Snackbar
  const userLocation = JSON.parse(localStorage.getItem("userLocation"));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const email = userData.email;
      const usersRef = collection(firestore, "users");
      const q = query(usersRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        setUserProfile(userData);
        setEditableProfile(userData); // Inicializa el perfil editable
      } else {
        console.log("No such user!");
      }
    };

    fetchUserProfile();
  }, [userData.email]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleUpdateProfile = async () => {
    const email = userData.email;
    const usersRef = collection(firestore, "users");
    const q = query(usersRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0].id; // Obtiene el ID del documento
      const userRef = doc(firestore, "users", userDoc);

      // Si se ha seleccionado un archivo, subirlo y obtener la URL
      if (file) {
        const uploadResult = await uploadImage(file);
        editableProfile.profilePic = uploadResult; // Asigna la URL del archivo
      }

      await updateDoc(userRef, editableProfile);
      console.log("Perfil actualizado exitosamente.");
      setUserProfile(editableProfile); // Actualiza el estado con los nuevos datos
      setOpenSnackbar(true); // Abre el Snackbar
    }
  };

  const uploadImage = async (file) => {
    const storageRef = ref(storage, `profilePictures/${file.name}`); // Cambiado a la nueva forma de referencia
    await uploadBytes(storageRef, file); // Subir el archivo
    const downloadURL = await getDownloadURL(storageRef); // Obtener la URL de descarga
    return downloadURL;
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleItemClick = (item) => {
    setActiveItem(item);
  };
  const Salir = () => {
    logout();
    navigate("/landing");
    console.log("voy sliendo");
  };

  return (
    <Sectionhome>
      <Header volver="/perfil" app="Editar cuenta" />
      <Datosusuario>
        <Avatar
          alt="Remy Sharp"
          src={userProfile?.profilePic || imgpruebas}
          sx={{ width: 60, height: 60, marginBottom: 5 }}
        />
        <Contenedormenucuenta>
          <label htmlFor="Nombre">Nombre</label>
          <Option
            name="name"
            value={editableProfile.name || ""}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <label htmlFor="Nombre">Descripción</label>
          <Option
            label="Descripción"
            name="bio"
            value={editableProfile.bio || ""}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <label htmlFor="Nombre">Foto de perfil</label>
          <Option
            label="Foto de Perfil URL"
            name="profilePic"
            value={editableProfile.profilePic || ""}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ marginTop: "10px" }}
          />
          <label htmlFor="Nombre">Ciudad</label>
          <Option
            label="Foto de Perfil URL"
            name="profilePic"
            value={userLocation.city || ""}
            fullWidth
            margin="normal"
          />

          <Boton1 onClick={handleUpdateProfile} variant="contained">
            Actualizar Perfil
          </Boton1>
          <Boton2 onClick={() => Salir()}>Cerrar sesión</Boton2>
        </Contenedormenucuenta>
      </Datosusuario>

      {/* Snackbar para mostrar mensaje de éxito */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="success">
          Perfil actualizado exitosamente!
        </Alert>
      </Snackbar>
    </Sectionhome>
  );
}
