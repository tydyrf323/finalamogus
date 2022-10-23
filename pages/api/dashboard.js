import { pool } from "../../src/database";

export default async function dash(req, res) {
    try {
        const [rows] = await pool.query("SELECT Descripcion, sum(cantidad) AS cant FROM ventas WHERE MONTH(FechaVenta) = MONTH(CURRENT_DATE()) AND YEAR(FechaVenta) = YEAR(CURRENT_DATE()) GROUP BY descripcion ORDER BY cant DESC LIMIT 5;");
        const [rows1] = await pool.query("SELECT date_format(FechaVenta, '%M %Y') as fecha, count(*) as numVentas from ventas where YEAR(FechaVenta) = YEAR(CURDATE()) group by year(FechaVenta), month(FechaVenta);");
        const [rows2] = await pool.query("SELECT date_format(FechaVenta, '%M %Y') as fecha, sum(PrecioProd) as numVentas from ventas where YEAR(FechaVenta) = YEAR(CURDATE()) group by year(FechaVenta), month(FechaVenta);");
        res.json([rows, rows1, rows2]);
    } catch (error) {
        console.log(error);
        res.status(500);
        res.send(error);
    }
}