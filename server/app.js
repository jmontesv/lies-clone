require("dotenv").config();
const express = require("express");
const app = express();
const httpServer = require("http").createServer(app);
const options = {};
const io = require("socket.io")(httpServer, options);

const roomsRoutes = require("./routes/room.routes");
const userRoutes = require("./routes/user.routes");

const PORT = process.env.port || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Bienvenido a la API de lies clone");
});
app.use(roomsRoutes);
app.use(userRoutes);

io.on("connection", (socket) => {
  socket.on("join-room", (idRoom, idUser) => {
    socket.join(idRoom);
    rooms[idRoom].users.concat(idUser);
    const user = users.find((user) => user.id === idUser);
    socket.emit("user-joined", user);
  });
});

httpServer.listen(PORT, () => {
  console.log("API funcionando en el puerto " + PORT);
});
