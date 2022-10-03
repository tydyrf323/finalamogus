import { getSession } from 'next-auth/react';
import { useState } from "react";
import { toast } from 'react-hot-toast';
import { FiTrash2 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import axios from 'axios';
import Head from "next/head";
import Navbar from "./navbar";
import { numeroALetras } from '../src/numeroAletra';

const hoy = new Date(Date.now());
const today = new Date();
const sus = new Date(hoy.getTime() - hoy.getTimezoneOffset() * 60000).toISOString().split('T')[0];

export default function Ventas({ session, responseopt, responsecod }) {

  const [tabla, setTabla] = useState([]);
  const [fac, setFac] = useState({
    num: '',
    time: '',
    datos: [],
    total: 0,
    monto: 0
  });
  const router = useRouter();
  const [codig, setCodig] = useState({
    prov: responseopt[0].IdProveedor,
    fecha: sus,
    desc: '',
    precioProd: 0,
    cliente: ''
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

  const blurred = async () => {
    const venta = await axios.get('/api/ventablur', { params: { codigo: codig.cod } });
    if (venta.data.length !== 0) {
      setCodig((prev) => ({
        ...prev,
        desc: venta.data[0].Descripcion,
        prov: venta.data[0].IdProveedor,
        precioProd: venta.data[0].PrecioVenta
      }))
    }
    else toast.error("Codigo Inexistente.");
  }

  function facturaGen() {
    if (tabla.length === 0) {
      toast.error("Se necesitan datos de venta para generar una factura.", {
        iconTheme: {
          primary: '#facc15',
          secondary: '#000'
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
        console.log(sum);
      }
      for (const { monto } of tabla) {
        let x = Number(monto)
        cancelado += x;
        console.log(x);
      }
      setFac({
        num: `${numeroALetras(sum)}`,
        time: today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds(),
        datos: unique,
        total: sum,
        monto: cancelado
      })
      console.log(fac);
      window.print();
    }
  }

  async function onsub(e) {
    e.preventDefault();
    const venta = await axios.get('/api/ventablur', { params: { codigo: codig.cod } });
    if (venta.data.length !== 0) {
      setTabla((prev) => [...prev, {
        fecha: codig.fecha,
        fac: codig.fac,
        prov: codig.prov,
        cod: codig.cod,
        desc: codig.desc,
        monto: codig.monto,
        precioProd: codig.precioProd,
        cantidad: codig.cantidad,
        cliente: codig.cliente
      }]);
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
      }).then(() => toast.success('Venta Añadida')).catch((e) => { console.log(e); toast.error('Error') });
    }
    else toast.error("Codigo Inexistente.");
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
            <input type="text" name="fac" className='w-full py-2 border-2 border-purple-700 rounded-3xl bg-[#1e2124] px-4' required onChange={formChange} placeholder='X11...' />
          </div>
          <div className='px-7 comprasform1'>
            <p className='font-bold my-2'>CODIGO:</p>
            <input type="text" name="cod" className='w-full py-2 border-2 border-purple-700 rounded-3xl bg-[#1e2124] px-4' required placeholder='Codigo...' onChange={formChange} onBlur={blurred} />
          </div>
          <div className='px-7 comprasform1'>
            <p className='font-bold my-2'>DESCRIPCION:</p>
            <input type="text" name="desc" list='desc' className='w-full py-2 border-2 border-purple-700 rounded-3xl bg-[#1e2124] px-4' required placeholder='Descripcion...' onChange={formChange} value={codig.desc} />
            <datalist id="desc">
              {responsecod.map((item, index) => (
                <option value={item.producto} key={index}>{item.producto}</option>
              ))}
            </datalist>
          </div>
          <div className='m-3 comprasform1'>
            <button className='w-full h-full border-4 border-green-400 rounded-full hover:bg-green-800 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-100 duration-300 focus:-translate-y-1 focus:scale-100 font-black' type="submit">AÑADIR</button>
          </div>
          <div className='px-7 comprasform2'>
            <p className='font-bold my-2'>MONTO PAGADO:</p>
            <input type="number" name="monto" className='w-full py-2 border-2 border-purple-700 rounded-3xl bg-[#1e2124] px-4' min="0.01" step=".01" required placeholder='0.01' onChange={formChange} />
          </div>
          <div className='px-7 comprasform2'>
            <p className='font-bold my-2'>PRECIO PROD.:</p>
            <input type="number" name="precioProd" className='w-full py-2 border-2 border-purple-700 rounded-3xl bg-[#1e2124] px-4' min="0.01" step=".01" required placeholder='0.01' onChange={formChange} value={codig.precioProd} />
          </div>
          <div className='px-7 comprasform2'>
            <p className='font-bold my-2'>CANTIDAD:</p>
            <input type="number" name="cantidad" className='w-full py-2 border-2 border-purple-700 rounded-3xl bg-[#1e2124] px-4' min="0" required placeholder='1...' onChange={formChange} />
          </div>
          <div className='px-7 comprasform2'>
            <p className='font-bold my-2'>CLIENTE:</p>
            <input type="text" name="cliente" className='w-full py-2 border-2 border-purple-700 rounded-3xl bg-[#1e2124] px-4' placeholder="Opcional..." onChange={formChange} />
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
              <th className='sticky resize-x overflow-auto'>MONTO PAGADO</th>
              <th className='sticky resize-x overflow-auto'>PRECIO PROD.</th>
              <th className='sticky resize-x overflow-auto'>FACTURA</th>
              <th className='sticky resize-x overflow-auto'>CLIENTE</th>
              <th className='sticky resize-x overflow-auto'>FECHA</th>
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
              <td className='border-gray-500 border-r'>{item.precioProd}</td>
              <td className='border-gray-500 border-r'>{item.fac}</td>
              <td className='border-gray-500 border-r'>{item.cliente}</td>
              <td className='border-gray-500 border-r'>{item.fecha.split('T')[0]}</td>
              <td className='border-gray-500 border-r'><button className='w-full h-full flex justify-center items-center hover:bg-red-500 duration-300' onClick={() => {
                handleRemoveItem(index);
                axios.delete('/api/ventas', { data: { id: item.cod } }).then(() => toast.success(`Codigo: ${item.cod} Borrado`, {
                  iconTheme: {
                    primary: '#A200FF',
                    secondary: '#fff',
                  },
                })).catch((e) => console.error(e))
              }}><FiTrash2 /></button></td>
            </tr>)}
          </tbody>
        </table>
        <div className='m-3 comprastres justify-center flex'>
          <button className='text-white w-1/2 h-full border-4 border-yellow-400 rounded-full hover:bg-yellow-800 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-100 duration-300 focus:-translate-y-1 focus:scale-100 font-black' type="submit" onClick={facturaGen}>GENERAR FACTURA</button>
          <button className='text-white w-1/2 h-full border-4 border-green-400 rounded-full hover:bg-green-800 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-100 duration-300 focus:-translate-y-1 focus:scale-100 font-black' type="submit" onClick={() => router.push('/ventastabla')}>VER TODOS</button>
        </div>
      </div>
      <div className="pagina" id="printext" >
        <p className="text-center">FERNANDO AGUILAR ZAPATA<br />Casa Matriz<br />AVENIDA BUENOS AIRES NRO. 930<br />Teléfono: 67067602<br />La Paz - Bolivia<br />FACTURA ORIGINAL</p>
        <hr />
        <p className="text-center">NIT: 0000<br />Factura No.: 0000<br />Autorizacion No.: 0000</p>
        <hr />
        <p>Actividad Economica: (Actividad Economica)</p>
        <p className="float-left">Fecha: {sus}</p>
        <p className="float-right">Hora: {fac.time}</p><br />
        <p>Señor(es):{fac.datos.map((v, i) => (<span key={i}>{v.cliente}.</span>))}</p>
        <p>NIT/CI: 0</p>
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
            {tabla.map((obj, index) => (
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
        <p className="float-right">{fac.monto - fac.total}</p><br />
        <p>Son: {fac.num} {parseInt((fac.total % 1).toFixed(2).substring(2))}/100 BOLIVIANOS</p><br />
        <hr />
        <p className="text-justify"><b>"Esta factura contribuye al desarrollo del país el uso ilicito de esta sera sancionado de acuerdo a LEY"</b></p>
        <hr />
        <p className="text-justify">Ley Nº 453: El proveedor debe brindar atención sin discriminacion, con respeto, calidez y cordialidad a los usuarios y consumidores.</p>
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
    const respcod = await fetch('http://192.168.3.4:3000/api/prod', { method: 'GET' });
    const responseopt = await respopt.json();
    const responsecod = await respcod.json();
    return { props: { session, responseopt, responsecod } };
  }
} 