import mysql from 'mysql2/promise';

export const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
const conn = async () => {
    await pool.getConnection((err, connection) => {
        if (err) console.log(err.code);
        if(connection) connection.release();
        console.log('god');
        return;
    })
}
conn();