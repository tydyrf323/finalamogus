import Navbar from "./navbar";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { FaSave } from 'react-icons/fa'
import { useState } from "react";

export default function Home({ session }) {
  
  const [datos, setData] = useState({});
  const formChange = (event) => {
    let fieldName = event.target.getAttribute('name');
    let fieldValue = event.target.value;
    let newFormData = { ...codig };
    newFormData[fieldName] = fieldValue;
    setCodig(newFormData);
    console.log(codig);
  }

  return <main>
    <Head>
      <title>{session.user}</title>
    </Head>
    <div className="w-full bg-[#060b26] h-[70px]">
      <Navbar ses={session} />
      <p className="italic font-bold text-white text-center py-3 text-3xl fadetext">{session.user}</p>
    </div>
    <section className="flex justify-center items-center fadetext text-white">
      <div className="w-80">
        <h1 className="italic font-bold text-center py-3 text-xl">Datos para Factura:</h1> <br />
        <p className='font-bold my-2 block'>Nombre:</p>
        <div className="flex items-center border-b border-purple-500 py-2">
          <input className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Fernando Aguilar..." onChange={formChange} />
          <button name="nombre" className="flex-shrink-0 bg-purple-500 hover:bg-purple-700 border-purple-500 hover:border-purple-700 text-sm border-4 text-white py-1 px-2 rounded" type="button">
            <FaSave />
          </button>
        </div>
        <p className='font-bold my-2 block'>Calle:</p>
        <div className="flex items-center border-b border-purple-500 py-2">
          <input className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Av. Buenos Aires..." onChange={formChange} />
          <button name="calle" className="flex-shrink-0 bg-purple-500 hover:bg-purple-700 border-purple-500 hover:border-purple-700 text-sm border-4 text-white py-1 px-2 rounded" type="button">
            <FaSave />
          </button>
        </div>
        <p className='font-bold my-2 block'>Teléfono:</p>
        <div className="flex items-center border-b border-purple-500 py-2">
          <input className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none" type="number" placeholder="67067602..." onChange={formChange} />
          <button name="telf" className="flex-shrink-0 bg-purple-500 hover:bg-purple-700 border-purple-500 hover:border-purple-700 text-sm border-4 text-white py-1 px-2 rounded" type="button">
            <FaSave />
          </button>
        </div>
        <p className='font-bold my-2 block'>NIT:</p>
        <div className="flex items-center border-b border-purple-500 py-2">
          <input className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none" type="number" placeholder="123456789..." onChange={formChange} />
          <button name="nit" className="flex-shrink-0 bg-purple-500 hover:bg-purple-700 border-purple-500 hover:border-purple-700 text-sm border-4 text-white py-1 px-2 rounded" type="button">
            <FaSave />
          </button>
        </div>
        <p className='font-bold my-2 block'>Actividad Economica:</p>
        <div className="flex items-center border-b border-purple-500 py-2">
          <input className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="..." onChange={formChange} />
          <button name="actividad" className="flex-shrink-0 bg-purple-500 hover:bg-purple-700 border-purple-500 hover:border-purple-700 text-sm border-4 text-white py-1 px-2 rounded" type="button">
            <FaSave />
          </button>
        </div>
        <h1 className="italic font-bold text-center py-3 text-xl">Datos Varios:</h1>
        <p className='font-bold my-2 block'>Porcentaje de Ganancia (1-100):</p>
        <div className="flex items-center border-b border-purple-500 py-2">
          <input min="0" max="100" className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none" type="number" placeholder="30%..." onChange={formChange} />
          <button name="porcentaje" className="flex-shrink-0 bg-purple-500 hover:bg-purple-700 border-purple-500 hover:border-purple-700 text-sm border-4 text-white py-1 px-2 rounded" type="button">
            <FaSave />
          </button>
        </div>
      </div>
    </section>
  </main>
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) return { redirect: { destination: '/unauth', permanent: false } };
  else {
    return { props: { session } };
  }
} 