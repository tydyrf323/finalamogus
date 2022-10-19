import { pool } from "../../src/database";
export default async function ventasHandler(req, res) {
    if (req.method === 'GET') {
        try {
            const [rows] = await pool.query("SELECT * FROM ventas;");
            res.json(rows);
        } catch (error) {
            console.log(error);
            res.status(500);
            res.send(error);
        }
    }
    else if (req.method === 'POST') {
        try {
            let { IdUsuario, Fecha, Fac, IdProveedor, Codigo, Desc, Monto, Cantidad, Precio, cliente } = req.body;
            const [rows] = await pool.query("UPDATE tienda SET qty = (CASE WHEN ? <= qty THEN qty - ? ELSE qty END) WHERE codigo = ?;", [Cantidad, Cantidad, Codigo]);
            if (rows.changedRows === 0) res.status(400).end();
            await pool.query("INSERT INTO ventas(Codigo, IdUsuario, IdProveedor, Descripcion, Cantidad, FacVenta, MontoPagado, PrecioProd, FechaVenta, Cliente) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);", [Codigo, IdUsuario, IdProveedor, Desc, Cantidad, Fac, Monto, Precio, Fecha, cliente]);
            res.status(201).end();
        } catch (error) {
            console.log(error);
            res.status(500);
            res.send(error);
        }
    }
    else if (req.method === 'DELETE') {
        try {
            let { id } = req.body;
            await pool.query("DELETE FROM ventas WHERE Codigo = ?;", [id]);
            res.status(200).end();
        } catch (error) {
            console.log(error);
            res.status(500);
            res.send(error);
        }
    }
}