import { FaBars, FaUserAlt, FaMoneyCheck, FaSignOutAlt } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import { useState } from 'react';
import { RiMoneyDollarBoxLine, RiBarChart2Fill, RiHotelFill, RiProfileFill, RiInstallFill } from 'react-icons/ri';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';

export default function Navbar({ ses }) {

  const router = useRouter();
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  const salir = () => signOut({ callbackUrl: `/` })

  return (
    <>
      <div className='navbar transition ease-in-out delay-50 hover:bg-indigo-500 duration-300'>
        <button className='menu-bars w-full h-full' onClick={showSidebar}>
          <FaBars color='#fff' />
        </button>
      </div>
      <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        <ul className="nav-menu-items">
          <li className="navbar-toggle transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 hover:bg-red-500 duration-300">
            <button className='menu-bars w-full' onClick={showSidebar}>
              <AiOutlineClose color='#FFF' />
            </button>
          </li>
          <li className="navbar-toggle nav-text transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300">
            <button className='menu-bars'>
              <FaUserAlt /><span>{ses.user}</span>
            </button>
          </li>
          <li className="navbar-toggle nav-text transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300">
            <button className='menu-bars' onClick={() => router.push('/dashboard')}>
              <RiBarChart2Fill /><span>Dashboard</span>{/**/}
            </button>
          </li>
          <li className="navbar-toggle nav-text transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300">
            <button className='menu-bars' onClick={() => router.push('/compra')}>
              <RiHotelFill /><span>Compra</span>{/**/}
            </button>
          </li>
          <li className="navbar-toggle nav-text transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300">
            <button className='menu-bars' onClick={() => router.push('/proveedores')}>
              <RiInstallFill /><span>Proveedores</span>{/**/}
            </button>
          </li>
          <li className="navbar-toggle nav-text transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300">
            <button className='menu-bars'>
              <RiProfileFill /><span>Inventario</span> {/**/}
            </button>
          </li>
          <li className="navbar-toggle nav-text transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300">
            <button className='menu-bars'>
              <FaMoneyCheck /><span>Reg. de Ventas</span>
            </button>
          </li>
          <li className="navbar-toggle nav-text transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300">
            <button className='menu-bars'>
              <RiMoneyDollarBoxLine /><span>Gastos</span>
            </button>
          </li>
          <li className="navbar-toggle nav-text transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300">
            <button className='menu-bars'>
              <RiProfileFill /><span>Solicitar Prod.</span>
            </button>
          </li>
          <li className="navbar-toggle nav-text transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300">
            <button className='menu-bars'>
              <RiProfileFill /><span>Reserva de Prod.</span>
            </button>
          </li>
          <li className="navbar-toggle nav-text transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 hover:bg-red-500 duration-300">
            <button className='menu-bars' onClick={salir}>
              <FaSignOutAlt /><span>Salir</span>
            </button>
          </li>
        </ul>
      </nav>
    </>)
}