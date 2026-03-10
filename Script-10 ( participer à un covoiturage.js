
// Données fictives (ceci serait normalement récupéré via un backend)
let userCredits = 20;  // Crédits de l'utilisateur
let ridePrice = 15;    // Prix du covoiturage   
let availableSeats = 2;  // Places restantes pour ce covoiturage

// Fonction pour gérer la participation
function participer() {
    // Vérifier si l'utilisateur a suffisamment de crédits
    if (userCredits < ridePrice) {
        alert("Vous n'avez pas suffisamment de crédits pour participer à ce covoiturage.");
        return;
    }

    // Vérifier si des places sont disponibles
    if (availableSeats <= 0) {
        alert("Il n'y a plus de places disponibles pour ce covoiturage.");
        return;
    }

    // Afficher la fenêtre de confirmation
    document.getElementById('confirmationModal').style.display = "block";
}

// Fonction pour confirmer la participation
document.getElementById('confirmBtn').addEventListener('click', function() {
    // Mettre à jour les crédits de l'utilisateur
    userCredits -= ridePrice;
    
    // Mettre à jour le nombre de places disponibles
    availableSeats--;

    // Mettre à jour l'interface pour afficher les nouvelles informations
    document.getElementById('userCredits').textContent = `Crédits disponibles : ${userCredits}`;
    
    // Fermer la fenêtre de confirmation
    document.getElementById('confirmationModal').style.display = "none";

    // Informer l'utilisateur de la participation réussie
    alert("Vous avez bien été ajouté comme passager à ce covoiturage !");
});

// Fonction pour annuler la participation
document.getElementById('cancelBtn').addEventListener('click', function() {
    // Fermer la fenêtre de confirmation sans rien changer
    document.getElementById('confirmationModal').style.display = "none";
});

app.post('/api/participate', (req, res) => {
    const { userId, rideId } = req.body;
    const query = 'INSERT INTO passengers (user_id, ride_id) VALUES (?, ?)';
    
    db.query(query, [userId, rideId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erreur lors de l\'inscription au covoiturage.' });
        }
        res.json({ message: 'Participation enregistrée avec succès.' });
    });
});
