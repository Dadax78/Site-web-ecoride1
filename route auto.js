const verifyToken = require("../middleware/auth");

// Exemple de route protégée
router.get("/profile", verifyToken, async (req, res) => {
  res.status(200).json({
    message: `Bienvenue, utilisateur avec l'ID ${req.user.id}`,
  });
});
 

const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

// Inscription de l'utilisateur
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Utilisateur déjà existant" });
    }

    const newUser = new User({ email, password });
    await newUser.save();
    res.status(201).json({ message: "Utilisateur créé avec succès" });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// Connexion de l'utilisateur
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Mot de passe incorrect" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// Route protégée (Exemple : Profil de l'utilisateur)
router.get("/profile", async (req, res) => {
  const token = req.header("Authorization").replace("Bearer ", "");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });
    res.status(200).json(user);
  } catch (err) {
    res.status(401).json({ message: "Token invalide ou expiré" });
  }
});

module.exports = router;
