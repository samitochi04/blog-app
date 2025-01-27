const mysql = require('mysql2');
const Blog = require('../models/Blog');

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Créer un blog
const createBlog = (req, res) => {
  const { title, content } = req.body;
  const newBlog = { title, content, userId: req.user.id };

  db.query('INSERT INTO blogs SET ?', newBlog, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Erreur lors de la création du blog' });
    }
    res.status(201).json({ message: 'Blog créé avec succès' });
  });
};

// Récupérer tous les blogs
const getAllBlogs = (req, res) => {
  db.query('SELECT * FROM blogs', (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Erreur lors de la récupération des blogs' });
    }
    res.json(results);
  });
};

// Mettre à jour un blog
const updateBlog = (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  db.query('UPDATE blogs SET title = ?, content = ? WHERE id = ?', [title, content, id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Erreur lors de la mise à jour du blog' });
    }
    res.json({ message: 'Blog mis à jour avec succès' });
  });
};

// Supprimer un blog
const deleteBlog = (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM blogs WHERE id = ?', [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Erreur lors de la suppression du blog' });
    }
    res.json({ message: 'Blog supprimé avec succès' });
  });
};

module.exports = { createBlog, getAllBlogs, updateBlog, deleteBlog };
