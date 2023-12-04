import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [usuario, setUsuario] = useState({
    nombre: '',
    email: '',
    password: '',
  });

  const [correoExistente, setCorreoExistente] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // Verificar si el correo electrónico ya está registrado
      const existeUsuario = await axios.post('http://localhost:8800/usuarios/verificar-email', {
        email: usuario.email,
      });

      if (existeUsuario.data.existe) {
        // El correo electrónico ya está registrado
        setCorreoExistente(true);
      } else {
        // El correo electrónico no está registrado, procede con el registro
        await axios.post('http://localhost:8800/usuarios', usuario);
        navigate('/Login');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleInputChange = (e) => {
    setUsuario((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setCorreoExistente(false); // Restablecer la bandera al cambiar el correo electrónico
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white hover:shadow-2xl transition rounded-lg p-8 shadow-md w-96">
        <h2 className="text-3xl font-semibold mb-4 text-center text-sky-600">Registro</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="flex text-sky-500 text-sm font-bold mb-2" htmlFor="nombre">
              Nombre de usuario
            </label>
            <input
              className="border border-slate-300 focus:border-sky-600 outline-none rounded w-full px-4 h-14 text-sm"
              type="text"
              placeholder="Nombre de usuario"
              name="nombre"
              id="nombre"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="flex text-sky-500 text-sm font-bold mb-2" htmlFor="email">
              Correo Electrónico
            </label>
            <input
              className={`border ${correoExistente ? 'border-red-500' : 'border-slate-300'} focus:border-sky-600 outline-none rounded w-full px-4 h-14 text-sm`}
              placeholder="Correo Electronico"
              name="email"
              id="email"
              type="email"
              onChange={handleInputChange}
              required
            />
            {correoExistente && (
              <p className="text-red-500 text-sm mt-2">El correo electrónico ya está registrado.</p>
            )}
          </div>
          <div className="mb-4">
            <label className="flex text-sky-500 text-sm font-bold mb-2" htmlFor="password">
              Contraseña
            </label>
            <input
              className="border border-slate-300 focus:border-sky-600 outline-none rounded w-full px-4 h-14 text-sm"
              placeholder="Contraseña"
              name="password"
              id="password"
              type="password"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-sky-600 hover:bg-sky-700 text-white rounded p-4 text-sm w-full transition"
              type="submit"
            >
              Registrarse
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
