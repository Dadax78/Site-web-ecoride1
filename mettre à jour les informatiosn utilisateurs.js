app.put('/api/update-profile', (req, res) => {
    const { userId, pseudo, email, password } = req.body;
    const query = 'UPDATE users SET pseudo = ?, email = ?, password = ? WHERE id = ?';

    db.query(query, [pseudo, email, password, userId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erreur lors de la mise à jour du profil.' });
        }
        res.json({ message: 'Profil mis à jour avec succès.' });
    });
});
