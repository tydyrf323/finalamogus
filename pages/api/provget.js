import { pool } from "../../src/database";
export default async function getProvs(_, res) {
    try {
        const [rows] = await pool.query("SELECT * FROM proveedores;");
        res.json(rows);
    } catch (error) {
        console.log(error);
        res.status(500);
        res.send(error);
    }
}