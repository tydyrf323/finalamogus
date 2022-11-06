import { pool } from "../../src/database";
export default async function multiplicar(req, res) {
    let { cod } = req.query;
    try {
        const [rows] = await pool.query("SELECT PrecioDeVenta from tienda WHERE Codigo = ?", [cod]);
        res.json(rows);
    } catch (error) {
        console.log(error);
        res.status(500);
        res.send(error);
    }
}