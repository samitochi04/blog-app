const mysql = require('mysql2');
const Blog = require('../models/Blog');

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const createBlog = (req, res) => {
  const { title, content } = req.body;
  const newBlog = new Blog(null, title, content, req.user.id);

  db.query('INSERT INTO blogs SET ?', newBlog, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Erreur lors de la création du post' });
    }
    res.status(201).json({ message: 'Post créé avec succès' });
  });
};

module.exports = { createBlog };