
// -----------------------------
// Données des covoiturages problématiques
// -----------------------------
const problematicRides = 

function suspendUser(userId) {
    alert(`L'utilisateur avec l'ID ${userId} a été suspendu.`);
    // Ici vous pouvez faire un fetch vers votre API pour réellement suspendre l'utilisateur
}

function viewDetails(rideId) {
    alert(`Affichage des détails du covoiturage avec l'ID ${rideId}.`);
    // Ici vous pouvez afficher un modal ou rediriger vers une page de détails
}

// -----------------------------
// Affichage des covoiturages problématiques
// -----------------------------
document.addEventListener('DOMContentLoaded', () => {
    const problematicRidesContainer = document.getElementById('problematicRides');
    const noProblematicRidesContainer = document.getElementById('noProblematicRides');

    if (problematicRides.length === 0) {
        noProblematicRidesContainer.style.display = "block";
    } else {
        noProblematicRidesContainer.style.display = "none";

        problematicRides.forEach(ride => {
            const rideCard = document.createElement('div');
            rideCard.classList.add('card', 'mb-3');
            rideCard.innerHTML = `
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${ride.vehicleImage}" class="img-fluid rounded-start" alt="Véhicule">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">Covoiturage ${ride.departure} → ${ride.arrival}</h5>
                            <p><strong>Conducteur :</strong> ${ride.driver}</p>
                            <p><strong>Problème :</strong> ${ride.issue}</p>
                            <p><strong>Passager :</strong> ${ride.passenger}</p>
                            <button class="btn btn-danger btn-sm" onclick="suspendUser(${ride.userId})">Suspension utilisateur</button>
                            <button class="btn btn-info btn-sm" onclick="viewDetails(${ride.rideId})">Voir détails</button>
                        </div>
                    </div>
                </div>
            `;
            problematicRidesContainer.appendChild(rideCard);
        });
    }
});

// -----------------------------
// Gestion du formulaire de création de voyage
// -----------------------------
const tripForm = document.getElementById('tripForm');
if (tripForm) {
    tripForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const departure = document.getElementById('departure').value;
        const arrival = document.getElementById('arrival').value;
        const price = document.getElementById('price').value;
        const vehicle = document.getElementById('vehicle').value;
        const newVehicle = document.getElementById('newVehicle') ? document.getElementById('newVehicle').value : '';

        if (!departure || !arrival || !price || (!vehicle && !newVehicle)) {
            alert("Veuillez remplir tous les champs !");
            return;
        }

        const selectedVehicle = vehicle || newVehicle;

        console.log("Voyage enregistré :");
        console.log("Départ :", departure);
        console.log("Arrivée :", arrival);
        console.log("Prix :", price + "€");
        console.log("Véhicule :", selectedVehicle);

        alert("Voyage créé avec succès !");

        tripForm.reset();
        const addVehicleSection = document.getElementById('addVehicleSection');
        if (addVehicleSection) addVehicleSection.style.display = "none";
    });
}

// -----------------------------
// Gestion de la sélection du véhicule
// -----------------------------
const vehicleSelect = document.getElementById('vehicle');
if (vehicleSelect) {
    vehicleSelect.addEventListener('change', () => {
        const addVehicleSection = document.getElementById('addVehicleSection');
        if (vehicleSelect.value === "") {
            addVehicleSection.style.display = "block";
        } else {
            addVehicleSection.style.display = "none";
        }
    });
}
