import { pool } from "../../src/database";

export default async function compraFilter(req, res) {
    try {
        let { prefix } = req.query;
        const [rows] = await pool.query(`SELECT Codigo FROM compras WHERE Codigo LIKE '${prefix}%' ORDER BY IdCompra DESC;`);
        res.json(rows);
    } catch (error) {
        console.log(error);
        res.status(500);
        res.send(error);
    }
}