const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware');
const { pool } = require('../config/db');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/admin-auth');

// Obtenir tous les blogs (accessible à tous)
router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.findAll();
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des blogs', error: error.message });
    }
});

// Obtenir un blog par ID (accessible à tous)
router.get('/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog non trouvé' });
        }
        res.json(blog);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération du blog', error: error.message });
    }
});

// Créer un blog (admin seulement)
router.post('/', auth, adminAuth, async (req, res) => {
    try {
        const { title, content } = req.body;
        const userId = req.user.userId; // Obtenu du middleware auth

        const query = `
            INSERT INTO blogs (title, content, user_id) 
            VALUES ($1, $2, $3) 
            RETURNING id, title, content, user_id, created_at
        `;
        
        const result = await pool.query(query, [title, content, userId]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Erreur création blog:', error);
        res.status(500).json({ 
            message: 'Erreur lors de la création du blog',
            error: error.message 
        });
    }
});

// Modifier un blog (admin seulement)
router.put('/:id', authMiddleware, isAdmin, async (req, res) => {
    try {
        const { title, content } = req.body;
        const blog = await Blog.update(req.params.id, { title, content });
        if (!blog) {
            return res.status(404).json({ message: 'Blog non trouvé' });
        }
        res.json(blog);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la modification du blog', error: error.message });
    }
});

// Supprimer un blog (admin seulement)
router.delete('/:id', authMiddleware, isAdmin, async (req, res) => {
    try {
        const success = await Blog.delete(req.params.id);
        if (!success) {
            return res.status(404).json({ message: 'Blog non trouvé' });
        }
        res.json({ message: 'Blog supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression du blog', error: error.message });
    }
});

module.exports = router;