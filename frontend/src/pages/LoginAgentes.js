import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ReservaUsuario() {

  //const reservasAgente;
  const [reservas, setReservas] = useState([]);
  const agenteLocal = JSON.parse(localStorage.getItem("agente"));
  const navigate = useNavigate();

  useEffect(() => {
    // Realiza la solicitud GET para obtener los edificios con información de proyectos
    axios.get('http://localhost:8800/reservas')
      .then(res => {
        setReservas(res.data);
        console.log("resultado reservas", res)
      })
      .catch(error => {
        console.error('Error al obtener reservas:', error.response);
      });
  }, []); // El segundo argumento [] indica que el efecto se ejecuta solo una vez al montar el componente

  //reservasAgente = reservas.filter(reserva => reserva.agente === agenteLocal.id);

  const [setAgentes] = useState([]);

  useEffect(() => {

    const fetchTodos = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/agentes/${agenteLocal.id}`)
        setAgentes(response.data);
        console.log("resultado agentes", response.data);
      } catch (error) {
        console.error('Error al obtener agentes:', error);
      }
    }
    fetchTodos();
  },[])

  const [setEdificios] = useState([]);

  useEffect(() => {
    // Realiza la solicitud GET para obtener la información de los agentes
    axios.get('http://localhost:8800/edificios')
      .then(res => {
        setEdificios(res.data);
        console.log("resultado agentes", res);
      })
      .catch(error => {
        console.error('Error al obtener agentes:', error);
      });
  }, []);

  const eliminar = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/reservas/${id}`);
      window.location.reload(false);
    } catch (error) {
      console.log('Error al eliminar:', error);
    }
  }

  return (
    <section className='min-h-screen'>
          <div className="grid grid-flow-row items-center justify-center">
            <div className="mb-5">
            <h1 className='text-5xl justify-center text-center text-sky-800'>Bienvenido {agenteLocal.nombre}</h1>
            </div>
  <div className="flex-row overflow-x-auto">
    <table className="min-w-screen bg-white shadow-md rounded-xl">
      <thead>
        <tr className="bg-blue-gray-100 text-gray-700">
          <th className="py-3 px-4 text-left">Cliente</th>
          <th className="py-3 px-4 text-left">Email</th>
          <th className="py-3 px-4 text-left">Telefono</th>
          <th className="py-3 px-4 text-left">Fecha</th>
          <th className="py-3 px-4 text-left">departamento_id</th>
          <th className="py-3 px-4 text-left"> </th>
        </tr>
      </thead>
      <tbody className="text-blue-gray-900">
      {reservas.map(reserva => (
        <tr key={reserva.id} className="border-b border-blue-gray-200">
          <td className="py-3 px-4">{reserva.nombre_cliente}</td>
          <td className="py-3 px-4">{reserva.email_cliente}</td>
          <td className="py-3 px-4">{reserva.telefono_cliente}</td>
          <td className="py-3 px-4">{reserva.fecha}</td>
          <td className="py-3 px-4">{reserva.departamento_id}</td>
          <td className="py-3 px-4">
            <button onClick={() => eliminar(reserva.id)} className="font-medium text-blue-600 hover:text-blue-800">Eliminar</button>
          </td>
        </tr>
          ))}
      </tbody>
    </table>
    <div className="w-full pt-5 px-4 mb-8 mx-auto ">
      <div className="text-sm text-gray-700 py-1 text-center">
      </div>
    </div>
  </div>
</div>
    </section>
  );
}

export default ReservaUsuario;
