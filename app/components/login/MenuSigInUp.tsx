import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function MenuSigInUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailInputError, setEmailInputError] = useState(false);
  const [passwordInputError, setPasswordInputError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const validate = () => {
      let emailIsValid = validateEmail(email);

      if (!emailIsValid) {
        setEmailInputError(true);
      } else {
        setEmailInputError(false);
      }

      if (password.length < 6) {
        setPasswordInputError(true);
      } else {
        setPasswordInputError(false);
      }
    };

    validate();
  }, [email, password]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    let res = await signIn("credentials", {
      email,
      password,
      callbackUrl: `/perfil`,
      redirect: false,
    });

    setIsLoading(false);

    if (res?.ok) {
      console.log("success");
    } else {
      setError("Failed! Check you input and try again.");
      console.log("Failed", res);
    }
  }

  function validateEmail(email: string) {
    return email.includes('@');
  }

  if (isLoading) {
    return <p className="flex h-full">Loading...</p>;
  }

  return (
    <div className="p-4 bg-slate-900">
      <h2 className="text-lg font-medium text-white">Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          className={`w-full border-b text-slate-950 border-gray-200 mb-4 p-2 ${emailInputError ? "border-red-500" : ""}`}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          name="password"
          type="password"
          placeholder="Senha"
          className={`w-full border-b text-slate-950 border-gray-200 mb-4 p-2 ${passwordInputError ? "border-red-500" : ""}`}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-slate-500 text-white w-full p-2 rounded-md"
        >
          Entrar
        </button>
      </form>
      <p className="mt-2 text-sm text-white">Esqueci minha senha</p>
      <hr className="my-4 bg-white" />
      <p className="text-sm text-white">Ainda não tem conta?</p>
      <Link href="/register">Registre-se</Link>
      <div>
        <button
          className="bg-slate-500 text-white w-full p-2 rounded-md"
          onClick={() => signIn("github", { callbackUrl: "/perfil" })}
        >
          Login com GitHub
        </button>
        <button
          className="bg-slate-500 text-white w-full p-2 rounded-md"
          onClick={() => signIn("google", { callbackUrl: "/perfil" })}
        >
          Login com Google
        </button>
      </div>
    </div>
  );
}
