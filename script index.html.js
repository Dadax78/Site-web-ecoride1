 document.getElementById('tripForm').addEventListener('submit', function (e) {
        e.preventDefault(); // Empêche l'envoi du formulaire
    
        const departure = document.getElementById('departure').value;
        const arrival = document.getElementById('arrival').value;
        const price = document.getElementById('price').value;
        const vehicle = document.getElementById('vehicle').value;
    
        // Validation des champs
        if (!departure || !arrival || !price || !vehicle) {
            alert("Veuillez remplir tous les champs !");
            return;
        }
    
        // Affichage des données saisies
        console.log("Voyage enregistré : ");
        console.log("Départ :", departure);
        console.log("Arrivée :", arrival);
        console.log("Prix :", price + "€");
        console.log("Véhicule :", vehicle);
    
        // Vous pouvez ici envoyer les données au serveur pour enregistrer le voyage
        // Exemple : appel à l'API de création de voyage (backend)
        // fetch('/api/create-trip', { method: 'POST', body: JSON.stringify({ departure, arrival, price, vehicle }) });
    
        alert("Voyage créé avec succès !");
    
        // Réinitialiser le formulaire
        document.getElementById('tripForm').reset();
    });
   
    
    <!-- Si l'utilisateur n'a pas de véhicule sélectionné, il peut ajouter un nouveau véhicule -->
    <div class="mb-3" id="addVehicleSection" style="display: none;">
        <label for="newVehicle" class="form-label">Ajouter un véhicule</label>
        <input type="text" class="form-control" id="newVehicle" placeholder="Ex : Audi Q7" required>
    </div>
    
    <script>
    document.getElementById('vehicle').addEventListener('change', function () {
        const vehicleSelect = document.getElementById('vehicle');
        const addVehicleSection = document.getElementById('addVehicleSection');
    
        if (vehicleSelect.value === "") {
            // Si aucun véhicule n'est sélectionné, afficher le champ pour ajouter un véhicule
            addVehicleSection.style.display = "block";
        } else {
            // Sinon, cacher l'option d'ajouter un véhicule
            addVehicleSection.style.display = "none";
        }
    });
    </script>
    
    <script>
    app.post('/api/create-ride', (req, res) => {
        const { departure, arrival, price, vehicle, userId } = req.body;
        const query = 'INSERT INTO rides (departure, arrival, price, vehicle, user_id) VALUES (?, ?, ?, ?, ?)';
        
            if (err) {
                return res.status(500).json({ error: 'Erreur lors de la création du covoiturage.' });
            }
            res.status(201).json({ message: 'Covoiturage créé avec succès.' });
        });
    });
    </script>

  <script>
  app.get('/api/home', (req, res) => {
    const query = 'SELECT COUNT(*) AS rideCount FROM rides WHERE status = "available"';
    
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erreur lors de la récupération des informations pour la page d\'accueil.' });
        }
        res.json(results);
    });
});


    
    fetch('http://localhost:3000/api/users') // URL de l'API
  .then(response => response.json())
  .then(data => console.log(data)) // Affiche les données dans la console
  .catch(error => console.error('Erreur:', error));
  





let map;
let directionsService;
let directionsRenderer;

function initMap() {
  // Créer la carte et l'afficher
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 48.8566, lng: 2.3522 }, // Coordonnées de Paris par défaut
    zoom: 13,c
  });

  // Initialiser le service et le rendu des directions
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();
  directionsRenderer.setMap(map);
}

// Fonction pour calculer et afficher l'itinéraire

function calculateRoute() {
  const start = document.getElementById("start").value;
  const end = document.getElementById("end").value;

  if (!start || !end) {
    alert("Veuillez entrer un point de départ et une destination.");
    return;
  }

  const request = {
    origin: start,
    destination: end,
    travelMode: google.maps.TravelMode.DRIVING, // Vous pouvez changer pour WALKING ou BICYCLING
  };

  directionsService.route(request, (result, status) => {
    if (status === "OK") {
      directionsRenderer.setDirections(result);
    } else {
      alert("Impossible de trouver un itinéraire.");
    }
  });
}

// Attacher l'événement au bouton de recherche
document.getElementById("search-btn").addEventListener("click", calculateRoute);

// Charger la carte
window.initMap = initMap;


