'use client'
import { SyntheticEvent, useState } from "react";
import { Prisma } from "@prisma/client";

export default function Register() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [passError, setPassError] = useState(false);

  useEffect(() => {
    validatePassword(password, confirmPassword);
  }, [password, confirmPassword]);

  function validatePassword(pass, confrimPass) {
    let isValid = pass === confrimPass;
    if (!isValid) {
      setPassError(true);
    }
  }
  async function handleSubmit(e) {
    e.preventDefault();
    let userData = {
      name,
      email,
      password,
    };

    // Make call to backend to create user
    const res = await fetch("http://localhost:3000/api/user/create", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      const data = await res.json();
      router.push('/login')

      // registration success
    } else {
      //registration faled
    }
  }

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();

    try {
      // Crie um novo usuário no banco de dados usando o Prisma Client
      const newUser = await Prisma.create({
        data: {
          name: formData.name,
          email: formData.email,
          password: formData.password
        }
      });

      console.log("Novo usuário criado:", newUser);

      // Limpe o formulário após a criação do usuário
      setFormData({ name: "", email: "", password: "" });
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
    }
  }

  return (
    <div className="min-h-screen flex-grow flex flex-col justify-center items-center">
      <header>
        <h1>Registro</h1>
      </header>
      <main className="">
        <form onSubmit={handleSubmit} className="w-full max-w-md p-8">
          <label htmlFor="name" className="block mb-2">Nome</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full border border-gray-300 rounded-md p-2"
          />
          <label htmlFor="email" className="block mb-2 mt-4">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full border border-gray-300 rounded-md p-2"
          />
          <label htmlFor="password" className="block mb-2 mt-4">Senha</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full border border-gray-300 rounded-md p-2"
          />
          <button type="submit" className="bg-blue-500 text-white w-full p-2 mt-4 rounded-md">
            Registrar
          </button>
        </form>
      </main>
      <footer>
        <p>Copyright &copy; 2024</p>
      </footer>
    </div>
  );
}
