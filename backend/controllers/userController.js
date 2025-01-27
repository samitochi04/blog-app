const { pool } = require('../config/db');

const userController = {
    getUserInfo: async (req, res) => {
        try {
            const query = 'SELECT id, username, role FROM users WHERE id = $1';
            const result = await pool.query(query, [req.user.userId]);
            
            if (result.rows.length === 0) {
                return res.status(404).json({ message: 'Utilisateur non trouvé' });
            }
            
            res.json(result.rows[0]);
        } catch (error) {
            res.status(500).json({ message: 'Erreur lors de la récupération des informations utilisateur', error: error.message });
        }
    },

    updateUserInfo: async (req, res) => {
        try {
            const { username } = req.body;
            const query = 'UPDATE users SET username = $1 WHERE id = $2 RETURNING id, username, role';
            const result = await pool.query(query, [username, req.user.userId]);
            
            if (result.rows.length === 0) {
                return res.status(404).json({ message: 'Utilisateur non trouvé' });
            }
            
            res.json(result.rows[0]);
        } catch (error) {
            res.status(500).json({ message: 'Erreur lors de la mise à jour des informations utilisateur', error: error.message });
        }
    },

    getAllUsers: (req, res) => {
        // Implementation needed
    },

    deleteUser: (req, res) => {
        // Implementation needed
    }
};

module.exports = userController;
