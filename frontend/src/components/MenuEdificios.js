import React, { useState, useEffect } from "react";
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri'
import { Menu } from '@headlessui/react';
import axios from "axios";

function MenuEdificios({ onValueChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [comunas, setComunas] = useState([]);
  const [selectedComuna, setSelectedComuna] = useState(null);
  const comunaTextDefault = "Elija una comuna";

  useEffect(() => {
    setSelectedComuna(comunaTextDefault);
    onValueChange(selectedComuna);
  }, [])

  useEffect(() => {
    axios.get("http://localhost:8800/comunas")  // Ajusta la ruta según tu backend
      .then(res => {
        console.log(res);
        // Agregar "Elija una comuna" como opción adicional
        setComunas([comunaTextDefault, ...res.data]);
        
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    onValueChange(selectedComuna);
  }, [selectedComuna]);

  const handleComunaSelect = (comuna) => {
    console.log("handleComunaSelect", comuna);
    if (comuna === comunaTextDefault) {
      setSelectedComuna(comuna);
    } else {
      setSelectedComuna(comuna.nombre === comunaTextDefault ? comunaTextDefault : comuna.nombre);
    }
    setIsOpen(false); // Cerrar el menú después de seleccionar una comuna
  };



  return (
    <Menu as='div' className='dropDown relative'>
      <Menu.Button onClick={() => setIsOpen(!isOpen)} className='dropdown-btn w-[180px] h-[70px] mb-9 text-left justify-center items-center font-bold'>
        <div>
          <div className="text-[15px] font-medium leading-tight"></div>
          <div className="text-[16px] justify-between">{selectedComuna}</div>
        </div>
        {isOpen ? (
          <RiArrowUpSLine className="dropdown-icon-secondary" />
        ) : (
          <RiArrowDownSLine className="dropdown-icon-secondary" />
        )}
      </Menu.Button>

      <Menu.Items className="dropdown flex flex-col p-3 justify-center w-[180px] h-[70px]">
      <Menu.Item key={-1} className="cursor-pointer hover:text-sky-500 transition h-10" as="li">
            <div onClick={() => handleComunaSelect(comunaTextDefault)}>
              {comunaTextDefault}
            </div>
          </Menu.Item>
        {comunas.map((comuna, index) => (
          <Menu.Item key={index} className="cursor-pointer hover:text-sky-500 transition h-10" as="li">
            <div onClick={() => handleComunaSelect(comuna)}>
              {comuna.nombre}
            </div>
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );
}

export default MenuEdificios;
