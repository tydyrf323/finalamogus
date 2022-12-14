import { getSession } from 'next-auth/react';
import { useState } from "react";
import { toast } from 'react-hot-toast';
import { FiTrash2, FiEdit } from 'react-icons/fi';
import axios from 'axios';
import Head from "next/head";
import Navbar from "./navbar";

export default function Productos({ session, response }) {

  const [newTable, setnewTable] = useState(response);
  const [codig, setCodig] = useState({});
  const [editOn, setEdit] = useState({
    edit: false,
    id: 0
  });
  const [text, setText] = useState('');

  const formChange = (event) => {
    let fieldName = event.target.getAttribute('name');
    let fieldValue = event.target.value;
    if (fieldName === 'cod') fieldValue = event.target.value.toUpperCase();
    let newFormData = { ...codig };
    newFormData[fieldName] = fieldValue;
    setCodig(newFormData);
  }

  const blurred = () => {
    axios.post('/api/prodedit', {
      id: editOn.id,
      prod: text
    }).then(() => {
      setEdit({ edit: false, id: 0 });
      setText('');
      axios.get('/api/prod').then((lol) => setnewTable(lol.data));
    })
  }

  async function onsub(e) {
    e.preventDefault();
    await axios.post('/api/prod', {
      prod: codig.prod,
      cod: codig.cod,
    }).then(async () => {
      toast.success("Producto Registrado");
      let x = await axios.get('/api/prod');
      setnewTable(x.data);
    }).catch(() => {
      toast.error("Producto repetido");
    })
  };

  return (
    <div className='proveedores'>
      <Head>
        <title>PRODUCTOS</title>
      </Head>
      <div className="w-full bg-[#060b26] title">
        <Navbar ses={session} />
        <p className="italic font-bold text-white text-center py-3 text-3xl fadetext">CATEGORIAS</p>
      </div>
      <table className='uno w-full text-white text-center h-fit'>
        <thead className='bg-[#2d0080] border-b border-gray-500'>
          <tr className='fadetext'>
            <th className='sticky py-2'>ID</th>
            <th className='sticky'>PRODUCTO</th>
            <th className='sticky'>CODIGO</th>
            <th className='sticky'>FECHA CREACION</th>
            <th className='sticky bg-[#1e2124]'></th>
            <th className='sticky bg-[#1e2124]'></th>
          </tr>
        </thead>
        <tbody>
          {newTable.map((item) => <tr className='whitespace-nowrap bg-[#1e2124] border-b border-gray-500 fadetext' key={item.id}>
            <td className='py-2 font-semibold border-gray-500 border-r'>{item.id}</td>
            <td className='border-gray-500 border-r'>{editOn.edit && editOn.id === item.id ? (
              <input type='text' onChange={(e) => setText(e.target.value)} onBlur={blurred} className='text-center' placeholder={item.producto} />
            ) : item.producto}</td>
            <td className='border-gray-500 border-r'>{item.codigo}</td>
            <td className='border-gray-500 border-r'>{item.fecha.split('T')[0]}</td>
            <td className='border-gray-500 border-r'><button className='w-full h-full flex justify-center items-center hover:bg-violet-700 duration-300' onClick={() => { setEdit({ edit: true, id: item.id }); }}><FiEdit /></button></td>
            <td className='border-gray-500 border-r'><button className='w-full h-full flex justify-center items-center hover:bg-red-500 duration-300' onClick={() => {
              axios.delete('/api/prod', { data: { id: item.id } }).then(async () => {
                toast.success("Proveedor Borrado");
                let x = await axios.get('/api/prod');
                setnewTable(x.data);
              }).catch(() => {
                toast.error("Error");
              })
            }}><FiTrash2 /></button></td>
          </tr>)}
        </tbody>
      </table>
      <form className='dos text-white proveedoresform fadetext' onSubmit={onsub} autoComplete='off' onChange={formChange}>
        <div className='px-7'>
          <p className='font-bold my-2'>PRODUCTO:</p>
          <input type="text" name="prod" className='w-full py-2 border-2 border-purple-700 rounded-3xl bg-[#1e2124] px-4' required placeholder='Silla...' />
        </div>
        <div className='px-7'>
          <p className='font-bold my-2'>CODIGO:</p>
          <input type="text" name="cod" className='w-full py-2 border-2 border-purple-700 rounded-3xl bg-[#1e2124] px-4' placeholder="A-1..." />
        </div>
        <div className='m-3'>
          <button className='w-full h-full border-4 border-green-400 rounded-full hover:bg-green-800 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-100 duration-300 focus:-translate-y-1 focus:scale-100 font-black' type="submit">A??ADIR</button>
        </div>
      </form>
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session || session.role === 1) return { redirect: { destination: '/unauth', permanent: false } };
  else {
    const resp = await fetch('http://192.168.3.4:3000/api/prod');
    const response = await resp.json();
    return { props: { session, response } };
  }
} 