import { useEffect, useState } from "react";
import { numeroALetras } from "../../src/numeroAletra";

export default function PrintShit() {

  const [tiempo, setTiempo] = useState({
    dia: '',
    hora: '',
    data: '',
    cent: ''
  });
  useEffect(() => {
    const num = 512.5
    const x = numeroALetras(num);
    const today = new Date();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const hoy = new Date(Date.now());
    const sus = new Date(hoy.getTime() - hoy.getTimezoneOffset() * 60000).toISOString().split('T')[0];
    setTiempo({
      dia: sus,
      hora: time,
      data: x,
      cent: parseInt((num % 1).toFixed(2).substring(2))
    })
  }, [])
  return (
    <div className="pagina">
      <button onClick={() => window.print()} id='imprimir'>PRINT</button>
      <p className="text-center">FERNANDO AGUILAR ZAPATA<br />Casa Matriz<br />AVENIDA BUENOS AIRES NRO. 930<br />Teléfono: 67067602<br />La Paz - Bolivia<br />FACTURA ORIGINAL</p>
      <hr />
      <p className="text-center">NIT: 0000<br />Factura No.: 0000<br />Autorizacion No.: 0000</p>
      <hr />
      <p>Actividad Economica: (Actividad Economica)</p>
      <p className="float-left">Fecha: {tiempo.dia}</p>
      <p className="float-right">Hora: {tiempo.hora}</p><br />
      <p>Señor(es): (aaaaaa)</p>
      <p>NIT/CI: 0</p>
      <hr />
      <table style={{ borderBottom: '1px solid black', borderCollapse: "collapse" }}>
        <thead style={{ borderBottom: '1px solid black' }}>
          <tr>
            <th style={{ width: '10%' }}>Cant.</th>
            <th style={{ width: '15%' }}>Cod.</th>
            <th style={{ width: '45%' }}>Detalle</th>
            <th style={{ width: '15%' }}>Precio</th>
            <th style={{ width: '15%' }}>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>X11</td>
            <td>MESA</td>
            <td>10.00</td>
            <td>10.00</td>
          </tr>
        </tbody>
      </table>
      <p className="float-left">Total:</p>
      <p className="float-right">10.00</p><br />
      <p className="float-left">Cancelado:</p>
      <p className="float-right">10.00</p><br />
      <p className="float-left">Cambio:</p>
      <p className="float-right">10.00</p><br />
      <p>Son: {tiempo.data} {tiempo.cent}/100 BOLIVIANOS</p><br />
      <hr />
      <p className="text-justify"><b>"Esta factura contribuyeal desarrollo del país el uso ilicito de esta sera sancionado de acuerdo a LEY"</b></p>
      <hr />
      <p className="text-justify">Ley Nº 453: El proveedor debe brindar atención sin discriminacion, con respeto, calidez y cordialidad a los usuarios y consumidores.</p>
      <hr />
      <p className="text-center">Cajero: FERCH</p>
    </div>
  )
}
