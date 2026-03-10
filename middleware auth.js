const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token)
    return res.status(401).json({ message: "Accès refusé. Aucun token fourni." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // On attache l'utilisateur à la requête
    next();
  } catch (err) {
    res.status(400).json({ message: "Token invalide." });
  }
};

module.exports = verifyToken;
