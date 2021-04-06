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
  socket.on("join-room", (idRoom, socketId) => {
    socket.join(idRoom);
    // Obtengo el usuario completo
    const user = users.find((user) => user.socketId === socketId);
    // Añado el usuario a la sala
    rooms.forEach((room) => {
      if (room.id === idRoom) room.users.push(user);
    });
    io.to(idRoom).emit("user-joined", user);
  });
  socket.on("disconnect", () => {
    console.log("Cerrando sesion", socket.id);
    const userToDelete = users.find((user) => user.socketId === socket.id);
    if (userToDelete) {
      let roomIndex = -1;
      let room = rooms.find((room, index) => {
        roomIndex = index;
        return room.id === userToDelete.roomId;
      });
      if (room) {
        let newUsersList = room.users.filter(
          (user) => user.socketId !== socket.id
        );
        room.users = newUsersList;
        if (newUsersList.length > 0) {
          if (userToDelete.isHost) newUsersList[0].isHost = true;
          if (roomIndex >= 0) rooms[roomIndex].users = newUsersList;
          io.to(userToDelete.roomId).emit(
            "user-disconnected",
            newUsersList,
            userToDelete
          );
        }
      }
    }
  });
});

httpServer.listen(PORT, () => {
  console.log("API funcionando en el puerto " + PORT);
});
