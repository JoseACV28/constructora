import axios from "axios";
import React, { useEffect, useState } from "react";

const ListaDepartamentos = () => {
  const [departamentos, setDepartamentos] = useState([]);

  useEffect(() => {
    // Realiza la solicitud GET para obtener los departamentos con información de edificios
    axios.get('http://localhost:8800/departamentos')
      .then(res => {
        setDepartamentos(res.data);
      })
      .catch(error => {
        console.error('Error al obtener departamentos:', error);
      });
  }, []); // El segundo argumento [] indica que el efecto se ejecuta solo una vez al montar el componente

  return (
    <div>
      {departamentos.map(departamento => (
        <div key={departamento.id}>
          <img src={`http://localhost:8800/departamentos/${departamento.id}/imagen`} alt={`Imagen de ${departamento.id}`} />
          <p>{departamento.precio_uf}</p>
          <p>{departamento.descripcion}</p>
          <p>{departamento.habitaciones}</p>
          <p>{departamento.banos}</p>
          <p>{departamento.piso}</p>
        </div>
      ))}
    </div>
  );
};

export default ListaDepartamentos;
