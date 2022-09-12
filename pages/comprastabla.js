<table className='comprasdos w-full text-white text-center h-fit mt-3'>
<thead className='bg-[#2d0080] border-b border-gray-500'>
  <tr className='fadetext'>
    <th className='sticky py-2 resize-x overflow-auto w-auto'>COD</th>
    <th className='sticky resize-x overflow-auto'>USUARIO</th>
    <th className='sticky resize-x overflow-auto'>PROVEEDOR</th>
    <th className='sticky resize-x overflow-auto'>DESCRIPCION</th>
    <th className='sticky resize-x overflow-auto'>QTY</th>
    <th className='sticky resize-x overflow-auto'>MONTO TOTAL</th>
    <th className='sticky resize-x overflow-auto'>PRECIO VENTA</th>
    <th className='sticky resize-x overflow-auto'>FACTURA</th>
    <th className='sticky resize-x overflow-auto'>FECHA</th>
    <th className='sticky resize-x overflow-auto'>OBSERVACION</th>
    <th className='sticky bg-[#1e2124] w-fit'></th>
  </tr>
</thead>
<tbody>
  {newTable.map((item, index) => <tr className='whitespace-nowrap bg-[#1e2124] border-b border-gray-500 fadetext' key={index}>
    <td className='py-2 border-gray-500 border-r w-auto'>{item.Codigo}</td>
    <td className='border-gray-500 border-r'>{item.IdUsuario}</td>
    <td className='border-gray-500 border-r'>{item.IdProveedor}</td>
    <td className='border-gray-500 border-r'>{item.Descripcion}</td>
    <td className='border-gray-500 border-r'>{item.Cantidad}</td>
    <td className='border-gray-500 border-r'>{item.MontoTotal}</td>
    <td className='border-gray-500 border-r'>{item.PrecioVenta}</td>
    <td className='border-gray-500 border-r'>{item.Factura}</td>
    <td className='border-gray-500 border-r'>{item.FechaCompra.split('T')[0]}</td>
    <td className='border-gray-500 border-r'>{item.Observacion}</td>
    <td className='border-gray-500 border-r'><button className='w-full h-full flex justify-center items-center hover:bg-red-500 duration-300' onClick={() => {
      axios.post('/api/delcompra', {
        prov: item.IdCompra
      }).then(async () => {
        toast.success("Compra Borrada");
        let x = await axios.get('/api/compraget');
        setnewTable(x.data);
      }).catch(() => {
        toast.error("Error");
      })
    }}><FiTrash2 /></button></td>
  </tr>)}
</tbody>
</table>

export async function getServerSideProps(context) {
    const session = await getSession(context);
    console.log(session);
    if (!session) return { redirect: { destination: '/unauth', permanent: false } };
    else {
      const resp = await fetch('http://192.168.3.4:3000/api/compraget');
      const respopt = await fetch('http://192.168.3.4:3000/api/provget');
      const response = await resp.json();
      const responseopt = await respopt.json();
      return { props: { session, response, responseopt } };
    }
  } 