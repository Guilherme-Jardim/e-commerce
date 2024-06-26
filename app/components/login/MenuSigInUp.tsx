'use client'
import { signIn } from "next-auth/react";

export default function MenuSignInUp() {

  return (
    <div className="p-4 bg-slate-900 flex items-center justify-center rounded-lg">
      <button
        className="bg-slate-500 text-white w-full p-2 rounded-md flex"
        onClick={() => signIn("google", { callbackUrl: "/perfil" })}
      >
        Login com Google
      </button>

    </div>
  );
}
