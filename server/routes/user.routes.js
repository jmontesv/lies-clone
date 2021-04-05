const express = require("express");
const router = express.Router();

const users = require("../user.json");

router.post("/register", (req, res) => {
  const { socketId, userName, isHost } = req.body;
  const newUser = {};
  newUser.socketId = socketId;
  newUser.userName = userName;
  newUser.isHost = isHost;
  users.push(newUser);
  console.log(newUser);
  res.status(201).json({ message: "Usuario registrado con éxito" });
});

module.exports = router;
