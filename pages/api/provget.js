import { pool } from "../../src/database";
export default async function getProvs(req, res) {
    if (req.method === 'POST') {
        try {
            let { prov, tel, correo } = req.body;
            const resul = await pool.query("INSERT INTO proveedores(IdProveedor, Telefono, Correo, FechaCreacion) VALUES (?, ?, ?, current_timestamp());", [prov, tel, correo]);
            console.log(resul);
            res.status(200).end();
        } catch (error) {
            console.log(error);
            res.status(500);
            res.send(error).end();
        }
    } else {
        try {
            const [rows] = await pool.query("SELECT * FROM proveedores;");
            res.json(rows);
        } catch (error) {
            console.log(error);
            res.status(500);
            res.send(error);
        }
    }
}