import { getSession } from 'next-auth/react';
import { useState } from "react";
import { toast } from 'react-hot-toast';
import { FiTrash2 } from 'react-icons/fi';
import axios from 'axios';
import Head from "next/head";
import Navbar from "./navbar";

const hoy = new Date(Date.now());
const sus = new Date(hoy.getTime() - hoy.getTimezoneOffset() * 60000).toISOString().split('T')[0];


export default function Compras({ session, responseopt, responsecod, miscresp }) {

  const [tabla, setTabla] = useState([]);
  const [codig, setCodig] = useState({
    prov: responseopt[0].IdProveedor,
    fecha: sus,
    cod: responsecod[0].codigo,
    cantidad: 1,
    monto: 1,
    venta: 0
  });

  const formChange = (event) => {
    let fieldName = event.target.getAttribute('name');
    let fieldValue = event.target.value;
    let newFormData = { ...codig };
    newFormData[fieldName] = fieldValue;
    setCodig(newFormData);
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
      IdProveedor: codig.prov,
      Codigo: `${codig.cod}` + "-" + `${number}`,
      Desc: codig.desc,
      Monto: codig.monto,
      Cantidad: codig.cantidad,
      Precio: codig.venta,
      Obser: codig.obser
    }).then(() => toast.success('Compra Añadida')).catch((e) => toast.error('Error') );
  };

  return (
    <div className='compras1'>
      <Head>
        <title>ENTRADAS</title>
      </Head>
      <div className="w-full bg-[#060b26] title">
        <Navbar ses={session} />
        <p className="italic font-bold text-white text-center py-3 text-3xl fadetext">ENTRADAS</p>
      </div>
      <form className='comprasuno text-white comprasform fadetext' onSubmit={onsub} autoComplete='off'>
        <div className='px-7 comprasform1'>
          <p className='font-bold my-2'>FECHA:</p>
          <input type="date" name="fecha" className='w-full py-2 border-2 border-purple-700 rounded-3xl bg-[#1e2124] px-4' onChange={formChange} required value={codig.fecha} />
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
        <div className='m-3 comprasform1'>
          <button className='w-full h-full border-4 border-yellow-400 rounded-full hover:bg-yellow-800 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-100 duration-300 focus:-translate-y-1 focus:scale-100 font-black' type="reset">VACIAR</button>
        </div>
        <div className='px-7 comprasform2'>
          <p className='font-bold my-2'>MONTO TOTAL:</p>
          <input type="number" name="monto" className='w-full py-2 border-2 border-purple-700 rounded-3xl bg-[#1e2124] px-4' min="0.01" step=".01" onChange={(e) => {
            formChange(e);
            setCodig((prev) => ({ ...prev, venta: Math.ceil(((prev.monto / prev.cantidad) * (1 + (miscresp[0].porcentaje / 100))) / (1 - 0.13)) }))
          }} required value={codig.monto} />
        </div>
        <div className='px-7 comprasform2'>
          <p className='font-bold my-2'>CANTIDAD:</p>
          <input type="number" name="cantidad" className='w-full py-2 border-2 border-purple-700 rounded-3xl bg-[#1e2124] px-4' min="0" onChange={(e) => {
            formChange(e);
            setCodig((prev) => ({ ...prev, venta: Math.ceil(((prev.monto / prev.cantidad) * (1 + (miscresp[0].porcentaje / 100))) / (1 - 0.13)) }))
          }} required value={codig.cantidad} />
        </div>
        <div className='px-7 comprasform2'>
          <p className='font-bold my-2'>PRECIO RECOMENDADO:</p>
          <input type="number" name="venta" className='w-full py-2 border-2 border-purple-700 rounded-3xl bg-[#1e2124] px-4' min="0.01" step=".01" onChange={formChange} required value={codig.venta} />
        </div>
        <div className='px-7 comprasform2'>
          <p className='font-bold my-2'>OBSERVACION:</p>
          <input type="text" name="obser" className='w-full py-2 border-2 border-purple-700 rounded-3xl bg-[#1e2124] px-4' onChange={formChange} placeholder="Opcional..." />
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
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) return { redirect: { destination: '/unauth', permanent: false } };
  else {
    const respopt = await fetch('http://192.168.3.4:3000/api/provget');
    const respcod = await fetch('http://192.168.3.4:3000/api/prod', { method: 'GET' });
    const misc = await fetch('http://192.168.3.4:3000/api/misc', { method: 'GET' });
    const responseopt = await respopt.json();
    const responsecod = await respcod.json();
    const miscresp = await misc.json();
    return { props: { session, responseopt, responsecod, miscresp } };
  }
}