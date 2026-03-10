<script>
let rideStatus = "Non démarré";  // Initialisation de l'état du covoiturage

// Fonction pour démarrer le covoiturage
function startRide() {
    // Mettre à jour l'état
    rideStatus = "En cours";
    
    // Afficher l'état et masquer le bouton "Démarrer"
    document.getElementById('rideStatus').textContent = `État : ${rideStatus}`;
    document.getElementById('startButton').style.display = "none";
    document.getElementById('stopButton').style.display = "inline-block";

    alert("Le covoiturage a commencé !");
}

// Fonction pour arrêter le covoiturage
function endRide() {
    // Mettre à jour l'état
    rideStatus = "Terminé";

    // Afficher l'état et masquer le bouton "Arrêter"
    document.getElementById('rideStatus').textContent = `État : ${rideStatus}`;
    document.getElementById('stopButton').style.display = "none";

    alert("Le covoiturage est terminé !");
}
</script>

<script>
// API pour mettre à jour l'état du covoiturage
app.post('/api/ride/update-status', (req, res) => {
    const rideId = req.body.rideId; // ID du covoiturage
    const status = req.body.status; // Nouveau statut du covoiturage (En cours ou Terminé)

    const query = 'UPDATE rides SET status = ? WHERE id = ?';
    db.query(query, [status, rideId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'état.' });
        }
        res.json({ message: 'État du covoiturage mis à jour avec succès.' });
    });
});
</script>

<script>
app.post('/api/ride/start', (req, res) => {
    const { rideId } = req.body;
    const query = 'UPDATE rides SET status = "started" WHERE id = ?';

    db.query(query, [rideId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erreur lors du démarrage du covoiturage.' });
        }
        res.json({ message: 'Covoiturage démarré avec succès.' });
    });
});

app.post('/api/ride/stop', (req, res) => {
    const { rideId } = req.body;
    const query = 'UPDATE rides SET status = "completed" WHERE id = ?';

    db.query(query, [rideId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erreur lors de l\'arrêt du covoiturage.' });
        }
        res.json({ message: 'Covoiturage terminé avec succès.' });
    });
});
</script>