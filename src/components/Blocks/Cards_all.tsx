import React, { useState, useEffect, useRef } from "react";
import {
  Favorite,
  FavoriteBorder,
  ChatBubbleOutline,
  Share,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { firestore } from "../../firebase/firebaseConfig";
import { Link } from "react-router-dom";

const Cards = () => {
  const [liked, setLiked] = useState({});
  const [saved, setSaved] = useState({});
  const [comments, setComments] = useState({});
  const [newComments, setNewComments] = useState({});
  const [showComments, setShowComments] = useState({});
  const [limit, setLimit] = useState(10);
  const [editingPostId, setEditingPostId] = useState(null);
  const [editingContent, setEditingContent] = useState("");
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState({});
  const [currentUserId, setCurrentUserId] = useState(null); // Estado para el ID del usuario actual
  const [loading, setLoading] = useState(true);
  const observerRef = useRef();

  useEffect(() => {
    const fetchPostsAndUsers = async () => {
      setLoading(true);
      try {
        const postSnapshot = await getDocs(collection(firestore, "posts"));
        const postsArray = postSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const userSnapshot = await getDocs(collection(firestore, "users"));
        const usersArray = userSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Asignar el ID del primer usuario encontrado como currentUserId
        if (usersArray.length > 0) {
          setCurrentUserId(usersArray[0].id); // Ajusta esto según cómo obtengas el usuario actual
        }

        const filteredUsers = usersArray.filter((user) =>
          postsArray.some((post) => post.authorId === user.id)
        );

        setPosts(postsArray);
        setUsers(
          Object.fromEntries(filteredUsers.map((user) => [user.id, user]))
        );
      } catch (error) {
        console.error("Error fetching posts or users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPostsAndUsers();
  }, []);

  const handleEditPost = (post) => {
    setEditingPostId(post.id);
    setEditingContent(post.content);
  };

  const handleUpdatePost = async () => {
    if (editingPostId && editingContent.trim() !== "") {
      try {
        const postRef = doc(firestore, "posts", editingPostId);
        await updateDoc(postRef, { content: editingContent });
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === editingPostId
              ? { ...post, content: editingContent }
              : post
          )
        );
        setEditingPostId(null);
        setEditingContent("");
      } catch (error) {
        console.error("Error updating post:", error);
      }
    } else {
      console.warn("El contenido no puede estar vacío");
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await deleteDoc(doc(firestore, "posts", postId));
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        posts.slice(0, limit).map((post) => {
          const {
            authorId,
            name: authorName = post?.name,
            profilePic: authorProfilePic = post?.profilePic,
          } = users[post.authorId] || {};

          return (
            <Card key={post.id} sx={{ mx: 2, mb: 2, borderRadius: 5 }}>
              <CardHeader
                avatar={
                  <Link to={`/perfil/${post?.authorId}`}>
                    <Avatar src={authorProfilePic} alt={authorName} />
                  </Link>
                }
                title={authorName}
              />
              <CardMedia
                sx={{ objectFit: "contain" }}
                component="img"
                height="300"
                image={
                  post.imageUrl ||
                  "https://cdn.pixabay.com/photo/2021/02/18/20/52/goku-6028390_1280.png"
                }
                alt="Post image"
              />
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Box>
                    <IconButton onClick={() => handleLike(post.id)}>
                      {liked[post.id] ? (
                        <Favorite color="error" />
                      ) : (
                        <FavoriteBorder />
                      )}
                    </IconButton>
                  </Box>
                  <Box>
                    {post.authorId === currentUserId && ( // Mostrar editar y eliminar solo si el authorId coincide
                      <>
                        <IconButton onClick={() => handleEditPost(post)}>
                          Editar
                        </IconButton>
                        <IconButton onClick={() => handleDeletePost(post.id)}>
                          Eliminar
                        </IconButton>
                      </>
                    )}
                  </Box>
                  <IconButton onClick={() => handleSave(post.id)}>
                    {saved[post.id] ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                  </IconButton>
                </Box>
                {editingPostId === post.id ? (
                  <Box>
                    <TextField
                      fullWidth
                      variant="outlined"
                      value={editingContent}
                      onChange={(e) => setEditingContent(e.target.value)}
                    />
                    <Button onClick={handleUpdatePost} sx={{ mt: 1 }}>
                      Guardar
                    </Button>
                  </Box>
                ) : (
                  <Typography variant="body2">{post.content}</Typography>
                )}
                {showComments[post.id] && (
                  <Box sx={{ mt: 2 }}>
                    {(comments[post.id] || []).map((comment, index) => (
                      <Typography key={index} variant="body2" sx={{ mb: 1 }}>
                        {comment}
                      </Typography>
                    ))}
                    <TextField
                      fullWidth
                      variant="outlined"
                      placeholder="Agregar un comentario..."
                      value={newComments[post.id] || ""}
                      onChange={(e) =>
                        setNewComments((prev) => ({
                          ...prev,
                          [post.id]: e.target.value,
                        }))
                      }
                      sx={{ mt: 1 }}
                    />
                    <Button
                      onClick={() => handleAddComment(post.id)}
                      sx={{ mt: 1 }}
                    >
                      Publicar
                    </Button>
                  </Box>
                )}
              </CardContent>
            </Card>
          );
        })
      )}
      <div ref={observerRef} style={{ height: "20px" }} />
    </>
  );
};

export default Cards;
