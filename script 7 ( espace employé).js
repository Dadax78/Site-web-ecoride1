<script>
document.addEventListener("DOMContentLoaded", function () {

    fetch('/api/admin/problematic-rides')
        .then(response => response.json())
        .then(data => {
            const problematicRidesContainer = document.getElementById("problematicRides");
            const noProblematicRidesContainer = document.getElementById("noProblematicRides");

            if (data.length > 0) {
                data.forEach(ride => {
                    const rideCard = `
                        <div class="ride-card">
                            <h3>${ride.title}</h3>
                            <p>${ride.description}</p>
                            <button onclick="viewDetails(${ride.id})">Voir détails</button>
                            <button onclick="suspendUser(${ride.user_id})">Suspendre utilisateur</button>
                        </div>
                    `;
                    problematicRidesContainer.innerHTML += rideCard;
                });
            } else {
                problematicRidesContainer.style.display = "none";
                noProblematicRidesContainer.style.display = "block";
            }
        });
});

// Fonction suspendre utilisateur
function suspendUser(userId) {
    fetch('/api/admin/suspend-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
    })
    .catch(error => {
        alert("Erreur lors de la suspension.");
    });
}

// Fonction voir détails
function viewDetails(rideId) {
    window.location.href = `/ride-details.html?rideId=${rideId}`;
}
</script>
app.get('/api/admin/problematic-rides', (req, res) => {
    const query = 'SELECT * FROM rides WHERE status = "problematic"';
    
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ 
                error: 'Erreur lors de la récupération des covoiturages signalés.' 
            });
        }
        res.json(results);
    });
});

app.post('/api/admin/suspend-user', (req, res) => {
    const { userId } = req.body;
    const query = 'UPDATE users SET status = "suspended" WHERE id = ?';

    db.query(query, [userId], (err, results) => {
        if (err) {
            return res.status(500).json({ 
                error: "Erreur lors de la suspension de l'utilisateur." 
            });
        }
        res.json({ message: 'Utilisateur suspendu avec succès.' });
    });
});