import { getSession } from "next-auth/react";
import Navbar from "./navbar";
import Head from "next/head";
import { useState } from "react";
import axios from "axios";

export default function InvMain({ session, response }) {

  const [edit, setEdit] = useState(0);
  const [table, setTable] = useState(response);

  return <div>
    <Head>
      <title>INVENTARIO</title>
    </Head>
    <div className="w-full bg-[#060b26] title">
      <Navbar ses={session} />
      <p className="italic font-bold text-white text-center py-3 text-3xl fadetext">INVENTARIO</p>
    </div>
    <table className="w-full text-white">
      <thead className="bg-[#2d0080] border-b border-gray-500">
        <tr className="fadetext [&>*]:resize-x [&>*]:overflow-auto [&>*]:sticky">
          <th className="py-2 w-auto">COD.</th>
          <th>PROVEEDOR</th>
          <th>DESCRIPCION</th>
          <th>LOCALIZACION</th>
          <th>STOCK</th>
        </tr>
      </thead>
      <tbody>
        {table.map((v) => <tr className="whitespace-nowrap bg-[#1e2124] border-b [&>*]:border-gray-500 fadetext [&>*]:border-r text-center" key={v.codigo}>
          <td className='py-2 w-auto'>{v.codigo}</td>
          <td>{v.idproveedor}</td>
          <td>{v.descripcion}</td>
          <td><button className="w-full h-full hover:bg-neutral-700 duration-300" onClick={() => axios.post('/api/invmain', { cod: v.codigo, loc: v.Localizacion })
            .then(() => axios.get('/api/invmain').then((lol) => setTable(lol.data)) )}>{v.Localizacion === 0 ? 'Almacen' : 'Tienda'}</button></td>
          <td>{v.Stock}</td>
        </tr>)}
      </tbody>
    </table>
  </div>
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) return { redirect: { destination: '/unauth', permanent: false } };
  else {
    const resp = await fetch('http://192.168.3.4:3000/api/invmain', { method: 'GET' });
    const response = await resp.json();
    return { props: { session, response } };
  }
} 