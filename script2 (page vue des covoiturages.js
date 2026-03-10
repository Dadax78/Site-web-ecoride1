
document.getElementById('searchForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Empêche le rechargement de la page

    const departure = document.getElementById('departure').value;
    const arrival = document.getElementById('arrival').value;
    const travelDate = document.getElementById('travelDate').value;

    const results = document.getElementById('results');
    const noResults = document.getElementById('noResults');

    // Simuler une recherche
    if (departure && arrival && travelDate) {
        // Supposons qu'aucun résultat n'est trouvé pour tester l'alerte
        results.innerHTML = ''; // Vider les anciens résultats
        noResults.classList.remove('d-none'); // Afficher l'alerte
    }
});

app.get('/api/rides', (req, res) => {
    const { departure, arrival, date, ecoType } = req.query;
    const query = 'SELECT * FROM rides WHERE departure = ? AND arrival = ? AND date = ? AND eco_type = ?';
    
    db.query(query, [departure, arrival, date, ecoType], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erreur lors de la récupération des covoiturages.' });
        }
        res.json(results);
    });
});
</script>


<script>
app.get('/api/rides/filter', (req, res) => {
    const { maxPrice, maxDuration, ecoType } = req.query;
    const query = 'SELECT * FROM rides WHERE price <= ? AND duration <= ? AND eco_type = ?';
    
    db.query(query, [maxPrice, maxDuration, ecoType], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erreur lors de l\'application des filtres.' });
        }
        res.json(results);
    });
});
</script>