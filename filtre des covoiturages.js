<!-- Formulaire de filtres -->
<div class="mb-4">
    <h3>Filtres</h3>
    <form id="filtersForm" class="row g-3">
        <div class="col-md-3">
            <label for="ecological" class="form-label">Voyage écologique</label>
            <select id="ecological" class="form-select">
                <option value="">Tous</option>
                <option value="electric">Voiture électrique</option>
                <option value="non-electric">Autres</option>
            </select>
        </div>
        <div class="col-md-3">
            <label for="maxPrice" class="form-label">Prix maximum (€)</label>
            <input type="number" id="maxPrice" class="form-control" min="0" placeholder="Ex : 20">
        </div>
        <div class="col-md-3">
            <label for="maxDuration" class="form-label">Durée maximum (h)</label>
            <input type="number" id="maxDuration" class="form-control" min="0" placeholder="Ex : 3">
        </div>
        <div class="col-md-3">
            <label for="minRating" class="form-label">Note minimale</label>
            <select id="minRating" class="form-select">
                <option value="">Toutes</option>
                <option value="4">4★ et plus</option>
                <option value="3">3★ et plus</option>
                <option value="2">2★ et plus</option>
            </select>
        </div>
        <div class="d-flex justify-content-center mt-3">
            <button type="submit" class="btn btn-success">Appliquer les filtres</button>
        </div>
    </form>
</div>


document.getElementById('filtersForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Empêche le rechargement de la page

    const ecological = document.getElementById('ecological').value;
    const maxPrice = document.getElementById('maxPrice').value;
    const maxDuration = document.getElementById('maxDuration').value;
    const minRating = document.getElementById('minRating').value;

    // Fonction pour appliquer les filtres
    filterResults(ecological, maxPrice, maxDuration, minRating);
});

function filterResults(ecological, maxPrice, maxDuration, minRating) {
    // Logique pour appliquer les filtres sur les résultats
    const results = [
        // Exemples de résultats de covoiturages (à remplacer par des données dynamiques)
        { eco: "electric", price: 15, duration: 2, rating: 4, departure: "Ville A", arrival: "Ville B" },
        { eco: "non-electric", price: 25, duration: 3, rating: 5, departure: "Ville C", arrival: "Ville D" },
        // Autres résultats...
    ];

    // Filtrer selon les critères
    const filteredResults = results.filter(result => {
        return (
            (ecological ? result.eco === ecological : true) &&
            (maxPrice ? result.price <= maxPrice : true) &&
            (maxDuration ? result.duration <= maxDuration : true) &&
            (minRating ? result.rating >= minRating : true)
        );
    });

    // Afficher ou masquer les résultats en fonction des filtres appliqués
    if (filteredResults.length === 0) {
        document.getElementById('noResults').classList.remove('d-none');
    } else {
        document.getElementById('noResults').classList.add('d-none');
        displayResults(filteredResults);
    }
}

function displayResults(results) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = ''; // Vider les anciens résultats

    results.forEach(result => {
        const card = `
            <div class="card mb-3">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="driver_photo.jpg" class="img-fluid rounded-start" alt="Conducteur">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">Pseudo du chauffeur (${result.rating}★)</h5>
                            <p class="card-text">Départ : <strong>${result.departure}</strong></p>
                            <p class="card-text">Arrivée : <strong>${result.arrival}</strong></p>
                            <p class="card-text">Date : 2024-11-25</p>
                            <p class="card-text">Prix : <strong>${result.price}€</strong></p>
                            <p class="card-text"><small class="text-muted">Voiture ${result.eco === 'electric' ? 'électrique 🌱' : 'non électrique'}</small></p>
                            <button class="btn btn-primary">Détails</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        resultsContainer.innerHTML += card; // Ajouter chaque carte au conteneur
    });
}
