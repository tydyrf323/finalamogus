import { getSession } from "next-auth/react";
import Navbar from "./navbar";

export default function Dashboard({ session }) {

  console.log('render');

  return <div>
    <Navbar ses={session} />
  </div>
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  console.log(session);
  if (!session) return { redirect: { destination: '/unauth', permanent: false } };
  else return { props: { session } };
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
*/