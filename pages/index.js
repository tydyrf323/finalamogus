import { signIn, getSession } from 'next-auth/react';
import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

export default function SignIn() {

  const router = useRouter();
  const userRef = useRef();
  const [loading, setLoad] = useState(false);
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  useEffect(() => {
    userRef.current.focus();
    const verificar = async () => {
      getSession().then((ses) => {
        setLoad(true);
        if (ses !== null) {
          if (ses.role === 0) router.push('/dashboard');
          else router.push('/ventas');
        }
      })
    }
    verificar();
  }, []);
  const handleSubmit = async e => {
    e.preventDefault();
    const login = await signIn("credentials", { usrname: user, pwd: password, redirect: false });
    if (login.status !== 200) {
      toast.error("Usuario o Contraseña incorrectos");
      setUser('');
      setPassword('');
      userRef.current.focus();
    }
    else {
      const rol = await getSession();
      if(rol.role === 0) router.push('/dashboard');
      else router.push('/ventas');
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#370617] text-white">
      <div className="px-8 py-6 mt-4 text-left bg-[#03071e] shadow-lg">
        <h3 className="text-2xl font-bold text-center text-white">Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="mt-7">
            <div>
              <label className="block">Usuario</label>
              <input type="text" ref={userRef} placeholder="Usuario..." className="px-4 py-2 mt-2 border border-green-600 rounded-full focus:outline-none focus:ring-1 focus:ring-purple-700 bg-transparent transition ease-in-out delay-50 focus:-translate-y-1 focus:scale-110 duration-300"
                name='usrname' id='usrname' autoComplete='off' onChange={(e) => setUser(e.target.value)} value={user} required />
            </div>
            <div className="mt-4">
              <label className="block">Contraseña</label>
              <input type="password" placeholder="Contraseña..." className="px-4 py-2 mt-2 border border-green-600 rounded-full focus:outline-none focus:ring-1 focus:ring-purple-700 bg-transparent  transition ease-in-out delay-50 focus:-translate-y-1 focus:scale-110 duration-300"
                name='pwd' id='pwd' onChange={(e) => setPassword(e.target.value)} value={password} required />
            </div>
            {loading ? <button className="w-full px-6 py-2 mt-7 bg-transparent rounded-md border-4 border-green-400 hover:bg-green-800 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 duration-300 focus:-translate-y-1 focus:scale-110">Login</button> : <p className="w-full px-6 py-2 mt-7 bg-transparent rounded-md border-4 border-green-400 text-center">Cargando...</p>}
          </div>
        </form>
      </div>
    </div>
  )
}
