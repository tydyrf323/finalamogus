import { getSession } from 'next-auth/react';
import { useState } from "react";
import { toast } from 'react-hot-toast';
import { FiTrash2 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import axios from 'axios';
import Head from "next/head";
import Navbar from "./navbar";

const hoy = new Date(Date.now());
const sus = new Date(hoy.getTime() - hoy.getTimezoneOffset() * 60000).toISOString().split('T')[0];


export default function Proveedores({ session, responseopt, responsecod }) {

  const [tabla, setTabla] = useState([]);
  const router = useRouter();
  const [codig, setCodig] = useState({
    prov: responseopt[0].IdProveedor,
    fecha: sus,
    cod: responsecod[0].codigo
  });

  const formChange = (event) => {
    let fieldName = event.target.getAttribute('name');
    let fieldValue = event.target.value;
    let newFormData = { ...codig };
    newFormData[fieldName] = fieldValue;
    setCodig(newFormData);
    console.log(codig);
  }

  const handleRemoveItem = idx => {
    const temp = [...tabla];
    temp.splice(idx, 1);
    setTabla(temp);
  }

  async function onsub(e) {
    e.preventDefault();
    let prefixNumber = await axios.get('/api/comprafilter', { params: { prefix: codig.cod } });
    let number = prefixNumber.data.length === 0 ? 0 : Number(prefixNumber.data[0]["Codigo"].split('-')[1]);
    number++;
    setTabla((prev) => [...prev, {
      fecha: codig.fecha,
      fac: codig.fac,
      prov: codig.prov,
      cod: `${codig.cod}` + "-" + `${number}`,
      desc: codig.desc,
      monto: codig.monto,
      cantidad: codig.cantidad,
      venta: codig.venta,
      obser: codig.obser
    }]);
    axios.post('/api/compraget', {
      IdUsuario: session.user,
      Fecha: codig.fecha,
      Fac: codig.fac,
      IdProveedor: codig.prov,
      Codigo: `${codig.cod}` + "-" + `${number}`,
      Desc: codig.desc,
      Monto: codig.monto,
      Cantidad: codig.cantidad,
      Precio: codig.venta,
      Obser: codig.obser
    }).then(() => toast.success('Compra Añadida')).catch((e) => { console.log(e); toast.error('Error') });
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
      <form className='comprasuno text-white comprasform fadetext' onSubmit={onsub} autoComplete='off'>
        <div className='px-7 comprasform1'>
          <p className='font-bold my-2'>FECHA:</p>
          <input type="date" name="fecha" className='w-full py-2 border-2 border-purple-700 rounded-3xl bg-[#1e2124] px-4' onChange={formChange} required value={codig.fecha} />
        </div>
        <div className='px-7 comprasform1'>
          <p className='font-bold my-2'>FACTURA:</p>
          <input type="text" name="fac" className='w-full py-2 border-2 border-purple-700 rounded-3xl bg-[#1e2124] px-4' onChange={formChange} required placeholder='X11...' />
        </div>
        <div className='px-7 comprasform1'>
          <p className='font-bold my-2'>PROVEEDOR:</p>
          <select name="prov" id="prov" className='w-full py-2 border-2 border-purple-700 rounded-3xl bg-[#1e2124] px-4' onChange={formChange}>
            {responseopt.map((item, index) => (
              <option key={index} className='bg-black' value={item.IdProveedor}>{item.IdProveedor}</option>
            ))}
          </select>
        </div>
        <div className='px-7 comprasform1'>
          <p className='font-bold my-2'>CODIGO:</p>
          <select name="cod" id="cod" className='w-full py-2 border-2 border-purple-700 rounded-3xl bg-[#1e2124] px-4' onChange={formChange}>
            {responsecod.map((item, index) => (
              <option key={index} className='bg-black' value={item.codigo}>{item.codigo} | {item.producto}</option>
            ))}
          </select>
        </div>
        <div className='px-7 comprasform1'>
          <p className='font-bold my-2'>DESCRIPCION:</p>
          <input type="text" name="desc" list='desc' className='w-full py-2 border-2 border-purple-700 rounded-3xl bg-[#1e2124] px-4' onChange={formChange} required placeholder='Descripcion...' />
          <datalist id="desc">
            {responsecod.map((item, index) => (
              <option value={item.producto} key={index}>{item.producto}</option>
            ))}
          </datalist>
        </div>
        <div className='px-7 comprasform2'>
          <p className='font-bold my-2'>MONTO TOTAL:</p>
          <input type="number" name="monto" className='w-full py-2 border-2 border-purple-700 rounded-3xl bg-[#1e2124] px-4' min="0.01" step=".01" onChange={(e) => { formChange(e); setCodig((prev) => ({ ...prev, venta: (prev.monto / prev.cantidad).toFixed(2) })) }} required placeholder='0.01' />
        </div>
        <div className='px-7 comprasform2'>
          <p className='font-bold my-2'>CANTIDAD:</p>
          <input type="number" name="cantidad" className='w-full py-2 border-2 border-purple-700 rounded-3xl bg-[#1e2124] px-4' min="0" onChange={(e) => { formChange(e); setCodig((prev) => ({ ...prev, venta: (prev.monto / prev.cantidad).toFixed(2) })) }} required placeholder='1...' />
        </div>
        <div className='px-7 comprasform2'>
          <p className='font-bold my-2'>PRECIO UNITARIO:</p>
          <input type="number" name="venta" className='w-full py-2 border-2 border-purple-700 rounded-3xl bg-[#1e2124] px-4' min="0.01" step=".01" onChange={formChange} required placeholder='0.01' value={codig.venta} />
        </div>
        <div className='px-7 comprasform2'>
          <p className='font-bold my-2'>OBSERVACION:</p>
          <input type="text" name="obser" className='w-full py-2 border-2 border-purple-700 rounded-3xl bg-[#1e2124] px-4' onChange={formChange} placeholder="Opcional..." />
        </div>
        <div className='m-3 comprasform2'>
          <button className='w-full h-full border-4 border-green-400 rounded-full hover:bg-green-800 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-100 duration-300 focus:-translate-y-1 focus:scale-100 font-black' type="submit">AÑADIR</button>
        </div>
      </form>
      <table className='comprasdos w-full text-white text-center h-fit mt-3'>
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
          {tabla.map((item, index) => <tr className='whitespace-nowrap bg-[#1e2124] border-b border-gray-500 fadetext' key={index}>
            <td className='py-2 border-gray-500 border-r w-auto'>{item.cod}</td>
            <td className='border-gray-500 border-r'>{session.user}</td>
            <td className='border-gray-500 border-r'>{item.prov}</td>
            <td className='border-gray-500 border-r'>{item.desc}</td>
            <td className='border-gray-500 border-r'>{item.cantidad}</td>
            <td className='border-gray-500 border-r'>{item.monto}</td>
            <td className='border-gray-500 border-r'>{item.venta}</td>
            <td className='border-gray-500 border-r'>{item.fac}</td>
            <td className='border-gray-500 border-r'>{item.fecha.split('T')[0]}</td>
            <td className='border-gray-500 border-r'>{item.obser}</td>
            <td className='border-gray-500 border-r'><button className='w-full h-full flex justify-center items-center hover:bg-red-500 duration-300' onClick={() => {
              handleRemoveItem(index);
              axios.post('/api/delcompra', {
                id: item.cod
              }).then(() => toast(`Codigo: ${item.cod} Borrado`)).catch((e) => console.log(e))
            }}><FiTrash2 /></button></td>
          </tr>)}
        </tbody>
      </table>
      <div className='m-3 comprastres justify-center flex'>
        <button className='text-white w-1/2 h-full border-4 border-green-400 rounded-full hover:bg-green-800 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-100 duration-300 focus:-translate-y-1 focus:scale-100 font-black' type="submit" onClick={() => router.push('/comprastabla')}>VER TODOS</button>
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  console.log(session);
  if (!session) return { redirect: { destination: '/unauth', permanent: false } };
  else {
    const respopt = await fetch('http://192.168.3.4:3000/api/provget');
    const respcod = await fetch('http://192.168.3.4:3000/api/prod', { method: 'GET' });
    const responseopt = await respopt.json();
    const responsecod = await respcod.json();
    return { props: { session, responseopt, responsecod } };
  }
} 