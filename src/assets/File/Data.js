import { auth, firestore } from "../../firebase/firebaseConfig";

export const users = [ 
  {
    id: "userId1",
    name: "Juan",
    email: "juan@gmail.com",
    profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
    followers: 150,
    following: 75,
    bio: "Amo la fotografía 📸 y los viajes ✈️."
  },
  {
    id: "userId2",
    name: "Maria",
    email: "maria@outlook.com",
    profilePic: "https://randomuser.me/api/portraits/women/1.jpg",
    followers: 200,
    following: 100,
    bio: "Diseñadora gráfica 🎨 y amante del arte 🖌️."
  },
  {
    id: "userId3",
    name: "Pedro",
    email: "pedro@yahoo.com",
    profilePic: "https://randomuser.me/api/portraits/men/2.jpg",
    followers: 180,
    following: 50,
    bio: "Ingeniero de software 💻 y gamer 🎮."
  },
  {
    id: "userId4",
    name: "Ana",
    email: "ana@gmail.com",
    profilePic: "https://randomuser.me/api/portraits/women/2.jpg",
    followers: 220,
    following: 130,
    bio: "Pasión por la moda 👗 y la cocina 🍳."
  },
  {
    id: "userId5",
    name: "Luis",
    email: "luis@hotmail.com",
    profilePic: "https://randomuser.me/api/portraits/men/3.jpg",
    followers: 90,
    following: 60,
    bio: "Músico 🎶 y amante de los deportes ⚽."
  },
  {
    id: "userId6",
    name: "Laura",
    email: "laura@gmail.com",
    profilePic: "https://randomuser.me/api/portraits/women/3.jpg",
    followers: 300,
    following: 200,
    bio: "Creadora de contenido 📱 y viajera 🌍."
  },
  {
    id: "userId7",
    name: "Carlos",
    email: "carlos@outlook.com",
    profilePic: "https://randomuser.me/api/portraits/men/4.jpg",
    followers: 140,
    following: 80,
    bio: "Entusiasta de la tecnología ⚙️ y los gadgets 📱."
  },
  {
    id: "userId8",
    name: "Sofia",
    email: "sofia@yahoo.com",
    profilePic: "https://randomuser.me/api/portraits/women/4.jpg",
    followers: 250,
    following: 150,
    bio: "Amante de la literatura 📚 y la naturaleza 🌳."
  },
  {
    id: "userId9",
    name: "Diego",
    email: "diego@gmail.com",
    profilePic: "https://randomuser.me/api/portraits/men/5.jpg",
    followers: 170,
    following: 90,
    bio: "Fotógrafo 📷 y aventurero 🌄."
  },
  {
    id: "userId10",
    name: "Valeria",
    email: "valeria@hotmail.com",
    profilePic: "https://randomuser.me/api/portraits/women/5.jpg",
    followers: 160,
    following: 70,
    bio: "Estudiante de biología 🧬 y amante de los animales 🐾."
  },
  {
    id: "userId11",
    name: "Javier",
    email: "javier@outlook.com",
    profilePic: "https://randomuser.me/api/portraits/men/6.jpg",
    followers: 130,
    following: 85,
    bio: "Cocinero aficionado 🍽️ y viajero 🗺️."
  },
  {
    id: "userId12",
    name: "Gabriela",
    email: "gabriela@gmail.com",
    profilePic: "https://randomuser.me/api/portraits/women/6.jpg",
    followers: 190,
    following: 95,
    bio: "Estilista ✂️ y amante del arte 🎭."
  },
  {
    id: "userId13",
    name: "Andrés",
    email: "andres@yahoo.com",
    profilePic: "https://randomuser.me/api/portraits/men/7.jpg",
    followers: 110,
    following: 55,
    bio: "Entrenador personal 💪 y apasionado del fitness 🏋️."
  },
  {
    id: "userId14",
    name: "Claudia",
    email: "claudia@gmail.com",
    profilePic: "https://randomuser.me/api/portraits/women/7.jpg",
    followers: 300,
    following: 300,
    bio: "Bloguera de estilo de vida ✨ y madre 👩‍👧."
  },
  {
    id: "userId15",
    name: "Fernando",
    email: "fernando@hotmail.com",
    profilePic: "https://randomuser.me/api/portraits/men/8.jpg",
    followers: 125,
    following: 65,
    bio: "Desarrollador web 🌐 y amante de la música 🎸."
  },
  {
    id: "userId16",
    name: "Isabella",
    email: "isabella@gmail.com",
    profilePic: "https://randomuser.me/api/portraits/women/8.jpg",
    followers: 190,
    following: 140,
    bio: "Amante del yoga 🧘 y la meditación 🕉️."
  },
];


