import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8800/login', { email, password })
      .then(res => {
        console.log("login:", res);
        setIsLoggedIn(true);
       localStorage.setItem("log", "1");
       localStorage.setItem("agente", JSON.stringify(res.data[0]));
       console.log("agenteCacheado:", localStorage.getItem("agente"));
        navigate('/');
      })
      .catch(err => {
        if (err.response.status === 401) {
          setError("Email o contraseña incorrectas!");
        } else {
          console.log("Error en la autenticación");
        }
      });
  }

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="bg-white p-5 hover:shadow-2xl transition rounded-lg  shadow-md w-96">
        <h2 className="text-3xl text-center font-semibold text-sky-600 p-3 font-poppins">Inicio de sesión</h2>
        <form onSubmit={handleLogin}>
          {error && <p className="text-sky-500 text-sm mb-3">{error}</p>}
          <div className="mb-4">
            <label className="flex text-sky-500 text-center text-sm font-bold mb-2" htmlFor="mail">
              Correo Electronico
            </label>
            <input
              className="border border-slate-300 focus:border-sky-600 outline-none rounded w-full px-4 h-14 text-sm" type="text" placeholder="Correo Electronico"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sky-500 text-sm font-bold mb-2" htmlFor="password">
              Contraseña
            </label>
            <input
              className="border border-slate-300 focus:border-sky-600 outline-none rounded w-full px-4 h-14 text-sm" type="password" placeholder="Contraseña"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-sky-600 hover:bg-sky-700 text-white rounded p-4 text-sm w-full transition"
              type="submit"
            >
              Iniciar sesión
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

