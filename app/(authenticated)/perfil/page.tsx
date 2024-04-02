import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Perfil() {
  const session = await getServerSession();
  if (!session) {
    return redirect('/');
  }
  return (
    <div>
      <p>Olá, {session?.user?.name}</p>
      <p>Email: {session?.user?.email}</p>
      <p>Image url: {session?.user?.image}</p>
    </div>
  );
}
