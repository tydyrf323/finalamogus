import { getSession } from 'next-auth/react';
import Head from "next/head";
import Navbar from "../navbar";

export default function CompraTabla({ session, response }) {
  return (
    <div className='compras'>
      <Head>
        <title>Compras</title>
      </Head>
      <div className="w-full bg-[#060b26] title">
        <Navbar ses={session} />
        <p className="italic font-bold text-white text-center py-3 text-3xl fadetext">COMPRAS TABLA</p>
      </div>
      <table className='w-full text-white text-center h-fit'>
        <thead className='bg-[#2d0080] border-b border-gray-500'>
          <tr className='fadetext'>
            <th className='sticky py-2 resize-x overflow-auto w-auto'>ID</th>
            <th className='sticky py-2 resize-x overflow-auto w-auto'>COD</th>
            <th className='sticky resize-x overflow-auto'>USUARIO</th>
            <th className='sticky resize-x overflow-auto'>PROVEEDOR</th>
            <th className='sticky resize-x overflow-auto'>DESCRIPCION</th>
            <th className='sticky resize-x overflow-auto'>QTY</th>
            <th className='sticky resize-x overflow-auto'>MONTO TOTAL</th>
            <th className='sticky resize-x overflow-auto'>PRECIO VENTA</th>
            <th className='sticky resize-x overflow-auto'>FACTURA</th>
            <th className='sticky resize-x overflow-auto'>FECHA</th>
            <th className='sticky resize-x overflow-auto'>OBSERVACION</th>
          </tr>
        </thead>
        <tbody>
          {response.map((item, index) => <tr className='whitespace-nowrap bg-[#1e2124] border-b border-gray-500 fadetext' key={index}>
            <td className='py-2 border-gray-500 border-r w-auto'>{item.IdCompra}</td>
            <td className='py-2 border-gray-500 border-r w-auto'>{item.Codigo}</td>
            <td className='border-gray-500 border-r'>{item.IdUsuario}</td>
            <td className='border-gray-500 border-r'>{item.IdProveedor}</td>
            <td className='border-gray-500 border-r'>{item.Descripcion}</td>
            <td className='border-gray-500 border-r'>{item.Cantidad}</td>
            <td className='border-gray-500 border-r'>{item.MontoTotal}</td>
            <td className='border-gray-500 border-r'>{item.PrecioVenta}</td>
            <td className='border-gray-500 border-r'>{item.Factura}</td>
            <td className='border-gray-500 border-r'>{item.FechaCompra.split('T')[0]}</td>
            <td className='border-gray-500 border-r'>{item.Observacion}</td>
          </tr>)}
        </tbody>
      </table>
    </div>
  )
}



export async function getServerSideProps(context) {
  const session = await getSession(context);
  console.log(session);
  if (!session) return { redirect: { destination: '/unauth', permanent: false } };
  else {
    const resp = await fetch('http://192.168.3.4:3000/api/compraget');
    const response = await resp.json();
    return { props: { session, response } };
  }
} 