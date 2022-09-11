import { pool } from "../../src/database";
export default async function getProvs(req, res) {
    if (req.method === 'POST') {
        try {
            let { IdUsuario, Codigo, IdProveedor, Desc, Cantidad, Fac, Monto, Precio, Obser, Fecha } = req.body;
            await pool.query("INSERT INTO compras(Codigo, IdUsuario, IdProveedor, Descripcion, Cantidad, Factura, MontoTotal, PrecioVenta, Localizacion, Observacion, FechaCompra) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);", [Codigo, IdUsuario, IdProveedor, Desc, Cantidad, Fac, Monto, Precio, 0, Obser, Fecha]);
            res.status(200).end();
        } catch (error) {
            console.log(error);
            res.status(500);
            res.send(error).end();
        }
    } else {
        try {
            const [rows] = await pool.query("SELECT * FROM compras;");
            res.json(rows);
        } catch (error) {
            console.log(error);
            res.status(500);
            res.send(error);
        }
    }
}