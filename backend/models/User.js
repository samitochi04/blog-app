const bcrypt = require('bcryptjs');
const { pool } = require('../config/db');

class User {
    static async createTable() {
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(50) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                role VARCHAR(50) DEFAULT 'user'
            );
        `;
        
        try {
            await pool.query(createTableQuery);
        } catch (error) {
            console.error('Erreur lors de la création de la table users:', error);
            throw error;
        }
    }

    static async create(userData) {
        const { username, password, role = 'user' } = userData;
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const query = `
            INSERT INTO users (username, password, role)
            VALUES ($1, $2, $3)
            RETURNING id, username, role
        `;
        
        try {
            const result = await pool.query(query, [username, hashedPassword, role]);
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    }

    static async findByUsername(username) {
        const query = 'SELECT * FROM users WHERE username = $1';
        try {
            const result = await pool.query(query, [username]);
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    }

    static async verifyPassword(storedPassword, inputPassword) {
        return bcrypt.compare(inputPassword, storedPassword);
    }
}

module.exports = User;
