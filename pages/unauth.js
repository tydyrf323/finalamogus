import Router from "next/router"

export default function unauth() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-[#370617] text-white">
            <h1 className="text-2xl font-bold text-center">No se inicio sesion... &nbsp;&nbsp;&nbsp;</h1>
            <button className="px-6 py-2 mt-4 bg-transparent rounded-md border-4 border-green-400 hover:bg-green-800 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 duration-300" onClick={() => Router.replace('http://192.168.3.4:3000')}>Iniciar Sesión</button>
        </div>
    )
}