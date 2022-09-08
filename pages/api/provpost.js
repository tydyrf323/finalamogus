import { pool } from "../../src/database";

export default async function provPost(req, res) {
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
}