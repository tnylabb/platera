import * as mysql from 'mysql2/promise';

const connection = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'platera',
    port: 3306,
    connectionLimit: 10,
    waitForConnections: true,
    queueLimit: 0,
});

export default connection;