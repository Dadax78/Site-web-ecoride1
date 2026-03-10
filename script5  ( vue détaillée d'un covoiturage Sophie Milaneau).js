
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



document.getElementById('reviewForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Empêche le rechargement de la page

    const rating = document.getElementById('rating').value;
    const comment = document.getElementById('comment').value;

    // Valider que l'utilisateur a bien rempli les champs
    if (!rating || !comment) {
        alert("Veuillez remplir tous les champs !");
        return;
    }

    // Ajouter l'avis dans le tableau de données
    const newReview = {
        user: "Utilisateur Actuel", // Remplacer par l'utilisateur actuel
        rating: parseInt(rating),
        comment: comment,
        date: new Date().toLocaleDateString()
    };

    // Ajouter l'avis à l'affichage
    addReviewToPage(newReview);

    // Réinitialiser le formulaire
    document.getElementById('reviewForm').reset();
});

function addReviewToPage(review) {
    const reviewsContainer = document.querySelector('.list-group');
    const reviewHTML = `
        <div class="list-group-item">
            <h5 class="mb-1">${review.user} (${review.rating}★)</h5>
            <p class="mb-1">${review.comment}</p>
            <small class="text-muted">Déposé le ${review.date}</small>
        </div>
    `;
    reviewsContainer.innerHTML += reviewHTML;
}


const pseudo = document.getElementById('pseudo').value;


// Données fictives
const rideDetails = {
    driver: "Jean Dupont",
    rating: 4.5,
    departure: "Ville A",
    arrival: "Ville B",
    date: "2024-11-25",
    price: 15,
    duration: "2h30",
    car: "Tesla Model 3 (2021)",
    eco: true,
    preferences: "Non-fumeur, pas d'animaux",
    reviews: [
        { user: "Marie", rating: 5, comment: "Super chauffeur, très ponctuel et sympathique !", date: "2024-11-20" },
        { user: "Alex", rating: 4, comment: "Voyage agréable, mais la musique était un peu forte.", date: "2024-11-18" }
    ]
};

// Remplir les détails du covoiturage
document.addEventListener('DOMContentLoaded', () => {
    const cardBody = document.querySelector('.card-body');
    const reviewsContainer = document.querySelector('.list-group');

    // Mettre à jour les informations du covoiturage
    cardBody.innerHTML = `
        <h5 class="card-title">${rideDetails.driver} (${rideDetails.rating}★)</h5>
        <p class="card-text"><strong>Départ :</strong> ${rideDetails.departure}</p>
        <p class="card-text"><strong>Arrivée :</strong> ${rideDetails.arrival}</p>
        <p class="card-text"><strong>Date :</strong> ${rideDetails.date}</p>
        <p class="card-text"><strong>Prix :</strong> ${rideDetails.price}€</p>
        <p class="card-text"><strong>Durée :</strong> ${rideDetails.duration}</p>
        <p class="card-text"><small class="text-muted">Voiture ${rideDetails.eco ? 'électrique 🌱' : 'non électrique'} : ${rideDetails.car}</small></p>
        <p class="card-text"><strong>Préférences :</strong> ${rideDetails.preferences}</p>
        <a href="#" class="btn btn-primary">Participer</a>
    `;

    // Ajouter les avis
    rideDetails.reviews.forEach(review => {
        const reviewHTML = `
            <div class="list-group-item">
                <h5 class="mb-1">${review.user} (${review.rating}★)</h5>
                <p class="mb-1">${review.comment}</p>
                <small class="text-muted">Déposé le ${review.date}</small>
            </div>
        `;
        reviewsContainer.innerHTML += reviewHTML;
    });
});

document.getElementById('reviewForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Empêche le rechargement de la page

    const rating = document.getElementById('rating').value;
    const comment = document.getElementById('comment').value;
    const pseudo = document.getElementById('pseudo').value; // Récupération du pseudo

    // Valider que l'utilisateur a bien rempli les champs
    if (!pseudo || !rating || !comment) {
        alert("Veuillez remplir tous les champs !");
        return;
    }

    // Ajouter l'avis dans le tableau de données
    const newReview = {
        user: pseudo, // Utilisation du pseudo saisi
        rating: parseInt(rating),
        comment: comment,
        date: new Date().toLocaleDateString()
    };

    // Ajouter l'avis à l'affichage
    addReviewToPage(newReview);

    // Réinitialiser le formulaire
    document.getElementById('reviewForm').reset();
});

function addReviewToPage(review) {
    const reviewsContainer = document.querySelector('.list-group');
    const reviewHTML = `
        <div class="list-group-item">
            <h5 class="mb-1">${review.user} (${review.rating}★)</h5>
            <p class="mb-1">${review.comment}</p>
            <small class="text-muted">Déposé le ${review.date}</small>
        </div>
    `;
    reviewsContainer.innerHTML += reviewHTML;
}

app.get('/api/ride/:rideId', (req, res) => {
    const rideId = req.params.rideId;
    const query = 'SELECT * FROM rides WHERE id = ?';
    
    db.query(query, [rideId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erreur lors de la récupération des détails du covoiturage.' });
        }
        res.json(results);
    });
});

