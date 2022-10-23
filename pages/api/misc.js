import { pool } from "../../src/database";
export default async function miscForm(req, res) {
    if(req.method === 'GET') {
        try {
            const [rows] = await pool.query("SELECT * FROM misc;");
            res.json(rows);
        } catch (error) {
            console.log(error);
            res.status(500);
            res.send(error);
        }
    }
    else {
        let { row, data } = req.body;
        try {
            await pool.query(`UPDATE misc SET ${row} = ?;`, [data]);
            return res.status(201).end();
        } catch (error) {
            console.log(error);
            res.status(500);
            res.send(error);
        }
    }
}