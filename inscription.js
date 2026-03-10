app.post('/api/register', (req, res) => {
    const { pseudo, email, password } = req.body;
    const query = 'INSERT INTO users (pseudo, email, password) VALUES (?, ?, ?)';
    
    db.query(query, [pseudo, email, password], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erreur lors de l\'inscription.' });
        }
        res.status(201).json({ message: 'Utilisateur créé avec succès.' });
    });
});
