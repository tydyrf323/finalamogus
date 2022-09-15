import { pool } from "../../src/database";

export default async function prodedit(req, res) {
    try {
        let { id, prod } = req.body;
        await pool.query("UPDATE productos SET producto = ? WHERE id = ?;", [prod, id]);
        res.status(200).end();
    } catch (error) {
        console.log(error);
        res.status(500);
        res.send(error);
    }
}