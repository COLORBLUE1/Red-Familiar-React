import React, { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import { Contenedormain } from "../../assets/style/stylecomponets/styled.js";
import styled from "styled-components";
import { NavBarDef } from "../Home/NavBarDef.js";
import { useNavigate } from "react-router-dom";
import { firestore } from "../../firebase/firebaseConfig";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const Div = styled.div`
  form {
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;
    margin-top: 20px;
    margin-bottom: 20px;
  }
`;

export const Newpost = () => {
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("userData"));
  const userEmail = userData.email; // Obtén el correo del usuario logueado
  const [authorId, setAuthorId] = useState(null);

  useEffect(() => {
    const fetchAuthorId = async () => {
      const usersRef = collection(firestore, "users");
      const q = query(usersRef, where("email", "==", userEmail));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        setAuthorId(userData.id);
      } else {
        console.log("No se encontró el usuario!");
      }
    };

    if (userEmail) {
      fetchAuthorId();
    }
  }, [userEmail]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!authorId) {
      alert("Error: Author ID not found.");
      return;
    }

    const newPost = {
      content,
      authorId,
      postId: `postId${Date.now()}`,
    };

    if (file) {
      const storage = getStorage();
      const storageRef = ref(storage, `posts/${file.name}`);

      try {
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        newPost.imageUrl = downloadURL;
      } catch (error) {
        console.error("Error al subir el archivo:", error.message);
        alert("No se pudo subir la imagen. Inténtalo de nuevo.");
        return;
      }
    }

    try {
      await addDoc(collection(firestore, "posts"), newPost);
      setContent("");
      setFile(null);
      navigate("/home");
    } catch (error) {
      console.error("Error al agregar el post:", error.message);
    }
  };

  return (
    <Contenedormain>
      <Div>
        <h2>Comparte tus mejores momentos</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="¿Qué estás pensando?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            sx={{ mb: 2 }}
          />
          <input
            type="file"
            label="Subir archivo"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button type="submit" variant="contained" color="primary">
            Publicar
          </Button>
        </form>
      </Div>
      <NavBarDef />
    </Contenedormain>
  );
};
