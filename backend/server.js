const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { pool } = require('./config/db');

// Routes
const authRoutes = require('./routes/auth');
const blogRoutes = require('./routes/blogs');
const userRoutes = require('./routes/users');

// Middleware
const { authMiddleware } = require('./middleware/authMiddleware');

dotenv.config();

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
}));
app.use(express.json());

// Test de connexion à la base de données
pool.connect((err, client, release) => {
    if (err) {
        console.error('Erreur de connexion à PostgreSQL:', err);
    } else {
        console.log('Connecté à PostgreSQL avec succès');
        release();
    }
});

// Routes publiques
app.use('/api/auth', authRoutes);

// Routes protégées
app.use('/api/blogs', authMiddleware, blogRoutes);
app.use('/api/users', authMiddleware, userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
