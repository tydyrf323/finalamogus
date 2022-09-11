import { getSession } from 'next-auth/react';
import { useState } from "react";
import { toast } from 'react-hot-toast';
import { FiTrash2 } from 'react-icons/fi';
import axios from 'axios';
import Head from "next/head";
import Navbar from "./navbar";

const hoy = new Date();
const today = hoy.setDate(hoy.getDate());
const sus = new Date(today).toISOString().split('T')[0];

export default function Proveedores({ session, response, responseopt }) {

  const [newTable, setnewTable] = useState(response);
  const [codig, setCodig] = useState({
    prov: responseopt[0].IdProveedor,
    fecha: sus
  });

  const formChange = (event) => {
    let fieldName = event.target.getAttribute('name');
    let fieldValue = event.target.value;
    let newFormData = { ...codig };
    newFormData[fieldName] = fieldValue;
    setCodig(newFormData);
    console.log(codig);
  }

  async function onsub(e) {
    e.preventDefault();
    await axios.post('/api/compraget', {
      IdUsuario: session.user,
      Codigo: codig.cod,
      IdProveedor: codig.prov,
      Desc: codig.desc,
      Cantidad: codig.cantidad,
      Fac: codig.fac,
      Monto: codig.monto,
      Precio: codig.venta,
      Obser: codig.obser,
      Fecha: codig.fecha
    }).then(async () => {
      toast.success("Compra Registrada");
      let x = await axios.get('/api/compraget');
      setnewTable(x.data);
    }).catch(() => {
      toast.error("Compra repetida");
    })
  };

  return (
    <div className='compras'>
      <Head>
        <title>Compras</title>
      </Head>
      <div className="w-full bg-[#060b26] title">
        <Navbar ses={session} />
        <p className="italic font-bold text-white text-center py-3 text-3xl fadetext">COMPRAS</p>
      </div>
      <table className='uno w-full text-white text-center h-fit'>
        <thead className='bg-[#2d0080] border-b border-gray-500'>
          <tr className='fadetext'>
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
            <th className='sticky bg-[#1e2124] w-fit'></th>
          </tr>
        </thead>
        <tbody>
          {newTable.map((item, index) => <tr className='whitespace-nowrap bg-[#1e2124] border-b border-gray-500 fadetext' key={index}>
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
            <td className='border-gray-500 border-r'><button className='w-full h-full flex justify-center items-center hover:bg-red-500 duration-300' onClick={() => {
              axios.post('/api/delcompra', {
                prov: item.IdCompra
              }).then(async () => {
                toast.success("Compra Borrada");
                let x = await axios.get('/api/compraget');
                setnewTable(x.data);
              }).catch(() => {
                toast.error("Error");
              })
            }}><FiTrash2 /></button></td>
          </tr>)}
        </tbody>
      </table>
      <form className='dos text-white comprasform fadetext' onSubmit={onsub} autoComplete='off'>
        <div className='px-7 comprasform1'>
          <p className='font-bold my-2'>PROVEEDOR:</p>
          <select name="prov" id="prov" className='w-full py-2 border-2 border-purple-700 rounded-3xl bg-[#1e2124] px-4' onChange={formChange}>
            {responseopt.map((item, index) => (
              <option key={index} className='bg-black' value={item.IdProveedor}>{item.IdProveedor}</option>
            ))}
          </select>
        </div>
        <div className='px-7 comprasform1'>
          <p className='font-bold my-2'>DESCRIPCION:</p>
          <input type="text" name="desc" className='w-full py-2 border-2 border-purple-700 rounded-3xl bg-[#1e2124] px-4' onChange={formChange} required placeholder='Descripcion...' />
        </div>
        <div className='px-7 comprasform1'>
          <p className='font-bold my-2'>MONTO TOTAL:</p>
          <input type="number" name="monto" className='w-full py-2 border-2 border-purple-700 rounded-3xl bg-[#1e2124] px-4' min="0.01" step=".01" onChange={formChange} required placeholder='0.01' />
        </div>
        <div className='px-7 comprasform1'>
          <p className='font-bold my-2'>CANTIDAD:</p>
          <input type="number" name="cantidad" className='w-full py-2 border-2 border-purple-700 rounded-3xl bg-[#1e2124] px-4' min="0" onChange={formChange} required placeholder='1...' />
        </div>
        <div className='px-7 comprasform1'>
          <p className='font-bold my-2'>CODIGO:</p>
          <input type="text" name="cod" className='w-full py-2 border-2 border-purple-700 rounded-3xl bg-[#1e2124] px-4' onChange={formChange} required placeholder='Codigo...' />
        </div>
        <div className='px-7 comprasform2'>
          <p className='font-bold my-2'>FECHA:</p>
          <input type="date" name="fecha" className='w-full py-2 border-2 border-purple-700 rounded-3xl bg-[#1e2124] px-4' onChange={formChange} required value={codig.fecha} />
        </div>
        <div className='px-7 comprasform2'>
          <p className='font-bold my-2'>PRECIO VENTA:</p>
          <input type="number" name="venta" className='w-full py-2 border-2 border-purple-700 rounded-3xl bg-[#1e2124] px-4' min="0.01" step=".01" onChange={formChange} required placeholder='0.01' />
        </div>
        <div className='px-7 comprasform2'>
          <p className='font-bold my-2'>FACTURA:</p>
          <input type="text" name="fac" className='w-full py-2 border-2 border-purple-700 rounded-3xl bg-[#1e2124] px-4' onChange={formChange} required placeholder='X11...' />
        </div>
        <div className='px-7 comprasform2'>
          <p className='font-bold my-2'>OBSERVACION:</p>
          <input type="text" name="obser" className='w-full py-2 border-2 border-purple-700 rounded-3xl bg-[#1e2124] px-4' onChange={formChange} placeholder="Opcional..." />
        </div>
        <div className='m-3 comprasform2'>
          <button className='w-full h-full border-4 border-green-400 rounded-full hover:bg-green-800 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-100 duration-300 focus:-translate-y-1 focus:scale-100 font-black' type="submit">AÑADIR</button>
        </div>
      </form>
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  console.log(session);
  if (!session) return { redirect: { destination: '/unauth', permanent: false } };
  else {
    const resp = await fetch('http://192.168.3.4:3000/api/compraget');
    const respopt = await fetch('http://192.168.3.4:3000/api/provget');
    const response = await resp.json();
    const responseopt = await respopt.json();
    return { props: { session, response, responseopt } };
  }
} 