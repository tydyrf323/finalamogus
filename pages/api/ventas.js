import { pool } from "../../src/database";
export default async function ventasHandler(req, res) {
    if (req.method === 'GET') {
        try {
            const [rows] = await pool.query("SELECT * FROM ventas;");
            res.json(rows);
        } catch (error) {
            console.log(error);
            res.status(500).end();
        }
    }
    else if (req.method === 'POST') {
        try {
            
        } catch (error) {
            
        }
    }
}