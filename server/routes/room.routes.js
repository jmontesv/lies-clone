const express = require("express");
const router = express.Router();
const fs = require("fs");

const rooms = require("../room.json");

router.get("/rooms", (req, res) => {
  res.status(200).json(rooms);
});
router.get("/rooms/:invitationId", (req, res) => {
  const roomFounded = rooms.find(
    (room) => room.invitationId === req.params.invitationId
  );
  if (roomFounded) res.status(200).json(roomFounded);
  else
    res
      .status(404)
      .json({ message: "La invitación no pertenece a niguna sala" });
});
router.post("/rooms", (req, res) => {
  const { id, invitationId } = req.body;
  const newRoom = { id, invitationId, users: [] };
  rooms.push(newRoom);
  res.status(201).json(newRoom);
});

module.exports = router;
