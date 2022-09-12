import { pool } from "../../src/database";

export default async function compraFilter(req, res) {
    try {
        let { prefix } = req.query;
        console.log(prefix);
        const [rows] = await pool.query(`SELECT COUNT(*) FROM compras WHERE codigo like '${prefix}%';`);
        res.json(rows);
    } catch (error) {
        console.log(error);
        res.status(500);
        res.send(error);
    }
}