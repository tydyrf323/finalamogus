import Navbar from "./navbar";

export default function Compra({ session }) {
  return (
    <Navbar ses={session} />
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  console.log(session);
  if (!session) return { redirect: { destination: '/unauth', permanent: false } };
  else return { props: { session } };
} 