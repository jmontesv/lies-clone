require("dotenv").config();
const express = require("express");
const app = express();
const httpServer = require("http").createServer(app);
const rooms = require("./room.json");
const users = require("./user.json");
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
  socket.on("join-room", (idRoom) => {
    socket.join(idRoom);
    // Obtengo el usuario completo
    const user = users.find((user) => user.socketId === socketId);
    // Añado el usuario a la sala
    rooms.forEach((room) => {
      if (room.id === idRoom) room.users.concat(user);
    });
    io.emit(idRoom).to("user-joined", user);
  });
});

httpServer.listen(PORT, () => {
  console.log("API funcionando en el puerto " + PORT);
});
