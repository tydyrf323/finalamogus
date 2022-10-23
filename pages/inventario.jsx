import { getSession } from "next-auth/react";
import { FaSearch } from 'react-icons/fa'
import Navbar from "./navbar";
import Head from "next/head";
import { useState } from "react";
import axios from "axios";
import _ from 'lodash'

const tiendaH = <>
  <th className="py-2 w-auto">COD.</th>
  <th>PROVEEDOR</th>
  <th>DESCRIPCION</th>
  <th>QTY</th>
  <th>PRECIO VENTA</th>
  <th>FECHA</th>
  <th>OBSERVACION</th></>;
const entradasH = <>
  <th className="py-2 w-auto">COD.</th>
  <th>USUARIO</th>
  <th>PROVEEDOR</th>
  <th>DESCRIPCION</th>
  <th>QTY</th>
  <th>MONTO COMPRA</th>
  <th>PRECIO VENTA</th>
  <th>FECHA</th>
  <th>OBSERVACION</th></>;
const ventasH = <>
  <th className="py-2 w-auto">COD.</th>
  <th>USUARIO</th>
  <th>DESCRIPCION</th>
  <th>QTY</th>
  <th>FACTURA</th>
  <th>MONTO PAGADO</th>
  <th>PRECIO PROD.</th>
  <th>FECHA</th>
  <th>CLIENTE</th></>;
const invH = <>
  <th className="py-2 w-auto">COD.</th>
  <th>PROVEEDOR</th>
  <th>DESCRIPCION</th>
  <th>STOCK</th>
  <th>PRECIO PROD.</th>
  <th>OBSERVACION</th>
  <th>FECHA</th></>;

