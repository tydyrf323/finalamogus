import { pool } from "../../src/database";
export default async function ventaBlur(req, res) {
    try {
        let { codigo } = req.query;
        const [rows] = await pool.query("SELECT * FROM compras WHERE codigo = ?;", [codigo]);
        res.json(rows);
    } catch (error) {
        console.log(error);
        res.status(500);
        res.send(error).end();
    }
}