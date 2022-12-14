import { getSession } from 'next-auth/react';
import { useRef, useState } from "react";
import { toast } from 'react-hot-toast';
import { FiTrash2 } from 'react-icons/fi';
import axios from 'axios';
import Head from "next/head";
import Navbar from "./navbar";
import { DateTime } from 'luxon';
import { numeroALetras } from '../src/numeroAletra';

const hoy = new Date(Date.now());
const sus = new Date(hoy.getTime() - hoy.getTimezoneOffset() * 60000).toISOString().split('T')[0];

export default function Ventas({ session, responseopt, miscresp }) {
  const [tabla, setTabla] = useState([]);
  const firstRef = useRef(null);
  const [fac, setFac] = useState({
    num: '',
    time: '',
    datos: [],
    total: 0,
    monto: 0,
    fac: '',
    nit: '',
    tabla: []
  });
  const [codig, setCodig] = useState({
    prov: responseopt[0].IdProveedor,
    fecha: sus,
    desc: '',
    precioProd: 0,
    cliente: '',
    fac: '',
    cod: '',
    monto: '',
    cantidad: '',
    nit: ''
  });
  const clear = () => setTabla([]);

  const formChange = (event) => {
    let fieldName = event.target.getAttribute('name');
    let fieldValue = event.target.value;
    if (fieldName === 'cod') fieldValue = event.target.value.toUpperCase();
    if (fieldName === 'cantidad') {
      let newFormData = { ...codig };
      newFormData[fieldName] = fieldValue;
      axios.get('/api/ventasmultiply', { params: { cod: codig.cod } })
        .then((datos) => setCodig(() => ({
          ...newFormData,
          precioProd: datos.data.length === 0 ? 0 : Number(datos.data[0]?.PrecioDeVenta) * Number(fieldValue)
        })))
    }
    else {
      let newFormData = { ...codig };
      newFormData[fieldName] = fieldValue;
      setCodig(newFormData);
    }
  }

  const handleRemoveItem = idx => {
    const temp = [...tabla];
    temp.splice(idx, 1);
    setTabla(temp);
  }

  const blurred = async () => {
    const tienda = await axios.get('/api/ventablur', { params: { codigo: codig.cod, act: true } });
    if (tienda.data.length !== 0) {
      setCodig((prev) => ({
        ...prev,
        desc: tienda.data[0].Descripcion,
        prov: tienda.data[0].IdProveedor,
        precioProd: tienda.data[0].PrecioDeVenta
      }))
    }
    else toast.error("Codigo Inexistente en Tienda.");
  }

  function facturaGen() {
    if (tabla.length === 0) {
      toast.error("Se necesitan datos de venta para generar una factura.", {
        iconTheme: {
          primary: 'red',
          secondary: '#fff'
        }
      })
    }
    else {
      const uniqueIds = [];
      let sum = 0;
      let cancelado = 0;
      const unique = tabla.filter(element => {
        const isDuplicate = uniqueIds.includes(element.cliente);
        if (!isDuplicate) {
          uniqueIds.push(element.cliente);
          return true;
        }
        return false;
      });
      for (const { precioProd } of tabla) {
        let x = Number(precioProd);
        sum += x;
      }
      for (const { monto } of tabla) {
        let x = Number(monto)
        cancelado += x;
      }
      const today = DateTime.now();
      setFac({
        num: `${numeroALetras(sum)}`,
        time: today.hour + ":" + today.minute + ":" + today.second,
        datos: unique,
        total: sum,
        monto: cancelado,
        fac: unique[0].fac,
        nit: unique[0].nit,
        tabla: tabla
      })
      setTimeout(() => {
        window.print();
      }, 500);
      clear();
    }
  }

  async function onsub(e) {
    e.preventDefault();
    if (Number(codig.monto) < Number(codig.precioProd)) toast.error("El monto pagado debe ser mayor al precio del articulo.");
    else {
      const venta = await axios.get('/api/ventablur', { params: { codigo: codig.cod, act: true } });
      if (venta.data.length !== 0) {
        axios.post('/api/ventas', {
          IdUsuario: session.user,
          Fecha: codig.fecha,
          Fac: codig.fac,
          IdProveedor: codig.prov,
          Codigo: codig.cod,
          Desc: codig.desc,
          Monto: codig.monto,
          Cantidad: codig.cantidad,
          Precio: codig.precioProd,
          cliente: codig.cliente
        }).then(() => {
          toast.success('Venta A??adida');
          setTabla((prev) => [...prev, {
            fecha: codig.fecha,
            fac: codig.fac,
            prov: codig.prov,
            cod: codig.cod,
            desc: codig.desc,
            monto: codig.monto,
            precioProd: codig.precioProd,
            cantidad: codig.cantidad,
            cliente: codig.cliente,
            nit: codig.nit
          }]);
        }).catch(() => toast.error('Error: No se tiene stock disponible del articulo.'));
      }
      else toast.error("Codigo Inexistente.");
      setCodig({
        prov: responseopt[0].IdProveedor,
        fecha: sus,
        desc: '',
        precioProd: 0,
        cliente: '',
        fac: '',
        cod: '',
        monto: '',
        cantidad: '',
        nit: ''
      })
    }
    firstRef.current.focus();
  };

  return (
    <>
      <div className='compras' id='imprimir'>
        <Head>
          <title>VENTAS</title>
        </Head>
        <div className="w-full bg-[#060b26] title">
          <Navbar ses={session} />
          <p className="italic font-bold text-white text-center py-3 text-3xl fadetext">VENTAS</p>
        </div>
        <form className='comprasuno text-white comprasform fadetext' onSubmit={onsub} autoComplete='off'>
          <div className='px-7 comprasform1'>
            <p className='font-bold my-2'>FECHA:</p>
            <input type="date" name="fecha" className='w-full py-2 border-2 border-purple-700 rounded-3xl bg-[#1e2124] px-4' required value={codig.fecha} onChange={formChange} />
          </div>
          <div className='px-7 comprasform1'>
            <p className='font-bold my-2'>FACTURA:</p>
            <input ref={firstRef} tabIndex="1" type="text" name="fac" className='w-full py-2 border-2 border-purple-700 rounded-3xl bg-[#1e2124] px-4' required onChange={formChange} placeholder='X11...' value={codig.fac} />
          </div>
          <div className='px-7 comprasform1'>
            <p className='font-bold my-2'>CODIGO:</p>
            <input tabIndex="2" type="text" name="cod" className='w-full py-2 border-2 border-purple-700 rounded-3xl bg-[#1e2124] px-4' required placeholder='Codigo...' onChange={formChange} onBlur={blurred} value={codig.cod} />
          </div>
          <div className='px-7 comprasform1'>
            <p className='font-bold my-2'>DESCRIPCION:</p>
            <input type="text" name="desc" list='desc' className='w-full py-2 border-2 border-purple-700 rounded-3xl bg-fuchsia-900 cursor-not-allowed px-4' required placeholder='Descripcion...' onChange={formChange} value={codig.desc} disabled />
          </div>
          <div className='m-3 comprasform1'>
            <button tabIndex="7" className='w-full h-full border-4 border-green-400 rounded-full hover:bg-green-800 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-100 duration-300 focus:-translate-y-1 focus:scale-100 font-black' type="submit">A??ADIR</button>
          </div>
          <div className='px-7 comprasform2'>
            <p className='font-bold my-2'>MONTO PAGADO:</p>
            <input tabIndex="3" type="number" name="monto" className='w-full py-2 border-2 border-purple-700 rounded-3xl bg-[#1e2124] px-4' min="0.01" step=".01" required placeholder='0.01' onChange={formChange} value={codig.monto} />
          </div>
          <div className='px-7 comprasform2'>
            <p className='font-bold my-2'>PRECIO PROD.:</p>
            <input type="number" name="precioProd" className='w-full py-2 border-2 border-purple-700 rounded-3xl bg-fuchsia-900 cursor-not-allowed px-4' min="0.01" step=".01" required placeholder='0.01' onChange={formChange} value={codig.precioProd} disabled />
          </div>
          <div className='px-7 comprasform2'>
            <p className='font-bold my-2'>CANTIDAD:</p>
            <input tabIndex="4" type="number" name="cantidad" className='w-full py-2 border-2 border-purple-700 rounded-3xl bg-[#1e2124] px-4' min="0" required placeholder='1...' onChange={formChange} value={codig.cantidad} />
          </div>
          <div className='px-7 comprasform2'>
            <p className='font-bold my-2'>CLIENTE:</p>
            <input tabIndex="5" type="text" name="cliente" className='w-full py-2 border-2 border-purple-700 rounded-3xl bg-[#1e2124] px-4' placeholder="Opcional..." onChange={formChange} value={codig.cliente} />
          </div>
          <div className='px-7 comprasform2'>
            <p className='font-bold my-2'>NIT/CI:</p>
            <input tabIndex="6" type="text" name="nit" className='w-full py-2 border-2 border-purple-700 rounded-3xl bg-[#1e2124] px-4' placeholder="..." onChange={formChange} value={codig.nit} required />
          </div>
        </form>
        <table className='comprasdos w-full text-white text-center h-fit mt-3'>
          <thead className='bg-[#2d0080] border-b [&>*]:border-gray-500'>
            <tr className='fadetext [&>th]:sticky [&>th]:overflow-auto [&>th]:resize-x'>
              <th className='py-2 w-auto'>COD</th>
              <th>USUARIO</th>
              <th>PROVEEDOR</th>
              <th>DESCRIPCION</th>
              <th>QTY</th>
              <th>MONTO PAGADO</th>
              <th>PRECIO PROD.</th>
              <th>FACTURA</th>
              <th>CLIENTE</th>
              <th>FECHA</th>
              <th>NIT/CI</th>
              <th className='bg-[#1e2124] w-fit'></th>
            </tr>
          </thead>
          <tbody>
            {tabla.map((item, index) => <tr className='whitespace-nowrap bg-[#1e2124] border-b [&>td]:border-gray-500 [&>td]:border-r fadetext' key={index}>
              <td className='py-2 w-auto'>{item.cod}</td>
              <td>{session.user}</td>
              <td>{item.prov}</td>
              <td>{item.desc}</td>
              <td>{item.cantidad}</td>
              <td>{item.monto}</td>
              <td>{item.precioProd}</td>
              <td>{item.fac}</td>
              <td>{item.cliente}</td>
              <td>{item.fecha.split('T')[0]}</td>
              <td>{item.nit}</td>
              <td><button className='w-full h-full flex justify-center items-center hover:bg-red-500 duration-300' onClick={() => {
                handleRemoveItem(index);
                axios.delete('/api/ventas', { data: { cod: item.cod, qty: item.cantidad } }).then(() => toast.success(`Codigo: ${item.cod} Borrado`, {
                  iconTheme: {
                    primary: '#A200FF',
                    secondary: '#fff',
                  },
                }))
              }}><FiTrash2 /></button></td>
            </tr>)}
          </tbody>
        </table>
        <div className='m-3 comprastres justify-center flex'>
          <button className='text-white w-full h-full border-4 border-yellow-400 rounded-full hover:bg-yellow-800 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-100 duration-300 focus:-translate-y-1 focus:scale-100 font-black' type="submit" onClick={facturaGen}>GENERAR FACTURA</button>
          <button className='text-white w-full h-full border-4 border-indigo-400 rounded-full hover:bg-indigo-800 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-100 duration-300 focus:-translate-y-1 focus:scale-100 font-black' onClick={clear}>VACIAR</button>
        </div>
      </div>
      <div className="pagina" id="printext" >
        <p className="text-center">{miscresp[0].nombre}<br />Casa Matriz<br />{miscresp[0].calle}<br />Tel??fono: {miscresp[0].telf}<br />La Paz - Bolivia<br />FACTURA ORIGINAL</p>
        <hr />
        <p className="text-center">NIT: {miscresp[0].nit}<br />Factura No.: {fac.fac}<br />Autorizacion No.: 0000</p>
        <hr />
        <p>Actividad Economica: {miscresp[0].actividad}</p>
        <p className="float-left">Fecha: {sus}</p>
        <p className="float-right">Hora: {fac.time}</p><br />
        <p>Se??or(es):{fac.datos.map((v, i) => (<span key={i}>{v.cliente}.</span>))}</p>
        <p>NIT/CI: {fac.nit}</p>
        <hr />
        <table style={{ borderBottom: '1px solid black', borderCollapse: "collapse" }}>
          <thead style={{ borderBottom: '1px solid black' }}>
            <tr>
              <th style={{ width: '10%' }}>Cant.</th>
              <th style={{ width: '15%' }}>Cod.</th>
              <th style={{ width: '45%' }}>Detalle</th>
              <th style={{ width: '15%' }}>Precio</th>
            </tr>
          </thead>
          <tbody>
            {fac.tabla.map((obj, index) => (
              <tr key={index}>
                <td>{obj.cantidad}</td>
                <td>{obj.cod}</td>
                <td>{obj.desc}</td>
                <td>{obj.precioProd}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="float-left">Total:</p>
        <p className="float-right">{fac.total}</p><br />
        <p className="float-left">Cancelado:</p>
        <p className="float-right">{fac.monto}</p><br />
        <p className="float-left">Cambio:</p>
        <p className="float-right">{(fac.monto - fac.total).toFixed(1)}</p><br />
        <p>Son: {fac.num} {parseInt((fac.total % 1).toFixed(2).substring(2))}/100 BOLIVIANOS</p><br />
        <hr />
        <p className="text-justify"><b>&quot;Esta factura contribuye al desarrollo del pa??s el uso ilicito de esta sera sancionado de acuerdo a LEY&quot;</b></p>
        <hr />
        <p className="text-justify">Ley N?? 453: El proveedor debe brindar atenci??n sin discriminacion, con respeto, calidez y cordialidad a los usuarios y consumidores.</p>
        <hr />
        <p className="text-center uppercase">Cajero: {session.user}</p>
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) return { redirect: { destination: '/unauth', permanent: false } };
  else {
    const respopt = await fetch('http://192.168.3.4:3000/api/provget');
    const misc = await fetch('http://192.168.3.4:3000/api/misc', { method: 'GET' });
    const responseopt = await respopt.json();
    const miscresp = await misc.json();
    return { props: { session, responseopt, miscresp } };
  }
} 