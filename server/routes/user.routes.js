const express = require("express");
const router = express.Router();

const users = require("../user.json");

router.post("/register", (req, res) => {
  const { socketId, userName } = req.body;
  const newUser = {};
  newUser.socketId = socketId;
  newUser.userName = userName;
  users.push(newUser);
  res.status(201).json({ message: "Usuario registrado con éxito" });
});

module.exports = router;