export const posts = [
  {
    id: "postId1",
    authorId: "userId1",
    content: "Este es mi primer post 🎉. ¡Estoy emocionado de compartir mis pensamientos con todos! 🌟 Espero que les guste y que podamos interactuar mucho aquí. ¡Gracias por ser parte de mi viaje! 😊",
    timestamp: new Date("2024-10-09T10:00:00Z"),
    likes: 5,
    imageUrl: "https://cdn.pixabay.com/photo/2019/10/11/16/56/cat-4542301_1280.jpg", // Despertar
  },
  {
    id: "postId2",
    authorId: "userId2",
    content: "Me encanta esta aplicación familiar ❤️. Es genial poder conectar con todos y compartir momentos especiales juntos. ¡Hagamos más recuerdos! 📸✨",
    timestamp: new Date("2024-10-09T12:00:00Z"),
    likes: 10,
    imageUrl: "https://cdn.pixabay.com/photo/2019/01/08/17/00/sunset-3921616_960_720.jpg", // Familia
  },
  {
    id: "postId3",
    authorId: "userId3",
    content: "Hoy fue un gran día en el trabajo 💼✨. Logré terminar varios proyectos y recibí buenos comentarios de mis compañeros. ¡Siento que todo mi esfuerzo está valiendo la pena! 🎉",
    timestamp: new Date("2024-10-10T09:00:00Z"),
    likes: 3,
    imageUrl: "https://cdn.pixabay.com/photo/2022/01/20/17/51/office-desk-6952919_1280.jpg", // Trabajo
  },
  {
    id: "postId4",
    authorId: "userId4",
    content: "¿Alguien ha visto la nueva película? 🍿🎬. ¡He escuchado que es increíble! Me encantaría discutirla con otros fans. ¡Vamos al cine juntos! 🎥",
    timestamp: new Date("2024-10-10T10:00:00Z"),
    likes: 7,
    imageUrl: "https://cdn.pixabay.com/photo/2020/04/20/18/10/cinema-5069314_1280.jpg", // Cine
  },
  {
    id: "postId5",
    authorId: "userId5",
    content: "El café de esta mañana estuvo increíble ☕😍. Comenzar el día con una buena taza de café siempre mejora mi ánimo. ¿Cuál es su café favorito? ☕✨",
    timestamp: new Date("2024-10-10T11:00:00Z"),
    likes: 12,
    imageUrl: "https://cdn.pixabay.com/photo/2016/08/09/13/21/coffee-1580595_1280.jpg", // Café
  },
  {
    id: "postId6",
    authorId: "userId6",
    content: "Feliz de estar en casa con familia 🏡❤️. No hay nada mejor que disfrutar de una tarde tranquila con las personas que más amo. ¡Momentos así son los que importan! 😊",
    timestamp: new Date("2024-10-10T12:00:00Z"),
    likes: 15,
    imageUrl: "https://cdn.pixabay.com/photo/2024/05/01/15/13/inside-8732506_1280.png", // Hogar
  },
  {
    id: "postId7",
    authorId: "userId7",
    content: "¡Preparando una nueva receta deliciosa! 🍽️😋. Me encanta experimentar en la cocina y probar cosas nuevas. ¿Alguien quiere unirse a mí? 👩‍🍳👨‍🍳",
    timestamp: new Date("2024-10-10T13:00:00Z"),
    likes: 8,
    imageUrl: "https://cdn.pixabay.com/photo/2016/03/27/21/34/restaurant-1284351_960_720.jpg", // Cocina
  },
  {
    id: "postId8",
    authorId: "userId8",
    content: "Me encanta esta canción, ¡la recomiendo! 🎶😍. La música siempre tiene el poder de levantar el ánimo. ¿Cuál es su canción favorita en este momento? 🎤✨",
    timestamp: new Date("2024-10-10T14:00:00Z"),
    likes: 5,
    imageUrl: "https://cdn.pixabay.com/photo/2016/04/30/14/58/music-1363069_1280.jpg", // Música
  },
  {
    id: "postId9",
    authorId: "userId9",
    content: "Planificando unas vacaciones soñadas 🌴✈️. Necesito un descanso y estoy pensando en lugares increíbles para visitar. ¡Sugerencias son bienvenidas! 🗺️😊",
    timestamp: new Date("2024-10-10T15:00:00Z"),
    likes: 20,
    imageUrl: "https://cdn.pixabay.com/photo/2023/09/01/18/02/eyeglasses-8227429_1280.jpg", // Vacaciones
  },
  {
    id: "postId10",
    authorId: "userId10",
    content: "Disfrutando de un buen libro 📚✨. No hay nada como sumergirse en una buena historia y dejarse llevar. ¿Cuáles son sus recomendaciones? 📖❤️",
    timestamp: new Date("2024-10-10T16:00:00Z"),
    likes: 6,
    imageUrl: "https://cdn.pixabay.com/photo/2022/11/08/06/05/read-7577787_960_720.jpg", // Libro
  },
  {
    id: "postId11",
    authorId: "userId11",
    content: "Amo las mañanas frescas 🌅☕. No hay nada mejor que disfrutar de un café caliente mientras veo salir el sol. ¡Que empiece el día! 🌞",
    timestamp: new Date("2024-10-10T17:00:00Z"),
    likes: 4,
    imageUrl: "https://cdn.pixabay.com/photo/2023/03/22/19/24/nature-7870374_1280.jpg", // Mañana
  },
  {
    id: "postId12",
    authorId: "userId12",
    content: "Un día perfecto para salir a caminar 🚶‍♂️🌳. El clima es ideal y las vistas son impresionantes. ¿Alguien quiere unirse a mí para disfrutar del aire libre? 🌞",
    timestamp: new Date("2024-10-10T18:00:00Z"),
    likes: 9,
    imageUrl: "https://media.istockphoto.com/id/1724524785/es/foto/joven-pareja-millennial-disfrutando-de-su-viaje-a-menton-mientras-viaja-por-el-sur-de-francia.webp?s=1024x1024&w=is&k=20&c=EZAaAhYdtRd9XC6SK97fLYRz_B1haq3mJncRE8DMnYs=", // Caminata
  },
  {
    id: "postId13",
    authorId: "userId13",
    content: "Las flores están hermosas esta temporada 🌸🌼. Me encanta ver cómo todo florece y llena el aire con su fragancia. ¡Es un recordatorio de la belleza de la naturaleza! 🌷✨",
    timestamp: new Date("2024-10-10T19:00:00Z"),
    likes: 11,
    imageUrl: "https://media.istockphoto.com/id/1887392040/es/foto/abuela-abrazando-a-su-nieta-despu%C3%A9s-de-recibir-un-ramo-de-flores-en-casa.webp?s=1024x1024&w=is&k=20&c=1XIy3RG1rl3xbttik0qdeJDmIWYaTa9LO-U2cbqitKE=", // Flores
  },
  {
    id: "postId14",
    authorId: "userId14",
    content: "¿Alguien quiere unirse a mi clase de yoga? 🧘‍♀️🧘‍♂️. Me encanta la tranquilidad que aporta y cómo ayuda a relajar la mente y el cuerpo. ¡Sería genial compartirlo! 🌈✨",
    timestamp: new Date("2024-10-10T20:00:00Z"),
    likes: 2,
    imageUrl: "https://media.istockphoto.com/id/2030734638/es/foto/mujeres-que-practican-yoga-en-un-ambiente-de-estudio-tranquilo-para-el-bienestar.webp?s=1024x1024&w=is&k=20&c=lMoqLMhn4Poq_ie-1TYZsvd2RkMVew4YuRbn7RpraOo=", // Yoga
  },
  {
    id: "postId15",
    authorId: "userId15",
    content: "¡Feliz cumpleaños a mi mejor amigo! 🎉🥳. Estoy tan agradecido de tenerlo en mi vida. ¡Vamos a celebrar juntos y crear recuerdos inolvidables! 🎂❤️",
    timestamp: new Date("2024-10-10T21:00:00Z"),
    likes: 18,
    imageUrl: "https://media.istockphoto.com/id/1502843522/es/foto/celebrar-un-cumplea%C3%B1os-en-la-oficina.webp?s=1024x1024&w=is&k=20&c=uVkHur9-va2b-R6pOg6wCvOniQAjmfFcGuULC_Q19yo=", // Cumpleaños
  },
  {
    id: "postId16",
    authorId: "userId16",
    content: "Listo para el concierto esta noche 🎶🤩. No puedo esperar para disfrutar de la música en vivo y pasar un buen rato con amigos. ¡La energía será increíble! 🎤✨",
    timestamp: new Date("2024-10-10T22:00:00Z"),
    likes: 14,
    imageUrl: "https://www.bbva.com/wp-content/uploads/2020/05/festival2-1920x1180.jpg", // Concierto
  },
];



