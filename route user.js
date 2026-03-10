const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");

router.get("/profile", verifyToken, async (req, res) => {
  res.json({ message: `Bienvenue user ${req.user.id}` });
});