document.getElementById('reviewForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Empêche le rechargement de la page

    const rating = document.getElementById('rating').value;
    const comment = document.getElementById('comment').value;

    // Valider que l'utilisateur a bien rempli les champs
    if (!rating || !comment) {
        alert("Veuillez remplir tous les champs !");
        return;
    }

    // Ajouter l'avis dans le tableau de données
    const newReview = {
        user: "Utilisateur Actuel", // Remplacer par l'utilisateur actuel
        rating: parseInt(rating),
        comment: comment,
        date: new Date().toLocaleDateString()
    };

    // Ajouter l'avis à l'affichage
    addReviewToPage(newReview);

    // Réinitialiser le formulaire
    document.getElementById('reviewForm').reset();
});

function addReviewToPage(review) {
    const reviewsContainer = document.querySelector('.list-group');
    const reviewHTML = `
        <div class="list-group-item">
            <h5 class="mb-1">${review.user} (${review.rating}★)</h5>
            <p class="mb-1">${review.comment}</p>
            <small class="text-muted">Déposé le ${review.date}</small>
        </div>
    `;
    reviewsContainer.innerHTML += reviewHTML;
}


const pseudo = document.getElementById('pseudo').value;


// Données fictives
const rideDetails = {
    driver: "Jean Dupont",
    rating: 4.5,
    departure: "Ville A",
    arrival: "Ville B",
    date: "2024-11-25",
    price: 15,
    duration: "2h30",
    car: "Tesla Model 3 (2021)",
    eco: true,
    preferences: "Non-fumeur, pas d'animaux",
    reviews: [
        { user: "Marie", rating: 5, comment: "Super chauffeur, très ponctuel et sympathique !", date: "2024-11-20" },
        { user: "Alex", rating: 4, comment: "Voyage agréable, mais la musique était un peu forte.", date: "2024-11-18" }
    ]
};

// Remplir les détails du covoiturage
document.addEventListener('DOMContentLoaded', () => {
    const cardBody = document.querySelector('.card-body');
    const reviewsContainer = document.querySelector('.list-group');

    // Mettre à jour les informations du covoiturage
    cardBody.innerHTML = `
        <h5 class="card-title">${rideDetails.driver} (${rideDetails.rating}★)</h5>
        <p class="card-text"><strong>Départ :</strong> ${rideDetails.departure}</p>
        <p class="card-text"><strong>Arrivée :</strong> ${rideDetails.arrival}</p>
        <p class="card-text"><strong>Date :</strong> ${rideDetails.date}</p>
        <p class="card-text"><strong>Prix :</strong> ${rideDetails.price}€</p>
        <p class="card-text"><strong>Durée :</strong> ${rideDetails.duration}</p>
        <p class="card-text"><small class="text-muted">Voiture ${rideDetails.eco ? 'électrique 🌱' : 'non électrique'} : ${rideDetails.car}</small></p>
        <p class="card-text"><strong>Préférences :</strong> ${rideDetails.preferences}</p>
        <a href="#" class="btn btn-primary">Participer</a>
    `;

    // Ajouter les avis
    rideDetails.reviews.forEach(review => {
        const reviewHTML = `
            <div class="list-group-item">
                <h5 class="mb-1">${review.user} (${review.rating}★)</h5>
                <p class="mb-1">${review.comment}</p>
                <small class="text-muted">Déposé le ${review.date}</small>
            </div>
        `;
        reviewsContainer.innerHTML += reviewHTML;
    });
});

document.getElementById('reviewForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Empêche le rechargement de la page

    const rating = document.getElementById('rating').value;
    const comment = document.getElementById('comment').value;
    const pseudo = document.getElementById('pseudo').value; // Récupération du pseudo

    // Valider que l'utilisateur a bien rempli les champs
    if (!pseudo || !rating || !comment) {
        alert("Veuillez remplir tous les champs !");
        return;
    }

    // Ajouter l'avis dans le tableau de données
    const newReview = {
        user: pseudo, // Utilisation du pseudo saisi
        rating: parseInt(rating),
        comment: comment,
        date: new Date().toLocaleDateString()
    };

    // Ajouter l'avis à l'affichage
    addReviewToPage(newReview);

    // Réinitialiser le formulaire
    document.getElementById('reviewForm').reset();
});

function addReviewToPage(review) {
    const reviewsContainer = document.querySelector('.list-group');
    const reviewHTML = `
        <div class="list-group-item">
            <h5 class="mb-1">${review.user} (${review.rating}★)</h5>
            <p class="mb-1">${review.comment}</p>
            <small class="text-muted">Déposé le ${review.date}</small>
        </div>
    `;
    reviewsContainer.innerHTML += reviewHTML;
}

app.get('/api/ride/:rideId', (req, res) => {
    const rideId = req.params.rideId;
    const query = 'SELECT * FROM rides WHERE id = ?';
    
    db.query(query, [rideId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erreur lors de la récupération des détails du covoiturage.' });
        }
        res.json(results);
    });
});
