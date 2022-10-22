import { pool } from "../../src/database";
export default async function miscForm(req, res) {
    if(req.method === 'GET') {
        try {
            const [rows] = await pool.query("SELECT porcentaje FROM misc;");
            res.json(rows);
        } catch (error) {
            console.log(error);
            res.status(500);
            res.send(error);
        }
    }
}