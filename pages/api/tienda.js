import { pool } from "../../src/database";
export default async function tiendaController(req, res) {
    if (req.method === 'POST') {
        try {
            let { cantidad, cod, proveedor, descripcion, observacion, venta } = req.body;
            const [rows] = await pool.query("UPDATE compras SET cantidad = (CASE WHEN ? <= cantidad THEN cantidad - ? ELSE cantidad END) WHERE codigo = ?;", [cantidad, cantidad, cod]);
            if (rows.changedRows === 0) res.status(400).end();
            await pool.query("INSERT INTO tienda(Codigo, IdProveedor, Descripcion, qty, precioDeVenta, Observacion) VALUES(?, ?, ?, ?, ?, ?);", [cod, proveedor, descripcion, cantidad, venta, observacion]);
            res.status(201).end();
        } catch (error) {
            console.log(error);
            res.status(500);
            res.send(error)
        }
    }
    else if (req.method === 'DELETE') {
        try {
            let { id, cantidad } = req.body;
            await pool.query("DELETE FROM tienda WHERE Codigo = ?;", [id]);
            await pool.query("UPDATE compras SET cantidad = cantidad + ? WHERE codigo = ?;", [cantidad, id]);
            res.status(200).end();
        } catch (error) {
            console.log(error);
            res.status(500);
            res.send(error);
        }
    }
    else if (req.method === 'GET') {
        try {
            const [rows] = await pool.query("SELECT * FROM tienda;");
            res.json(rows);
        } catch (error) {
            console.log(error);
            res.status(500);
            res.send(error);
        }
    }
}