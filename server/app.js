require("dotenv").config();
const express = require("express");
const app = express();
const httpServer = require("http").createServer(app);
const rooms = require("./room.json");
const options = {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
};
const cors = require("cors");
const io = require("socket.io")(httpServer, options);

const roomsRoutes = require("./routes/room.routes");
const userRoutes = require("./routes/user.routes");

const PORT = process.env.port || 5000;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: false,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Bienvenido a la API de lies clone");
});
app.use(roomsRoutes);
app.use(userRoutes);

io.on("connection", (socket) => {
  const id = socket.handshake.query.id;

  socket.on("join-room", (idRoom, idUser) => {
    socket.join(idRoom);
    console.log("Handshake established with " + idUser);
    /* tira exeception en linea 42 y 43  */
    // rooms[idRoom].users.concat(idUser);
    // const user = users.find((user) => user.id === idUser);
    // socket.emit("user-joined", user);
  });
});

httpServer.listen(PORT, () => {
  console.log("API funcionando en el puerto " + PORT);
});
