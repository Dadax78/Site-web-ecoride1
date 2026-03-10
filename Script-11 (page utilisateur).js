
// Fonction pour modifier les préférences
document.getElementById('preferencesForm').addEventListener('submit', function (e) {
    e.preventDefault();  // Empêche la soumission du formulaire

    const isDriver = document.getElementById('isDriver').checked;
    const isPassenger = document.getElementById('isPassenger').checked;

    // Affichage ou masquage de la section véhicules si l'utilisateur est conducteur
    document.getElementById('vehicleSection').style.display = isDriver ? 'block' : 'none';

    alert('Préférences enregistrées !');
});

// Fonction pour ajouter un véhicule
document.getElementById('vehicleForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const vehicleModel = document.getElementById('vehicleModel').value;
    const vehicleYear = document.getElementById('vehicleYear').value;
    const vehicleSeats = document.getElementById('vehicleSeats').value;

    // Enregistrer les données dans la base de données (backend) ici

    alert(`Véhicule ajouté : ${vehicleModel}, ${vehicleYear} avec ${vehicleSeats} places`);
    // Réinitialiser le formulaire
    document.getElementById('vehicleForm').reset();
});

// Fonction pour changer le mot de passe
document.getElementById('changePasswordForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const newPassword = document.getElementById('newPassword').value;
    const confirmNewPassword = document.getElementById('confirmNewPassword').value;

    if (newPassword !== confirmNewPassword) {
        alert("Les mots de passe ne correspondent pas !");
        return;
    }

    // Enregistrer le nouveau mot de passe dans la base de données (backend) ici

    alert("Mot de passe modifié avec succès !");
    // Fermer le modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('changePasswordModal'));
    modal.hide();
});

app.put('/api/update-profile', (req, res) => {
    const { userId, pseudo, email, password } = req.body;
    const query = 'UPDATE users SET pseudo = ?, email = ?, password = ? WHERE id = ?';

    db.query(query, [pseudo, email, password, userId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erreur lors de la mise à jour du profil.' });
        }
        res.json({ message: 'Profil mis à jour avec succès.' });
    });
});