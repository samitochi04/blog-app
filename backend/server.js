const express = require('express');
const dotenv = require('dotenv');
const mysql = require('mysql2');
const cors = require('cors');

// Middleware
const authMiddleware = require('./middleware/authMiddleware');

// Routes
const authRoutes = require('./routes/auth');
const blogRoutes = require('./routes/blogs');
const userRoutes = require('./routes/users');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());  // Pour pouvoir lire le corps des requêtes en JSON

// Connexion à la base de données MySQL
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

db.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à la base de données: ', err);
    } else {
        console.log('Connecté à la base de données MySQL');
    }
});

// Middleware pour la gestion de la connexion de l'utilisateur
app.use('/api/blogs', authMiddleware); // Protection des routes blogs par auth

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/blogs', blogRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Le serveur fonctionne sur le port ${port}`);
});
