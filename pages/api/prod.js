import { pool } from "../../src/database";
export default async function getProds(req, res) {
    if (req.method === 'POST') {
        try {
            let { prod, cod } = req.body;
            await pool.query("INSERT INTO productos(producto, codigo) VALUES (?, ?);", [prod, cod]);
            res.status(200).end();
        } catch (error) {
            console.log(error);
            res.status(500);
            res.send(error);
        }
    } else if(req.method === 'DELETE') {
        try {
            let { id } = req.body;
            await pool.query("DELETE FROM productos WHERE id = ?;", [id]);
            res.status(200).end();
        } catch (error) {
            console.log(error);
            res.status(500);
            res.send(error);
        }
    }
    else {
        try {
            const [rows] = await pool.query("SELECT * FROM productos;");
            res.json(rows);
        } catch (error) {
            console.log(error);
            res.status(500);
            res.send(error);
        }
    }
}