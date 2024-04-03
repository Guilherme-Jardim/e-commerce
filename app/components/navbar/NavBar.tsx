'use client'
import { useSession } from "next-auth/react";
import Link from "next/link";
import MenuAvatarLogOut from "../logout/MenuAvatarLogOut";
import MenuAvatarSigIn from "../login/MenuAvatarSigIn";

export default function NavBar() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return null;
  }

  return (
    <nav className="fixed top-0 w-full flex items-center py-2 px-8 justify-between z-50 bg-slate-800 text-gray-300">
      <Link href='/' className="uppercase font-bold text-md h-12 flex items-center">
        Next Store
      </Link>
      <div className="relative">
        <div className="">
          {session ? (
            <MenuAvatarLogOut />
          ) : (
            <MenuAvatarSigIn />
          )}
        </div>
      </div>
    </nav>
  );
}
