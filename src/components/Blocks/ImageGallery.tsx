import React, { useState, useEffect } from "react";
import { Box, Avatar, Typography, Modal, IconButton } from "@mui/material";
import Masonry from "@mui/lab/Masonry";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../../firebase/firebaseConfig";
import { AiFillHeart, AiOutlineShareAlt, AiFillMessage } from "react-icons/ai";

const ImageGallery = ({ autoridP }) => {
  const [posts, setPosts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const userData = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    const fetchUserPosts = async () => {
      const id = autoridP; // ID del usuario específico
      const postsRef = collection(firestore, "posts");
      const q = query(postsRef, where("authorId", "==", id));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const postsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setPosts(postsData); // Guarda todos los posts del usuario
      } else {
        console.log("No posts found for this user!");
      }
    };

    fetchUserPosts();
  }, []);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleClose = () => {
    setSelectedImage(null);
  };

  return (
    <Box className="animate__animated animate__fadeInUp" sx={{ p: 2 }}>
      <Masonry columns={{ xs: 2, sm: 2, md: 2 }} spacing={2}>
        {posts.map((post) => {
          const imageHeight = Math.random() > 0.5 ? 300 : 200;
          return (
            <Box
              key={post.id}
              sx={{
                position: "relative",
                borderRadius: 2,
                overflow: "hidden",
                height: imageHeight,
                cursor: "pointer",
              }}
              onClick={() => handleImageClick(post.imageUrl)} // Cambiado para abrir la imagen del post
            >
              <img
                src={
                  post.imageUrl ||
                  "https://i.pinimg.com/564x/81/16/6d/81166dd8edf47f766426306fb4f51918.jpg"
                }
                alt="Post"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            </Box>
          );
        })}
      </Masonry>

      <Modal
        open={!!selectedImage}
        onClose={handleClose}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "rgba(255, 255, 255, 0.8)",
        }}
      >
        <Box
          sx={{
            position: "relative",
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            outline: "none",
          }}
        >
          <img
            src={selectedImage}
            alt="Selected"
            style={{
              maxWidth: "80%",
              maxHeight: "70vh",
              borderRadius: "8px",
            }}
          />
          {/* <Box
            sx={{
              position: "absolute",
              bottom: -50,
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: 2,
            }}
          >
            <IconButton sx={{ display: "grid" }}>
              <AiFillHeart style={{ color: "#fff" }} />
              <strong style={{ color: "#fff", margin: 0 }}>15</strong>
            </IconButton>
            <IconButton sx={{ display: "grid" }}>
              <AiFillMessage style={{ color: "#fff" }} />
              <strong style={{ color: "#fff", margin: 0 }}>15</strong>
            </IconButton>
            <IconButton sx={{ display: "grid" }}>
              <AiOutlineShareAlt style={{ color: "#fff" }} />
              <strong style={{ color: "#fff", margin: 0 }}>15</strong>
            </IconButton>
          </Box> */}
        </Box>
      </Modal>
    </Box>
  );
};

export default ImageGallery;
