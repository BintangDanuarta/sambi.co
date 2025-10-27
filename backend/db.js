const fs = require('fs');
const mysql = require('mysql2');

const dbConfig = {
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'defaultdb',
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

// optional SSL for Aiven
if (process.env.DB_SSL === 'true' || process.env.DB_SSL === '1') {
  dbConfig.ssl = { rejectUnauthorized: true };
  if (process.env.DB_SSL_CA_PATH) {
    dbConfig.ssl.ca = fs.readFileSync(process.env.DB_SSL_CA_PATH);
  }
}

const pool = mysql.createPool(dbConfig);

// export pool (callback style .query) so existing models using db.query(...) keep working
module.exports = pool;