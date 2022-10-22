import { pool } from "../../src/database";
export default async function invController(req, res) {
    let { tabla, datos, dc, master } = req.query;
    console.log(tabla, datos, dc);
    try {
        if (master) {
            const [rows] = await pool.query(`SELECT compras.codigo, compras.IdProveedor, compras.Descripcion, (IFNULL(tienda.qty, 0) + compras.cantidad) as 'Stock', compras.precioVenta, compras.observacion, compras.FechaCompra from compras LEFT JOIN tienda ON compras.codigo = tienda.codigo WHERE compras.${dc} like '${datos}%';`);
            return res.json(rows);
        }
        else {
            const [rows] = await pool.query(`SELECT * FROM ${tabla} WHERE ${dc} like '${datos}%';`);
            return res.json(rows);
        }
    } catch (error) {
        console.log(error);
        res.status(500);
        res.send(error);
    }
}