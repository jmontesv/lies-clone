const express = require("express");
const router = express.Router();

const { v4: uuidv4 } = require("uuid");
const rooms = require("../room.json");

router.get("/rooms", (req, res) => {
  res.status(200).json(rooms);
});
router.post("/rooms", (req, res) => {
  const id = req.body.id;
  // const id = uuidv4();
  rooms[id] = { name: req.body.name, users: [] };
  res.status(201).send({});
});

module.exports = router;
