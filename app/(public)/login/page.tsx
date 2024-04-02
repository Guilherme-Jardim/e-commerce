import { getServerSession } from "next-auth";

export default async function login() {
  const session = await getServerSession();
  return (
    <div>
      <p>Olá {session?.user?.name}</p>
    </div>
  );
}
