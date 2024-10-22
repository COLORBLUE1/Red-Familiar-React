import { createSlice } from "@reduxjs/toolkit";
import { auth, firestore, storage } from "../../firebase/firebaseConfig";
import {
  addDoc,
  collection,
  Firestore,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes,  getDownloadURL } from "firebase/storage"; 
import { v4 as uuidv4 } from "uuid";


const initialState = {
  users: [],
};

export const useUsers = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
  },
});

export const { setUsers } = useUsers.actions;
export default useUsers.reducer;

// ----------------------------------------------------------------

//Create

// export const createAsync = async (value) => {
//   try {
//     const response = await addDoc(collection(firestore, "users"), value);
//     if (response) {
//       console.log("Documento creado con ID: ", response.id);
//       console.log(response);
//     }
//   } catch (error) {
//     console.error("Hubo un error: " + error);
//   }
// };


export const createAsync = async (formData) => {
  try {
    // Generar un ID único para id
    let id;
    const storage = getStorage();

    let isUnique = false;
    while (!isUnique) {
      id = uuidv4(); // Genera un nuevo UUID

      // Consultar si el id ya existe en la colección
      const q = query(collection(firestore, "posts"), where("id", "==", id));
      const querySnapshot = await getDocs(q);
      
      // Verificar si el id es único
      isUnique = querySnapshot.empty; // Si está vacío, el ID es único
    }

    // Si hay un archivo, subirlo a Firebase Storage
    let imageUrl = '';
    if (formData.get('file')) {
      const file = formData.get('file');
      const storageRef = ref(storage, `images/${file.name}`);
      await uploadBytes(storageRef, file);
      // Obtener la URL del archivo subido
      imageUrl = await getDownloadURL(storageRef);
    }

    // Agregar el contenido a Firestore
    const userData = {
      content: formData.get('content'),
      imageUrl: imageUrl, // Almacena la URL del archivo si existe
      id: id, // Agregar el id único
    };

    const response = await addDoc(collection(firestore, "posts"), userData);
    if (response) {
      console.log("Documento creado con ID: ", response.id);
      console.log(response);
    }
  } catch (error) {
    console.error("Hubo un error: " + error);
  }
};




// Actions (funciones)

export const mailRegister = async ({ name, email, photoURL, password }) => {
  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    if (response) {
      await updateProfile(response.user, {
        displayName: name,
        photoURL: photoURL || "",
      });
      return {
        displayName: response.user.displayName,
        email: response.user.email,
        photoURL: response.user.photoURL,
        isAuthenticated: true,
      };
    }
  } catch (error) {
    console.error("Hubo un error: " + error);
  }
};

// Read
export const readAsync = async () => {
  const datos = [];
  try {
    const exercises = await getDocs(collection(firestore, "exercises"));
    exercises.forEach((item) => {
      datos.push({
        ...item.data(),
      });
    });
    return datos;
  } catch (error) {
    console.error(error);
  }
};

// Update
export const updateAsync = async (newData) => {
  console.log(newData);
  const moviesCollection = collection(firestore, "exercises");
  const movieQuery = query(moviesCollection, where("id", "==", newData.id));

  const queriedData = await getDocs(movieQuery);
  let id;

  queriedData.forEach((item) => {
    id = item.id;
  });

  const docRef = doc(firestore, "exercises", id);
  console.log(docRef);

  const response = await updateDoc(docRef, newData);
};

// Delete
export const deleteAsync = async (id) => {
  try {
    const postsCollection = collection(firestore, "posts");
    const postsQuery = query(postsCollection, where("id", "==", id));

    const datos = await getDocs(postsQuery);

    datos.forEach((item) => {
      deleteDoc(doc(firestore, "posts", item.id));
    });
  } catch (error) {
    console.error(error);
  }
};
