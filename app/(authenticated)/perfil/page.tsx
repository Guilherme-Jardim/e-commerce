import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Perfil() {
  const session = await getServerSession();
  const imageUrl = session?.user?.image;
  if (!session) {
    return redirect('/');
  }
  return (
    <div>
      <p>Olá, {session?.user?.name}</p>
      <p>Email: {session?.user?.email}</p>
      {typeof imageUrl === 'string' && (
        <Image
          alt="Imagem Perfil"
          src={imageUrl}
          width={50}
          height={50}
        />
      )}
    </div>
  );
}
