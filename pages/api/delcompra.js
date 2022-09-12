import { pool } from "../../src/database";

export default async function delCompra(req, res) {
    try {
        let { id } = req.body;
        await pool.query("DELETE FROM compras WHERE Codigo = ?;", [id]);
        res.status(200).end();
    } catch (error) {
        console.log(error);
        res.status(500);
        res.send(error).end();
    }
}