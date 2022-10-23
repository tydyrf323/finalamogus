import { getSession } from "next-auth/react";
import Navbar from "./navbar";
import Chart from 'chart.js/auto';
import Head from "next/head";
import { Bar, Pie } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { DateTime } from 'luxon';
import { useState, useEffect } from "react";
Chart.defaults.color = "#fff";

const datesColor = {
  January: 'rgba(255, 99, 132, 0.7)',
  February: 'rgba(54, 162, 235, 0.7)',
  March: 'rgba(255, 159, 64, 0.7)',
  April: 'rgba(75, 192, 192, 0.7)',
  May: 'rgba(54, 162, 235, 0.7)',
  June: 'rgba(153, 102, 255, 0.7)',
  July: 'rgba(255, 99, 132, 0.7)',
  August: 'rgba(54, 162, 235, 0.7)',
  September: 'rgba(255, 159, 64, 0.7)',
  October: 'rgba(75, 192, 192, 0.7)',
  November: 'rgba(54, 162, 235, 0.7)',
  December: 'rgba(153, 102, 255, 0.7)'
}
const datesBorder = {
  January: 'rgba(255, 99, 132, 1)',
  February: 'rgba(54, 162, 235, 1)',
  March: 'rgb(255, 159, 64)',
  April: 'rgba(75, 192, 192)',
  May: 'rgba(54, 162, 235)',
  June: 'rgba(153, 102, 255)',
  July: 'rgba(255, 99, 132)',
  August: 'rgba(54, 162, 235)',
  September: 'rgba(255, 159, 64)',
  October: 'rgba(75, 192, 192)',
  November: 'rgba(54, 162, 235)',
  December: 'rgba(153, 102, 255)'
}

export default function Dashboard({ session, pieresp }) {
  const [hora, setHora] = useState({
    x: DateTime.now().toLocaleString({ month: 'long', day: 'numeric', year: 'numeric' }),
    y: DateTime.now().toLocaleString({ weekday: "long", hour12: true, hour: "2-digit", minute: "2-digit" })
  })
  useEffect(() => {
    const interval = setInterval(() => setHora({
      x: DateTime.now().toLocaleString({ month: 'long', day: 'numeric', year: 'numeric' }),
      y: DateTime.now().toLocaleString({ weekday: "long", hour12: true, hour: "2-digit", minute: "2-digit" })
    }), 10000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return <div>
    <Head>
      <title>Dashboard</title>
    </Head>
    <div className="w-full bg-[#060b26] h-[70px]">
      <Navbar ses={session} />
      <p className="italic font-bold text-white text-center py-3 text-3xl fadetext">DASHBOARD</p>
    </div>
    <div className="dashboard">
      <div className="dash1">
        <label className="fadetext italic font-bold text-white text-center py-3 text-xl">Top 5 Productos Más Vendidos:</label>
        <Pie data={{
          labels: pieresp[0].map((v) => v.Descripcion),
          datasets: [{
            label: 'Dataset1',
            data: pieresp[0].map((v) => v.cant),
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)',
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
              'rgb(153, 102, 255)'
            ],
            hoverOffset: 7
          }]
        }
        } options={{ maintainAspectRatio: false }} />
      </div>
      <div className="dash2 flex justify-center items-center">
        <p className="text-3xl text-white font-black uppercase italic">{hora.x} <br />{hora.y}</p>
      </div>
      <div className="dash3">
        <label className="fadetext italic font-bold text-white text-center py-3 text-xl">Número De Ventas Por Mes:</label>
        <Bar data={{
          labels: ['Ventas'],
          datasets: pieresp[1].map((v) => ({
            label: v.fecha,
            data: [v.numVentas],
            backgroundColor: datesColor[v.fecha.split(' ')[0]],
            borderColor: datesBorder[v.fecha.split(' ')[0]]
          }))
        }} plugins={[ChartDataLabels]} options={{
          scales: {
            x: {
              grid: {
                color: 'white'
              }
            },
            y: {
              grid: {
                color: 'rgba(255,255,255, 0.5)'
              }
            }
          },
          plugins: {
            legend: {
              display: true
            },
            datalabels: {
              anchor: 'center',
              align: 'center',
              offset: 5,
              font: {
                size: 15
              }
            }
          }
        }} />
      </div>
      <div className="dash4">
        <label className="fadetext italic font-bold text-white text-center py-3 text-xl">Ganancia Neta Por Mes (Bs):</label>
        <Bar data={{
          labels: ['Ganancias Netas'],
          datasets: pieresp[2].map((v) => ({
            label: v.fecha,
            data: [v.numVentas],
            backgroundColor: datesColor[v.fecha.split(' ')[0]],
            borderColor: datesBorder[v.fecha.split(' ')[0]]
          }))
        }} plugins={[ChartDataLabels]} options={{
          scales: {
            x: {
              grid: {
                color: 'white'
              }
            },
            y: {
              grid: {
                color: 'rgba(255,255,255, 0.5)'
              }
            }
          },
          plugins: {
            legend: {
              display: true
            },
            datalabels: {
              anchor: 'center',
              align: 'center',
              offset: 5,
              font: {
                size: 15
              }
            }
          }
        }} />
      </div>
    </div>
  </div>
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) return { redirect: { destination: '/unauth', permanent: false } };
  else {
    const pie = await fetch('http://192.168.3.4:3000/api/dashboard', { method: 'GET' });
    const pieresp = await pie.json();
    return { props: { session, pieresp } };
  }
}
/*
Asín, va, asín va trí sex
Hola, haz venido sola? O estás de pasadita?
Que rara tu ropa, yo creo que no eres de por acá
Que bellos, que bellos son tus senos
Los miro y me enveneno
Pero no hablas mi idioma tan solo me dices
Nada entiendo, pero hay un sentimiento
Te estiro la camisa
Y veo que mi intento no tiene impedimento
Voy a tener los globos del cielo en esta noche
Resbalaré hasta explosionar entre tus montes
Firmes, tan suaves y sensibles
Los miro de cerquita
Que lindas pequitas adornan tu don monumental
Vamos, vámonos de prisa
Tus pechos me electrizan
Te pido una idea y solo me dices
Voy a tener los globos del cielo en esta noche
Resbalaré hasta explosionar entre tus montes
Voy a tener los globos del cielo en esta noche
Resbalaré hasta explosionar entre tus montes
La ra la, la ra la, la la la la, Hey!
Senos, senos moscovitas
Pezón de dinamita
Belleza furiosa me alocas, me exprimes
Me hablas te entiendo toditito
Y es que cuando me excito
Mi cuerpo resuelve cualquier impedimento
Voy a tener los globos del cielo en esta noche
Resbalaré hasta explosionar entre tus montes
Voy a tener los globos del cielo en esta noche
Resbalaré hasta explosionar entre tus montes
La ra la, la ra la, la la la la, Hey!
Voy a tener los globos del cielo en esta noche
Resbalaré hasta explosionar entre tus montes
Voy a tener los globos del cielo en esta noche
Resbalaré hasta explosionar entre tus montes
Voy a tener los globos del cielo en esta noche
Resbalaré hasta explosionar entre tus montes
Hey!
Carajo han pasado dos meses de esta cosa y recien lo puedo editar pinche culos maman verga
*/