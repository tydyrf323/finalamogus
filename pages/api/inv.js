import { pool } from "../../src/database";
export default async function invController(req, res) {
    let { tabla, datos, dc } = req.query;
    console.log(tabla, datos, dc);
    try {
        if (dc === 'CODIGO') {
            const [rows] = await pool.query(`SELECT * FROM ${tabla} WHERE Codigo like '${datos}%';`);
            res.json(rows);
        }
        else {
            const [rows] = await pool.query(`SELECT * FROM ${tabla} WHERE Descripcion like '${datos}%';`);
            res.json(rows);
        }
    } catch (error) {
        console.log(error);
        res.status(500);
        res.send(error);
    }
}