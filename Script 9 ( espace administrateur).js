<script>
// Fonction pour afficher la liste des utilisateurs
function viewUsers() {
    alert("Affichage de la liste des utilisateurs.");

    // Logique pour récupérer la liste des utilisateurs via une API backend
    // Exemple : fetch('/api/admin/users').then(response => response.json()).then(data => {});

    // Affichage simulé ici
    console.log("Liste des utilisateurs récupérée.");
}

// Fonction pour suspendre un utilisateur
function suspendUser() {
    const userId = prompt("Entrez l'ID de l'utilisateur à suspendre :");

    if (userId) {
        alert(`L'utilisateur avec l'ID ${userId} a été suspendu.`);

        // Logique pour suspendre l'utilisateur via une API backend
        // Exemple : fetch('/api/admin/suspend-user', { method: 'POST', body: JSON.stringify({ userId }) });

        console.log(`Utilisateur ${userId} suspendu.`);
    } else {
        alert("Aucun ID d'utilisateur fourni.");
    }
}

// Fonction pour afficher la liste des employés
function viewEmployees() {
    alert("Affichage de la liste des employés.");

    // Logique pour récupérer la liste des employés via une API backend
    // Exemple : fetch('/api/admin/employees').then(response => response.json()).then(data => {});

    console.log("Liste des employés récupérée.");
}

// Fonction pour suspendre un employé
function suspendEmployee() {
    const employeeId = prompt("Entrez l'ID de l'employé à suspendre :");

    if (employeeId) {
        alert(`L'employé avec l'ID ${employeeId} a été suspendu.`);

        // Logique pour suspendre l'employé via une API backend
        // Exemple : fetch('/api/admin/suspend-employee', { method: 'POST', body: JSON.stringify({ employeeId }) });

        console.log(`Employé ${employeeId} suspendu.`);
    } else {
        alert("Aucun ID d'employé fourni.");
    }
}

// Fonction pour voir les statistiques des covoiturages
function viewStats() {
    alert("Affichage des statistiques des covoiturages.");

    // Logique pour récupérer les statistiques via une API backend
    // Exemple : fetch('/api/admin/statistics').then(response => response.json()).then(data => {});

    console.log("Statistiques des covoiturages récupérées.");
}
</script>

<script>
app.get('/api/admin/users', (req, res) => {
    // Logique pour récupérer tous les utilisateurs
    db.query('SELECT * FROM users', (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs.' });
        }
        res.json(results);
    });
});
</script>

<script>
app.post('/api/admin/suspend-user', (req, res) => {
    const { userId } = req.body;

    // Logique pour suspendre l'utilisateur
    db.query('UPDATE users SET status = "suspended" WHERE id = ?', [userId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erreur lors de la suspension de l\'utilisateur.' });
        }
        res.json({ message: 'Utilisateur suspendu avec succès.' });
    });
});
</script>

<script>
app.get('/api/admin/employees', (req, res) => {
    // Logique pour récupérer tous les employés
    db.query('SELECT * FROM employees', (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erreur lors de la récupération des employés.' });
        }
        res.json(results);
    });
});
</script>

<script>
app.post('/api/admin/suspend-employee', (req, res) => {
    const { employeeId } = req.body;

    // Logique pour suspendre l'employé
    db.query('UPDATE employees SET status = "suspended" WHERE id = ?', [employeeId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erreur lors de la suspension de l\'employé.' });
        }
        res.json({ message: 'Employé suspendu avec succès.' });
    });
});
</script>

<script>
app.get('/api/admin/statistics', (req, res) => {
    const query = `
        SELECT 
            (SELECT COUNT(*) FROM rides) AS rideCount,
            (SELECT COUNT(DISTINCT user_id) FROM users) AS userCount
    `;
    
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erreur lors de la récupération des statistiques.' });
        }
        res.json(results);
    });
});

</script>
