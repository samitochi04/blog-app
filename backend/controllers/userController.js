const mysql = require('mysql2');
const User = require('../models/User');

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});



const getUserInfo = (req, res) => {
    const userId = req.user.id;

    db.query('SELECT id, username, role FROM users WHERE id = ?', [userId], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Erreur lors de la récupération des informations utilisateur' });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        res.json(result[0]);
    });
};


const updateUserInfo = (req, res) => {
    const { username, password, role } = req.body;
    const userId = req.user.id;

    let updateData = { username, role };

    if (password) {
        updateData.password = User.hashPassword(password);

        db.query('UPDATE users SET ? WHERE id = ?', [updateData, userId], (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Erreur lors de la mise à jour des informations' });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Utilisateur non trouvé' });
            }

            res.json({ message: 'Informations mises à jour avec succès' });
        });
    };


    const getAllUsers = (req, res) => {
        db.query('SELECT id, username, role FROM users', (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs' });
            }

            res.json(result);
        });
    };


    const deleteUser = (req, res) => {
        const userId = req.params.id;

        db.query('DELETE FROM users WHERE id = ?', [userId], (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Erreur lors de la suppression de l\'utilisateur' });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Utilisateur non trouvé' });
            }

            res.json({ message: 'Utilisateur supprimé avec succès' });
        });
    };

    module.exports = { getUserInfo, updateUserInfo, getAllUsers, deleteUser };
