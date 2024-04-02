"use client"
import { signIn } from "next-auth/react";

export default function MenuSigInUp() {
  async function login(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    signIn("credentials", {
      ...data,
      callbackUrl: "/perfil",
    });
  }
  return (
    <div className="p-4 bg-slate-900">
      <h2 className="text-lg font-medium text-white">Login</h2>
      <form onSubmit={login}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full border-b text-slate-950 border-gray-200 mb-4 p-2"
        />
        <input
          name="password"
          type="password"
          placeholder="Senha"
          className="w-full border-b text-slate-950 border-gray-200 mb-4 p-2"
        />
        <button
          type="submit"
          className="bg-slate-500 text-white w-full p-2 rounded-md"
        >Entrar
        </button>
      </form>
      <p
        className="mt-2 text-sm text-white"
      >Esqueci minha senha</p>
      <hr className="my-4 bg-white" />
      <p
        className="text-sm text-white"
      > Ainda não tem conta?</p>
      <a
        href="/register"
        className="text-white underline"
      >Registre-se</a>
      <div>
        <button
          type="submit"
          className="bg-slate-500 text-white w-full p-2 rounded-md"
          onClick={() => signIn("github", { callbackUrl: "/perfil" })}
        >Login com GitHub
        </button>
        <button
          type="submit"
          className="bg-slate-500 text-white w-full p-2 rounded-md"
          onClick={() => signIn("google", { callbackUrl: "/perfil" })}
        >Login com Google
        </button>
      </div>
    </div>
  );
}