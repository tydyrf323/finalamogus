Este es un proyecto hecho con [Next.js](https://nextjs.org/) usando: [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Primero que nada

Para iniciar:

```bash
npm run dev
# or
yarn dev
```

Abre [http://localhost:3000](http://localhost:3000) en el navegador para ver el resultado.

Las rutas del API se pueden ver en `pages/api`.

La carpeta `pages/api` es convertida en URL: `/api/*`. Archivos en este directorio son tratados como rutas de API en vez de paginas de React.

## Despues...  
Inicar un server de `Mysql/MariaDB` en el puerto default luego ir a `src/database.js` y editar como se muestra abajo:
```javascript
/* src/database.js */
import mysql from 'mysql2/promise';
// main pool
export const pool = mysql.createPool({
    host: NombreDelHost,
    user: UsuarioDB,
    password: Clave,
    database: NombreDeLaDB,
    waitForConnections: true,
    connectionLimit: 10, // opcional
    queueLimit: 0 // opcional
});
// pool connect
const conn = async () => {
    await pool.getConnection((err, connection) => {
        if (err) console.log(err.code);
        if(connection) connection.release();
        console.log('god');
        return;
    })
}
conn();
```
Una vez editado recuperar la base de datos que se encuentra en `sql/commands.sql`.

>_`FinalAmogus` Programado por **tydyrf323** para mi proyecto ese de por ahi, 2022-09._
