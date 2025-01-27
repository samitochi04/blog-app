const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { pool } = require('../config/db');

// Route d'inscription normale
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const query = 'INSERT INTO users (username, password, role) VALUES ($1, $2, $3) RETURNING id, username, role';
        const result = await pool.query(query, [username, hashedPassword, 'user']);
        
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de l\'inscription', error: error.message });
    }
});

// Route d'inscription admin (protégée par clé secrète)
router.post('/register-admin', async (req, res) => {
    try {
        const { username, password, adminKey } = req.body;
        
        console.log('Tentative d\'inscription admin avec la clé:', adminKey);
        console.log('Clé attendue:', process.env.ADMIN_SECRET_KEY);
        
        // Vérifier la clé admin
        if (adminKey !== process.env.ADMIN_SECRET_KEY) {
            console.log('Clé admin invalide');
            return res.status(403).json({ message: 'Clé admin invalide' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const query = 'INSERT INTO users (username, password, role) VALUES ($1, $2, $3) RETURNING id, username, role';
        const result = await pool.query(query, [username, hashedPassword, 'admin']);
        
        console.log('Admin créé avec succès:', result.rows[0]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Erreur lors de l\'inscription admin:', error);
        res.status(500).json({ 
            message: 'Erreur lors de l\'inscription admin', 
            error: error.message 
        });
    }
});

// Route de connexion
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        const query = 'SELECT * FROM users WHERE username = $1';
        const result = await pool.query(query, [username]);
        
        if (result.rows.length === 0) {
            return res.status(401).json({ message: 'Identifiants invalides' });
        }
        
        const user = result.rows[0];
        const validPassword = await bcrypt.compare(password, user.password);
        
        if (!validPassword) {
            return res.status(401).json({ message: 'Identifiants invalides' });
        }
        
        const token = jwt.sign(
            { userId: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );
        
        res.json({
            token,
            user: {
                id: user.id,
                username: user.username,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la connexion', error: error.message });
    }
});

module.exports = router;
