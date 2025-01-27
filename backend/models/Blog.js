const { pool } = require('../config/db');

class Blog {
    static async createTable() {
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS blogs (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                content TEXT NOT NULL,
                user_id INT REFERENCES users(id) ON DELETE SET NULL,
                created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
            );
        `;
        
        try {
            await pool.query(createTableQuery);
        } catch (error) {
            console.error('Erreur lors de la création de la table blogs:', error);
            throw error;
        }
    }

    static async create(blogData) {
        const { title, content, user_id } = blogData;
        const query = `
            INSERT INTO blogs (title, content, user_id)
            VALUES ($1, $2, $3)
            RETURNING id, title, content, user_id, created_at
        `;
        
        try {
            const result = await pool.query(query, [title, content, user_id]);
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    }

    static async findAll() {
        const query = `
            SELECT b.*, u.username 
            FROM blogs b 
            LEFT JOIN users u ON b.user_id = u.id 
            ORDER BY b.created_at DESC
        `;
        try {
            const result = await pool.query(query);
            return result.rows;
        } catch (error) {
            throw error;
        }
    }

    static async findById(id) {
        const query = `
            SELECT b.*, u.username 
            FROM blogs b 
            LEFT JOIN users u ON b.user_id = u.id 
            WHERE b.id = $1
        `;
        try {
            const result = await pool.query(query, [id]);
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    }

    static async update(id, blogData) {
        const { title, content } = blogData;
        const query = `
            UPDATE blogs 
            SET title = $1, content = $2
            WHERE id = $3
            RETURNING *
        `;
        try {
            const result = await pool.query(query, [title, content, id]);
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    }

    static async delete(id) {
        const query = 'DELETE FROM blogs WHERE id = $1';
        try {
            await pool.query(query, [id]);
            return true;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Blog;
