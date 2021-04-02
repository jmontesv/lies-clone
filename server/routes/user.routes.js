const express = require("express");
const router = express.Router();

const { v4: uuidv4 } = require("uuid");
const users = require("../user.json");

router.post("/register", (req, res) => {
  const newUser = {};
  newUser.id = uuidv4();
  newUser.userName = req.body.userName;
  users.push(newUser);
  res.status(201).json({ message: "Usuario registrado con éxito" });
});

module.exports = router;
