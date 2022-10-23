import { getSession } from 'next-auth/react';
import { useState } from "react";
import { toast } from 'react-hot-toast';
import { FiTrash2 } from 'react-icons/fi';
import axios from 'axios';
import Head from "next/head";
import Navbar from "./navbar";

export default function Proveedores({ session, response }) {

  const [newTable, setnewTable] = useState(response);
  const [codig, setCodig] = useState({});

  const formChange = (event) => {
    let fieldName = event.target.getAttribute('name');
    let fieldValue = event.target.value;
    let newFormData = { ...codig };
    newFormData[fieldName] = fieldValue;
    setCodig(newFormData);
  }

  async function onsub(e) {
    e.preventDefault();
    await axios.post('/api/provget', {
      prov: codig.prov,
      tel: codig.tel,
      correo: codig.correo
    }).then(async () => {
      toast.success("Proveedor Registrado");
      let x = await axios.get('/api/provget');
      setnewTable(x.data);
    }).catch(() => {
      toast.error("Proveedor repetido");
    })
  };

  return (
    <div className='proveedores'>
      <Head>
        <title>Proveedores</title>
      </Head>
      <div className="w-full bg-[#060b26] title">
        <Navbar ses={session} />
        <p className="italic font-bold text-white text-center py-3 text-3xl fadetext">PROVEEDORES</p>
      </div>
      <table className='uno w-full text-white text-center h-fit'>
        <thead className='bg-[#2d0080] border-b border-gray-500'>
          <tr className='fadetext'>
            <th className='sticky py-2'>PROVEEDOR</th>
            <th className='sticky'>TELÉFONO</th>
            <th className='sticky'>CORREO/EMAIL</th>
            <th className='sticky'>FECHA CREACION</th>
            <th className='sticky bg-[#1e2124]'></th>
          </tr>
        </thead>
        <tbody>
          {newTable.map((item, index) => <tr className='whitespace-nowrap bg-[#1e2124] border-b border-gray-500 fadetext' key={index}>
            <td className='py-2 font-semibold border-gray-500 border-r'>{item.IdProveedor}</td>
            <td className='border-gray-500 border-r'>{item.Telefono}</td>
            <td className='border-gray-500 border-r'>{item.Correo}</td>
            <td className='border-gray-500 border-r'>{item.FechaCreacion.split('T')[0]}</td>
            <td className='border-gray-500 border-r'><button className='w-full h-full flex justify-center items-center hover:bg-red-500 duration-300' onClick={() => {
              axios.post('/api/delprov', {
                prov: item.IdProveedor
              }).then(async () => {
                toast.success("Proveedor Borrado");
                let x = await axios.get('/api/provget');
                setnewTable(x.data);
              }).catch(() => {
                toast.error("Error");
              })
            }}><FiTrash2 /></button></td>
          </tr>)}
        </tbody>
      </table>
      <form className='dos text-white proveedoresform fadetext' onSubmit={onsub} autoComplete='off'>
        <div className='px-7'>
          <p className='font-bold my-2'>NOMBRE DEL PROVEEDOR:</p>
          <input type="text" name="prov" className='w-full py-2 border-2 border-purple-700 rounded-3xl bg-[#1e2124] px-4' onChange={formChange} required />
        </div>
        <div className='px-7'>
          <p className='font-bold my-2'>TELEFONO:</p>
          <input type="text" name="tel" className='w-full py-2 border-2 border-purple-700 rounded-3xl bg-[#1e2124] px-4' onChange={formChange} placeholder="Opcional..." />
        </div>
        <div className='px-7'>
          <p className='font-bold my-2'>CORREO/EMAIL:</p>
          <input type="text" name="correo" className='w-full py-2 border-2 border-purple-700 rounded-3xl bg-[#1e2124] px-4' onChange={formChange} placeholder="Opcional..." />
        </div>
        <div className='m-3'>
          <button className='w-full h-full border-4 border-green-400 rounded-full hover:bg-green-800 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-100 duration-300 focus:-translate-y-1 focus:scale-100 font-black' type="submit">AÑADIR</button>
        </div>
      </form>
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session || session.role === 1) return { redirect: { destination: '/unauth', permanent: false } };
  else {
    const resp = await fetch('http://192.168.3.4:3000/api/provget');
    const response = await resp.json();
    return { props: { session, response } };
  }
} 