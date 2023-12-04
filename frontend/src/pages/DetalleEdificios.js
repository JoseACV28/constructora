import React, { useEffect, useState } from "react";
import { BiBed, BiBath, BiArea } from 'react-icons/bi';
import axios from 'axios';
import { Link, useParams } from "react-router-dom";

const DetalleDepartamentos = () => {
  const { id } = useParams();
  const [departamento, setDepartamento] = useState({});
  const [agentes, setAgentes] = useState([]);

  let localLog = parseInt(localStorage.getItem('log')) > 0 ? true : false;

  useEffect(() => {
    // Realiza la solicitud GET para obtener los detalles del departamento por ID
    axios.get(`http://localhost:8800/departamentos/${id}`)
      .then(res => {
        setDepartamento(res.data);
        console.log("Resultado departamento:", res.data);
      })
      .catch(error => {
        console.log("error", error.message)
        console.error('Error al obtener detalles del departamento:', error);
      });

    // Realiza la solicitud GET para obtener la información de los agentes
    axios.get('http://localhost:8800/agentes')
      .then(res => {
        setAgentes(res.data);
        console.log("Resultado agentes", res.data);
      })
      .catch(error => {
        console.error('Error al obtener agentes:', error);
      });
  }, [id]);

  function formatNumberWithCommas(number) {
    if (number === undefined || number === null) {
      return "0"; // o algún valor predeterminado según tus necesidades
    }
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  const agentesFiltrados = agentes.filter(agentes => agentes.id === departamento.agentes_id);

  return (
    <section>
      <div className="container mx-auto min-h-[800px] mb-14 p-8">
        <div>
        <h2 className="text-2xl font-semibold text-slate-500 mb-4">{departamento && departamento.nombre_edificio}</h2>
          <div className="flex items-center justify-between gap-x-4">
            <img className="mb-8 rounded-lg max-w-[768px]" src={`http://localhost:8800/departamentos/${departamento.id}/imagen`} alt={`Imagen de ${departamento.id}`} />
            <div className="bg-white mb-8 border border-slate-300 flex rounded-lg px-6 py-20 w-full items-center justify-center">
              <div className="flex gap-x-4 mb-8">
                {agentesFiltrados.map(agente => (
                  <div key={agente.id}>
                    <img className="flex w-40 h-40 p-1 border border-slate-300 rounded-full mb-2" src={`http://localhost:8800/agentes/${agente.id}/imagen`} alt={`Imagen de ${agente.id}`} />
                    <div className="font-bold text-sky-600 text-2xl mb-2">Agente: {agente.nombre}</div>
                    <div className="font-bold text-slate-600 text-2xl mb-2">Telefono: {agente.telefono}</div>
                    <div className="gap-x-2 py-4 items-center justify-between">
                      {localLog ? 
                        <Link to={`/reservarDepto/${encodeURIComponent(JSON.stringify(departamento))}`} className="bg-sky-700 hover:bg-sky-900 text-white px-6 py-3 items-center rounded-lg transition">Reservar</Link>
                        :
                        <Link to={`/Login`} className="bg-sky-700 hover:bg-sky-900 text-white px-6 py-3 items-center rounded-lg transition">Reservar</Link>
                      }
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <h3 className="mb-4 text-bold text-sky-900 text-2xl">{departamento.direccion_edificio}</h3>
          <div className="mb-4 lg:mb-0 flex gap-x-2 text-sm pb-4">
            <div className="bg-sky-500 text-white px-3 rounded-full">{departamento.comuna_id}</div>
          </div>
          <div className="text-3xl font-semibold text-sky-600">${formatNumberWithCommas(departamento.precio)} CLP</div>
          <div className="text-3xl font-semibold text-slate-500">${formatNumberWithCommas(departamento.precio_uf)} UF</div>
          <div className="flex flex-col items-start gap-8 lg:flex-row">
            <div className="mx-w-[768px]">
              <div className="flex gap-x-6 text-sky-500 mb-4">
                <div className="flex gap-x-2 justify-between">
                  <BiBed className="flex text-2xl" />
                  <div>{departamento.habitaciones} habitaciones </div>
                </div>
                <div className="flex gap-x-2 justify-between">
                  <BiBath className="flex text-2xl" />
                  <div>{departamento.banos} baños </div>
                </div>
                <div className="flex gap-x-2 justify-between">
                  <BiArea className=" flex text-2xl" />
                  <div>{departamento.metraje} m²</div>
                </div>
              </div>
              <div>
                <div className="w-4/6 p-4 bg-slate-300 rounded-lg justify-around">{departamento.descripcion}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetalleDepartamentos;
