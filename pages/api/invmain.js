import { pool } from "../../src/database";

export default async function invmain(req, res) {
    if (req.method === 'GET') {
        try {
            const [rows] = await pool.query("SELECT compras.codigo, compras.idproveedor, compras.descripcion, compras.Localizacion, IFNULL(compras.cantidad - p.cant, compras.cantidad) Stock from compras LEFT JOIN (SELECT Codigo, SUM(cantidad) cant from ventas group by codigo) p ON p.codigo = compras.codigo;");
            res.json(rows);
        } catch (error) {
            console.log(error);
            res.status(500).end();
        }
    }
    else {
        let { loc, cod } = req.body;
        if (loc === 0) loc++;
        else loc--; 
        try {
            await pool.query("UPDATE compras SET Localizacion = ? WHERE Codigo = ?", [loc, cod]);
            res.status(200).end();
        } catch (error) {
            console.log(error);
            res.status(500).end();
        }
    }
}