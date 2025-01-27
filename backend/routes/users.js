const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware');
const { pool } = require('../config/db');

router.get('/me', authMiddleware, userController.getUserInfo);

router.put('/me', authMiddleware, userController.updateUserInfo);

// Obtenir la liste des utilisateurs (admin seulement)
router.get('/', authMiddleware, isAdmin, async (req, res) => {
    try {
        const query = 'SELECT id, username, role FROM users';
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs', error: error.message });
    }
});

// Obtenir un utilisateur par ID (admin seulement)
router.get('/:id', authMiddleware, isAdmin, async (req, res) => {
    try {
        const query = 'SELECT id, username, role FROM users WHERE id = $1';
        const result = await pool.query(query, [req.params.id]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération de l\'utilisateur', error: error.message });
    }
});

// Supprimer un utilisateur (admin seulement)
router.delete('/:id', authMiddleware, isAdmin, async (req, res) => {
    try {
        const query = 'DELETE FROM users WHERE id = $1 RETURNING *';
        const result = await pool.query(query, [req.params.id]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        
        res.json({ message: 'Utilisateur supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression de l\'utilisateur', error: error.message });
    }
});

module.exports = router;