export default function InvMain({ session, response }) {
  const [invstate, setInv] = useState(['TIENDA', tiendaH, response.map((v, i) => <tr className="whitespace-nowrap bg-[#1e2124] border-b [&>*]:border-gray-500 fadetext [&>*]:border-r text-center" key={i}>
    <td className='py-2 w-auto'>{v.Codigo}</td>
    <td>{v.IdProveedor}</td>
    <td>{v.Descripcion}</td>
    <td>{v.qty}</td>
    <td>{v.PrecioDeVenta}</td>
    <td>{v.Fecha.split('T')[0]}</td>
    <td>{v.Observacion}</td>
  </tr>)]);
  const [cod, setCod] = useState('');
  const [desc, setDesc] = useState('');
  const [ventas, setVentas] = useState({
    agrupar: false,
    boton: true
  });
  const search = (e) => setCod(e.target.value);
  const searchDesc = (e) => setDesc(e.target.value);

  async function buscar(event) {
    const newtable = await axios.get('/api/inv', {
      params: {
        tabla: invstate[0] === 'ENTRADAS' ? 'COMPRAS' : invstate[0],
        datos: event.currentTarget.getAttribute('name') === 'CODIGO' ? cod : desc,
        dc: event.currentTarget.getAttribute('name'),
        master: invstate[0] === 'MASTER' ? 'yes' : 'no'
      }
    });
    if (invstate[0] === 'ENTRADAS') {
      setInv(['ENTRADAS', entradasH, newtable.data.map((v) => <tr className="whitespace-nowrap bg-[#1e2124] border-b [&>*]:border-gray-500 fadetext [&>*]:border-r text-center" key={v.IdCompra}>
        <td className='py-2 w-auto'>{v.Codigo}</td>
        <td>{v.IdUsuario}</td>
        <td>{v.IdProveedor}</td>
        <td>{v.Descripcion}</td>
        <td>{v.Cantidad}</td>
        <td>{v.MontoTotal}</td>
        <td>{v.PrecioVenta}</td>
        <td>{v.FechaCompra.split('T')[0]}</td>
        <td>{v.Observacion}</td>
      </tr>)])
    }
    else if (invstate[0] === 'TIENDA') {
      setInv(['TIENDA', tiendaH, newtable.data.map((v, i) => <tr className="whitespace-nowrap bg-[#1e2124] border-b [&>*]:border-gray-500 fadetext [&>*]:border-r text-center" key={i}>
        <td className='py-2 w-auto'>{v.Codigo}</td>
        <td>{v.IdProveedor}</td>
        <td>{v.Descripcion}</td>
        <td>{v.qty}</td>
        <td>{v.PrecioDeVenta}</td>
        <td>{v.Fecha.split('T')[0]}</td>
        <td>{v.Observacion}</td>
      </tr>)]);
    }
    else if (invstate[0] === 'VENTAS') {
      if (ventas.agrupar) {
        newtable.data = _(newtable.data)
          .groupBy('Codigo')
          .map((array, key) => ({
            "Codigo": key,
            "Cantidad": _.sumBy(array, "Cantidad"),
            "Descripcion": _.uniqBy(array, "Descripcion").length,
            "IdUsuario": 'X',
            "FacVenta": 'X',
            "MontoPagado": 'X',
            "PrecioProd": _.uniqBy(array, "PrecioProd").length,
            "FechaVenta": 'X',
            "Cliente": 'X'
          }))
          .value();
      }
      setInv(['VENTAS', ventasH, newtable.data.map((v, i) => <tr className="whitespace-nowrap bg-[#1e2124] border-b [&>*]:border-gray-500 fadetext [&>*]:border-r text-center" key={i}>
        <td className='py-2 w-auto'>{v.Codigo}</td>
        <td>{v.IdUsuario}</td>
        <td>{v.Descripcion}</td>
        <td>{v.Cantidad}</td>
        <td>{v.FacVenta}</td>
        <td>{v.MontoPagado}</td>
        <td>{v.PrecioProd}</td>
        <td>{v.FechaVenta.split('T')[0]}</td>
        <td>{v.Cliente}</td>
      </tr>)]);
    }
    else if (invstate[0] === 'MASTER') {
      setInv(['MASTER', invH, newtable.data.map((v, i) => <tr className="whitespace-nowrap bg-[#1e2124] border-b [&>*]:border-gray-500 fadetext [&>*]:border-r text-center" key={i}>
        <td className='py-2 w-auto'>{v.codigo}</td>
        <td>{v.IdProveedor}</td>
        <td>{v.Descripcion}</td>
        <td>{v.Stock}</td>
        <td>{v.precioVenta}</td>
        <td>{v.observacion}</td>
        <td>{v.FechaCompra.split('T')[0]}</td>
      </tr>)]);
    }
  }

  async function invMaster() {
    const invMaster = await axios.get('/api/inv', {
      params: {
        tabla: '',
        datos: '',
        dc: 'codigo',
        master: 'yes'
      }
    });
    setInv(['MASTER', invH, invMaster.data.map((v, i) => <tr className="whitespace-nowrap bg-[#1e2124] border-b [&>*]:border-gray-500 fadetext [&>*]:border-r text-center" key={i}>
      <td className='py-2 w-auto'>{v.codigo}</td>
      <td>{v.IdProveedor}</td>
      <td>{v.Descripcion}</td>
      <td>{v.Stock}</td>
      <td>{v.precioVenta}</td>
      <td>{v.observacion}</td>
      <td>{v.FechaCompra.split('T')[0]}</td>
    </tr>)]);
    setVentas({ agrupar: false, boton: true });
  }

  async function showVentas() {
    const ventas = await axios.get('/api/ventas');
    setInv(['VENTAS', ventasH, ventas.data.map((v, i) => <tr className="whitespace-nowrap bg-[#1e2124] border-b [&>*]:border-gray-500 fadetext [&>*]:border-r text-center" key={i}>
      <td className='py-2 w-auto'>{v.Codigo}</td>
      <td>{v.IdUsuario}</td>
      <td>{v.Descripcion}</td>
      <td>{v.Cantidad}</td>
      <td>{v.FacVenta}</td>
      <td>{v.MontoPagado}</td>
      <td>{v.PrecioProd}</td>
      <td>{v.FechaVenta.split('T')[0]}</td>
      <td>{v.Cliente}</td>
    </tr>)]);
    setVentas({ agrupar: false, boton: false });
  }

  async function cambiar() {
    if (invstate[0] === 'TIENDA') {
      const entradas = await axios.get("/api/compraget");
      setInv(['ENTRADAS', entradasH, entradas.data.map((v) => <tr className="whitespace-nowrap bg-[#1e2124] border-b [&>*]:border-gray-500 fadetext [&>*]:border-r text-center" key={v.IdCompra}>
        <td className='py-2 w-auto'>{v.Codigo}</td>
        <td>{v.IdUsuario}</td>
        <td>{v.IdProveedor}</td>
        <td>{v.Descripcion}</td>
        <td>{v.Cantidad}</td>
        <td>{v.MontoTotal}</td>
        <td>{v.PrecioVenta}</td>
        <td>{v.FechaCompra.split('T')[0]}</td>
        <td>{v.Observacion}</td>
      </tr>)]);
    }
    else {
      const tienda = await axios.get("/api/tienda");
      setInv(['TIENDA', tiendaH, tienda.data.map((v, i) => <tr className="whitespace-nowrap bg-[#1e2124] border-b [&>*]:border-gray-500 fadetext [&>*]:border-r text-center" key={i}>
        <td className='py-2 w-auto'>{v.Codigo}</td>
        <td>{v.IdProveedor}</td>
        <td>{v.Descripcion}</td>
        <td>{v.qty}</td>
        <td>{v.PrecioDeVenta}</td>
        <td>{v.Fecha.split('T')[0]}</td>
        <td>{v.Observacion}</td>
      </tr>)]);
    }
    setVentas({ agrupar: false, boton: true });
  }

  return <div className="inventario">
    <Head>
      <title>INVENTARIO</title>
    </Head>
    <div className="w-full bg-[#060b26] title">
      <Navbar ses={session} />
      <p className="italic font-bold text-white text-center py-3 text-3xl fadetext">INVENTARIO - {invstate[0]}</p>
    </div>
    <section className='px-7 invOne'>
      <div className="invForm text-white">
        <div className="px-2 flex justify-center items-center">
          <button name="CODIGO" className='w-[15%] border-4 flex justify-center items-center py-4 border-rose-400 rounded-lg hover:bg-rose-800 transition ease-in-out duration-300' onClick={buscar}><FaSearch /></button>
          <input type="text" name="cod" className='w-[85%] py-2 border-2 border-purple-700 rounded-3xl bg-[#1e2124] px-4' placeholder='Buscar por Codigo...' onChange={search} />
        </div>
        <div className="px-2 flex justify-center items-center">
          <button name="DESCRIPCION" className='w-[15%] border-4 flex justify-center items-center py-4 border-rose-400 rounded-lg hover:bg-rose-800 transition ease-in-out duration-300' onClick={buscar}><FaSearch /></button>
          <input type="text" name="desc" className='w-[85%] py-2 border-2 border-purple-700 rounded-3xl bg-[#1e2124] px-4' placeholder='Buscar por Descripcion...' onChange={searchDesc} />
        </div>
        <div className="px-2 flex justify-center items-center">
          {ventas.boton ? <button name="VENTAS" className='w-full h-1/2 border-4 border-emerald-400 rounded-full hover:bg-emerald-800 transition ease-in-out duration-300 font-black' onClick={showVentas}>MOSTRAR VENTAS</button> : <><span className='font-bold my-2'>AGRUPAR:</span>
            <label className="container">
              <input type="checkbox" onChange={() => setVentas((prev) => ({
                ...prev,
                agrupar: !ventas.agrupar
              }))} />
              <span className="checkmark"></span>
            </label></>}
        </div>
        <div className="px-2 flex justify-center items-center">
          <button className='w-full h-1/2 border-4 border-yellow-400 rounded-full hover:bg-yellow-800 transition ease-in-out duration-300 font-black' onClick={invMaster}>INVENTARIO MASTER</button>
        </div>
        <div className="px-2 flex justify-center items-center">
          <button className='w-full h-1/2 border-4 border-indigo-300 rounded-full hover:bg-indigo-800 transition ease-in-out duration-300 font-black' onClick={cambiar}>MOSTRAR {invstate[0] === 'TIENDA' ? 'ENTRADAS' : 'TIENDA'}</button>
        </div>
      </div>
    </section>
    <table className="w-full text-white h-fit invTwo">
      <thead className="bg-[#2d0080] border-b border-gray-500">
        <tr className="fadetext [&>*]:resize-x [&>*]:overflow-auto [&>*]:sticky">
          {invstate[1]}
        </tr>
      </thead>
      <tbody>
        {invstate[2]}
      </tbody>
    </table>
  </div>
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session || session.role === 1) return { redirect: { destination: '/unauth', permanent: false } };
  else {
    const resp = await fetch('http://192.168.3.4:3000/api/tienda', { method: 'GET' });
    const response = await resp.json();
    return { props: { session, response } };
  }
} 