import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Image from '../assets/img/house-banner.png';

// Componente encargado de realizazr las reservas
function ReservaForm() {
  const { depto } = useParams();
  const deptoJSON = JSON.parse(decodeURIComponent(depto));
  const [edificio, setEdificio] = useState([]);
  const [agente, setAgente] = useState([]);
  const [reserva, setReserva] = useState({
    nombre_cliente: '',
    email_cliente: '',
    telefono_cliente: ''
  });

  const navigate = useNavigate();

  const agenteLocal = JSON.parse(localStorage.getItem("agente"));

  const handleReservaChange = (e) => {
    setReserva((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleReservaSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8800/reservas', reserva);
      // Puedes redirigir a otra página después de enviar la reserva
      navigate('/LoginAgentes');
    } catch (err) {
      console.log(err);
    }
  };



  const load = async () => {
    console.log('agente', agenteLocal);
    await axios.get(`http://localhost:8800/agentes/${agenteLocal.id}`)
      .then(res => {
        setAgente(res.data);
        console.log("Resultado agentes -", res.data);
      })
      .catch(error => {
        console.error('Error al obtener agentes:', error);
      });
      console.log("deptoJASON:", deptoJSON);

     await axios.get(`http://localhost:8800/edificios/${deptoJSON.edificio_id}`)
      .then(resEdificio => {
        setEdificio(resEdificio.data);
        console.log("Resultado edificio -", resEdificio.data);
      })
      .catch(error => {
        console.error('Error al obtener edificio:', error);
      });
      console.log("deptoEdificio:", edificio);
    }



  return (
    <section onLoad={load}>
        <div>
        <div className='flex justify-between'>
      <div className="bg-white hover:shadow-2xl transition rounded-lg p-10 shadow-md w-96 ml-4">
        <h2 className="text-2xl font-semibold mb-4 text-center text-sky-600">
          Formulario de Reserva
        </h2>
        <form onSubmit={handleReservaSubmit}>
          <div className="mb-4">
            <div className='border rounded  p-4'>
            <label className="flex text-sky-500 text-sm font-bold mb-2" htmlFor="nombre_agente">
                Ejecutivo
                </label>
                <input
              className="border border-slate-300 text-bold text-slate-600 focus:border-sky-600 outline-none rounded w-full px-4 h-10 mb-4" placeholder='ejecutivo' value={agente.nombre} disabled
            />
            <input
              className="border border-slate-300 text-bold text-slate-600 focus:border-sky-600 outline-none rounded w-full px-4 h-10 mb-4" placeholder='Direccion' value={edificio.direccion + " " + deptoJSON.numero_depto} disabled
            />
            <input
              className="border border-slate-300 text-bold text-slate-600 focus:border-sky-600 outline-none rounded w-full px-4 h-10 mb-4" placeholder='Proyecto' value={edificio.nombre_proyecto} disabled
            />
            </div>
            
            <label
              className="flex text-sky-500 text-sm font-bold mb-2 mt-2"
              htmlFor="nombre_cliente"
            >
              Nombre
            </label>
            <input
              className="border border-slate-300 focus:border-sky-600 outline-none rounded w-full px-4 h-14 text-sm"
              type="text"
              placeholder="Ingrese su nombre"
              name="nombre_cliente"
              id="nombre_cliente"
              onChange={handleReservaChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="flex text-sky-500 text-sm font-bold mb-2"
              htmlFor="email_cliente"
            >
              Email
            </label>
            <input
              className="border border-slate-300 focus:border-sky-600 outline-none rounded w-full px-4 h-14 text-sm"
              type="text"
              placeholder="Ingrese su Email"
              name="email_cliente"
              id="email_cliente"
              onChange={handleReservaChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="flex text-sky-500 text-sm font-bold mb-2"
              htmlFor="telefono_cliente"
            >
              Telefono
            </label>
            <input
              className="border border-slate-300 focus:border-sky-600 outline-none rounded w-full px-4 h-14 text-sm"
              type="phone"
              placeholder="Ingrese su telefono"
              name="telefono_cliente"
              id="telefono_cliente"
              onChange={handleReservaChange}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-sky-600 hover:bg-sky-700 text-white rounded p-4 text-sm w-full transition"
              type="submit"
            >
              Enviar Reserva
            </button>
          </div>
        </form>
      </div>
      <div className='max-w-[880px] lg:flex py-10 mr-6'>
                <img className='justify-between' src={Image} alt='' />
            </div>
    </div>
        </div>
    </section>
     );
}

export default ReservaForm;
