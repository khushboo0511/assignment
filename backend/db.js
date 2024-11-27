const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

pool.on('connect', () => {
    console.log('Connected to PostgreSQL Database');
});

console.log('Database connected to:', pool.options.database);

pool.query('SELECT * FROM users', (err, result) => {
    if (err) {
        console.error('Query failed:', err.message);
    } else {
        console.log('Query result:', result.rows);
    }
});


(async () => {
    try {
        const result = await pool.query('SELECT NOW()');
        console.log('Database connected at:', result.rows[0].now);
    } catch (err) {
        console.error('Database connection error:', err.message);
    }
})();

module.exports = pool;