export const commentsPostId1 = [
  {
    id: "commentId1",
    authorId: "userId2",
    content: "¡Buen post, Juan!",
    timestamp: new Date("2024-10-09T11:00:00Z"),
    postId: "postId1",
  },
  {
    id: "commentId2",
    authorId: "userId3",
    content: "Totalmente de acuerdo",
    timestamp: new Date("2024-10-09T11:30:00Z"),
    postId: "postId1",
  },
  {
    id: "commentId3",
    authorId: "userId4",
    content: "Interesante tema",
    timestamp: new Date("2024-10-09T12:00:00Z"),
    postId: "postId1",
  },
  {
    id: "commentId4",
    authorId: "userId5",
    content: "Gracias por compartir",
    timestamp: new Date("2024-10-09T12:30:00Z"),
    postId: "postId1",
  },
  {
    id: "commentId5",
    authorId: "userId6",
    content: "¿Cómo fue tu experiencia?",
    timestamp: new Date("2024-10-09T13:00:00Z"),
    postId: "postId1",
  },
  {
    id: "commentId6",
    authorId: "userId7",
    content: "Muy inspirador, Juan",
    timestamp: new Date("2024-10-09T13:30:00Z"),
    postId: "postId1",
  },
  {
    id: "commentId7",
    authorId: "userId8",
    content: "Sigue así, amigo",
    timestamp: new Date("2024-10-09T14:00:00Z"),
    postId: "postId1",
  },
  {
    id: "commentId8",
    authorId: "userId9",
    content: "Me gustó mucho tu post",
    timestamp: new Date("2024-10-09T14:30:00Z"),
    postId: "postId1",
  },
  {
    id: "commentId9",
    authorId: "userId10",
    content: "¿Te gustaría hablar más sobre esto?",
    timestamp: new Date("2024-10-09T15:00:00Z"),
    postId: "postId1",
  },
  {
    id: "commentId10",
    authorId: "userId11",
    content: "Excelente contenido, Juan",
    timestamp: new Date("2024-10-09T15:30:00Z"),
    postId: "postId1",
  },
  {
    id: "commentId11",
    authorId: "userId12",
    content: "¿Dónde puedo leer más?",
    timestamp: new Date("2024-10-09T16:00:00Z"),
    postId: "postId1",
  },
  {
    id: "commentId12",
    authorId: "userId13",
    content: "¡Me encanta tu estilo!",
    timestamp: new Date("2024-10-09T16:30:00Z"),
    postId: "postId1",
  },
  {
    id: "commentId13",
    authorId: "userId14",
    content: "Esto me motivó a escribir algo similar",
    timestamp: new Date("2024-10-09T17:00:00Z"),
    postId: "postId1",
  },
  {
    id: "commentId14",
    authorId: "userId15",
    content: "Increíble, ¡sigue escribiendo!",
    timestamp: new Date("2024-10-09T17:30:00Z"),
    postId: "postId1",
  },
  {
    id: "commentId15",
    authorId: "userId16",
    content: "Tus posts son siempre geniales",
    timestamp: new Date("2024-10-09T18:00:00Z"),
    postId: "postId1",
  },
];

