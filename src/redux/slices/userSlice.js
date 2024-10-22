import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import {
  auth,
  facebookProvider,
  googleProvider,
} from "../../firebase/firebaseConfig";

const db = getFirestore(); // Obtener la instancia de Firestore

const initialState = {
  displayName: "",
  email: "",
  photoURL: "",
  id: "",
  isAuthenticated: false,
};

export const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.displayName = action.payload.displayName;
      state.email = action.payload.email;
      state.photoURL = action.payload.photoURL || "";
      state.id = action.payload.id || "";
      state.isAuthenticated = action.payload.isAuthenticated;
    },
  },
});

// Acción asíncrona para verificar el estado de autenticación
export const checkUserAuth = createAsyncThunk(
  "user/checkUserAuth",
  async (_, { rejectWithValue }) => {
    return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(
        auth,
        (user) => {
          unsubscribe();
          if (user) {
            resolve(user);
          } else {
            resolve(null);
          }
        },
        reject
      );
    });
  }
);

export const { setUser } = userReducer.actions;
export default userReducer.reducer;

// ----------------------------------------------------------------

// Funciones de autenticación

const createUserDocument = async (user) => {
  const userRef = doc(db, "users", user.uid); // Usar la nueva API
  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    console.log("Creando nuevo documento para el usuario:", user.uid);
    await setDoc(userRef, {
      bio: "Amo la fotografía 📸 y los viajes ✈️.",
      email: user.email,
      followers: 0,
      following: 0,
      id: `userId${Math.floor(Math.random() * 10000)}`,
      name: user.displayName || "",
      profilePic: user.photoURL || "",
    });
    console.log("Documento creado exitosamente en la colección 'users'.");
    return { ...user, newUser: true }; // Retorna el nuevo usuario
  } else {
    console.log("El documento ya existe para el usuario:", user.uid);
    return { ...snapshot.data(), newUser: false }; // Retorna datos existentes
  }
};
export const mailRegister = async ({ name, email, photoURL, password }) => {
  if (!password || password.length < 6) {
    throw new Error("La contraseña debe tener al menos 6 caracteres.");
  }

  // Verifica si el correo ya está registrado
  const userRef = doc(db, "users", email); // Aquí se busca por el email
  const snapshot = await getDoc(userRef);

  if (snapshot.exists()) {
    throw new Error("El correo electrónico ya está registrado.");
  }

  try {
    const response = await createUserWithEmailAndPassword(auth, email, password);
    if (response && response.user) {
      console.log("Usuario registrado:", response.user.uid);
      await updateProfile(response.user, {
        displayName: name,
        photoURL: photoURL || "",
      });

      const userData = await createUserDocument(response.user); // Crear documento

      const newUserData = {
        displayName: userData.displayName || "",
        email: userData.email || "",
        photoURL: userData.photoURL || "",
        id: response.user.uid,
        isAuthenticated: true,
      };

      localStorage.setItem("userData", JSON.stringify(newUserData));
      return newUserData;
    }
  } catch (error) {
    console.error("Error en el registro:", error.message);
    throw new Error(error.message);
  }
};


export const mailLogin = async (email, password) => {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    if (response && response.user) {
      console.log("Usuario ha iniciado sesión:", response.user.uid);
      const userData = await createUserDocument(response.user); // Crear documento o recuperar datos

      const newUserData = {
        displayName: userData.displayName || "",
        email: userData.email || "",
        photoURL: userData.photoURL || "",
        id: response.user.uid,
        isAuthenticated: true,
      };

      localStorage.setItem("userData", JSON.stringify(newUserData));
      return newUserData;
    }
  } catch (error) {
    console.error("Hubo un error al iniciar sesión:", error.message);
  }
};

export const googleLogin = async () => {
  try {
    const response = await signInWithPopup(auth, googleProvider);
    if (response && response.user) {
      console.log("Usuario ha iniciado sesión con Google:", response.user.uid);
      const userData = await createUserDocument(response.user); // Crear documento o recuperar datos

      const newUserData = {
        displayName: userData.displayName || "",
        email: userData.email || "",
        photoURL: userData.photoURL || "",
        id: response.user.uid,
        isAuthenticated: true,
      };

      localStorage.setItem("userData", JSON.stringify(newUserData));
      return newUserData;
    }
  } catch (error) {
    console.error("Hubo un error al iniciar sesión con Google:", error.message);
  }
};

export const facebookLogin = async () => {
  try {
    const response = await signInWithPopup(auth, facebookProvider);
    if (response && response.user) {
      console.log("Usuario ha iniciado sesión con Facebook:", response.user.uid);
      const userData = await createUserDocument(response.user); // Crear documento o recuperar datos

      const newUserData = {
        displayName: userData.displayName || "",
        email: userData.email || "",
        photoURL: userData.photoURL || "",
        id: response.user.uid,
        isAuthenticated: true,
      };

      localStorage.setItem("userData", JSON.stringify(newUserData));
      return newUserData;
    }
  } catch (error) {
    console.error("Hubo un error al iniciar sesión con Facebook:", error.message);
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    const userData = {
      displayName: "",
      email: "",
      photoURL: "",
      id: "",
      isAuthenticated: false,
    };

    localStorage.setItem("userData", JSON.stringify(userData));
    console.log("Usuario ha cerrado sesión.");
  } catch (error) {
    console.error("Hubo un error al hacer logout:", error.message);
  }
};
