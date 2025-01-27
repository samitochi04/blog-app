const User = require('../models/User');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

const register = (req, res) => {
    const { username, password, role } = req.body;
    const hashedPassword = User.hashPassword(password);
    const newUser = { username, password: hashedPassword, role };

    db.query('INSERT INTO users SET ?', newUser, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Erreur lors de l\'inscription' });
        }
        res.status(201).json({ message: 'Utilisateur créé avec succès' });
    });
};

const login = (req, res) => {
    const { username, password } = req.body;

    db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Erreur lors de la connexion' });
        }

        if (results.length === 0 || !User.verifyPassword(results[0].password, password)) {
            return res.status(401).json({ message: 'Identifiants invalides' });
        }

        const token = jwt.sign({ id: results[0].id, role: results[0].role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    });
};

module.exports = { register, login };
