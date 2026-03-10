 let userCredits = 20;
let ridePrice = 15;
let availableSeats = 2;

function participer() {

    if (userCredits < ridePrice) {
        alert("Vous n'avez pas suffisamment de crédits.");
        return;
    }

    if (availableSeats <= 0) {
        alert("Il n'y a plus de places.");
        return;
    }

    document.getElementById('confirmationModal').style.display = "block";
}

document.addEventListener("DOMContentLoaded", function(){

document.getElementById('confirmBtn').addEventListener('click', function(){

    userCredits -= ridePrice;
    availableSeats--;

    document.getElementById('userCredits').textContent =
    "Crédits disponibles : " + userCredits;

    document.getElementById('confirmationModal').style.display = "none";

    alert("Participation confirmée !");
});

document.getElementById('cancelBtn').addEventListener('click', function(){

    document.getElementById('confirmationModal').style.display = "none";

});

});