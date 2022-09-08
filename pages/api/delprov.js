import { pool } from "../../src/database";

export default async function provPost(req, res) {
    try {
        let { prov } = req.body;
        await pool.query("DELETE FROM proveedores WHERE IdProveedor = ?;", [prov]);
        res.status(200).end();
    } catch (error) {
        console.log(error);
        res.status(500);
        res.send(error).end();
    }
}