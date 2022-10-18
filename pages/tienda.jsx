import Navbar from "./navbar";
import { useState } from "react";
import { getSession } from 'next-auth/react';
import axios from 'axios';
import Head from "next/head";

export default function Tienda({ session, response }) {

  const [tabla, setTabla] = useState([]);
  const [codig, setCodig] = useState({
    desc: '',
    venta: '',
    obser: ''
  });

  const formChange = (event) => {
    let fieldName = event.target.getAttribute('name');
    let fieldValue = event.target.value;
    let newFormData = { ...codig };
    newFormData[fieldName] = fieldValue;
    setCodig(newFormData);
    console.log(codig);
  }

  async function blurred(){
    const entrada = await axios.get('/api/ventablur', { params: { codigo: codig.cod } });
    if (entrada.data.length !== 0) {
      setCodig((prev) => ({
        ...prev,
        desc: entrada.data[0].Descripcion,
        prov: entrada.data[0].IdProveedor,
        venta: entrada.data[0].PrecioVenta,
        obser: entrada.data[0].Observacion
      }))
    }
    else toast.error("Codigo Inexistente.");
  }

  function onsub(e) {
    e.preventDefault();

  }

  return (
    <div className='compras'>
      <Head>
        <title>TIENDA</title>
      </Head>
      <div className="w-full bg-[#060b26] title">
        <Navbar ses={session} />
        <p className="italic font-bold text-white text-center py-3 text-3xl fadetext">TIENDA</p>
      </div>
      <form className='comprasuno text-white tiendaform fadetext' onSubmit={onsub} autoComplete='off'>
        <div className='px-7 comprasform1'>
          <p className='font-bold my-2'>CODIGO:</p>
          <input type="text" name="cod" className='w-full py-2 border-2 border-purple-700 rounded-3xl bg-[#1e2124] px-4' required placeholder='Codigo...' onChange={formChange} onBlur={blurred} />
        </div>
        <div className='px-7 comprasform2'>
          <p className='font-bold my-2'>CANTIDAD:</p>
          <input type="number" name="cantidad" className='w-full py-2 border-2 border-purple-700 rounded-3xl bg-[#1e2124] px-4' min="0" required />
        </div>
        <div className='px-7 comprasform1'>
          <p className='font-bold my-2'>DESCRIPCION:</p>
          <input type="text" name="desc" className='w-full py-2 border-2 border-purple-700 rounded-3xl bg-[#0500A0] px-4' onChange={formChange} placeholder='Descripcion...' disabled value={codig.desc} />
        </div>
        <div className='px-7 comprasform2'>
          <p className='font-bold my-2'>PRECIO:</p>
          <input type="number" name="venta" className='w-full py-2 border-2 border-purple-700 rounded-3xl bg-[#1e2124] px-4' min="0.01" step=".01" value={codig.venta} disabled />
        </div>
        <div className='px-7 comprasform2'>
          <p className='font-bold my-2'>OBSERVACION:</p>
          <input type="text" name="obser" className='w-full py-2 border-2 border-purple-700 rounded-3xl bg-[#1e2124] px-4' onChange={formChange} placeholder="No hay observaciones" disabled value={codig.obser} />
        </div>
        <div className='m-3 comprasform2'>
          <button className='w-full h-full border-4 border-green-400 rounded-full hover:bg-green-800 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-100 duration-300 focus:-translate-y-1 focus:scale-100 font-black' type="submit">AÑADIR</button>
        </div>
      </form>
      <table className='comprasdos w-full text-white text-center h-fit mt-3 overflow-y-scroll'>
        <thead className='bg-[#2d0080] border-b border-gray-500'>
          <tr className='fadetext [&>*]:sticky [&>*]:overflow-auto [&>*]:resize-x'>
            <th className='py-2 w-auto'>COD</th>
            <th>USUARIO</th>
            <th>PROVEEDOR</th>
            <th>DESCRIPCION</th>
            <th>QTY</th>
            <th>MONTO TOTAL</th>
            <th>PRECIO VENTA</th>
            <th>FACTURA</th>
            <th>FECHA</th>
            <th>OBSERVACION</th>
            <th className='bg-[#1e2124] w-fit'></th>
          </tr>
        </thead>
        <tbody>
          {tabla.map((item, index) => <tr className='whitespace-nowrap bg-[#1e2124] border-b [&>*]:border-gray-500 fadetext [&>*]:border-r' key={index}>
            <td className='py-2 w-auto'>{item.cod}</td>
            <td>{session.user}</td>
            <td>{item.prov}</td>
            <td>{item.desc}</td>
            <td>{item.cantidad}</td>
            <td>{item.monto}</td>
            <td>{item.venta}</td>
            <td>{item.fac}</td>
            <td>{item.fecha.split('T')[0]}</td>
            <td>{item.obser}</td>
            <td><button className='w-full h-full flex justify-center items-center hover:bg-red-500 duration-300' onClick={() => {
              handleRemoveItem(index);
              axios.post('/api/delcompra', {
                id: item.cod
              }).then(() => toast.success(`Codigo: ${item.cod} Borrado`, {
                iconTheme: {
                  primary: '#A200FF',
                  secondary: '#fff',
                },
              })).catch((e) => console.error(e))
            }}><FiTrash2 /></button></td>
          </tr>)}
        </tbody>
      </table>
      <div className='m-3 comprastres justify-center flex z-10'>
        <button className='text-white w-1/2 h-full border-4 border-green-400 rounded-full hover:bg-green-800 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-100 duration-300 focus:-translate-y-1 focus:scale-100 font-black' type="submit" onClick={() => router.push('/tables/comprastabla')}>VER TODOS</button>
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  console.log(session);
  if (!session) return { redirect: { destination: '/unauth', permanent: false } };
  else {
    const resp = await fetch('http://192.168.3.4:3000/api/tienda');
    const response = await resp.json();
    return { props: { session, response } };
  }
}