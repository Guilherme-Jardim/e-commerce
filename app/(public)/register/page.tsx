export default function Register() {
  return (
    <div className="min-h-screen flex-grow flex flex-col justify-center items-center">
      <header>
        <h1>Registro</h1>
      </header>
      <main className="">
        <form /*onSubmit={handleSubmit}*/ className="w-full max-w-md p-8">
          <label htmlFor="name" className="block mb-2">Nome</label>
          <input
            type="text"
            id="name"
            name="name"
            // value={formData.name}
            //  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full border border-gray-300 rounded-md p-2"
          />
          <label htmlFor="email" className="block mb-2 mt-4">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            // value={formData.email}
            //  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full border border-gray-300 rounded-md p-2"
          />
          <label htmlFor="password" className="block mb-2 mt-4">Senha</label>
          <input
            type="password"
            id="password"
            name="password"
            // value={formData.password}
            // onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
    </div >
  );
}