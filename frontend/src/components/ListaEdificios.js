import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BiBarChartSquare , BiMap, BiBuilding, BiLoaderCircle } from 'react-icons/bi';
import { RiSearch2Line } from 'react-icons/ri';
import MenuEdificios from './MenuEdificios';


const ListaEdificios = () => {
  console.log("ListaEdificios 0");
  const [departamentos, setDepartamentos] = useState([]);
  const [edificios, setEdificios] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true)

  console.log("ListaEdificios 1");

  useEffect( () => {

    console.log("ListaEdificios 2");

    axios.get('http://localhost:8800/departamentos')
    .then(res => {
      setDepartamentos(res.data);
      console.log("resultado departamentos", res)
    })
    .catch(error => {
      console.log('Error al obtener departamentos:', error);
    });

    console.log("ListaEdificios 3");
  }, []);
  console.log("ListaEdificios 3.1");

  useEffect(() => {

    const fetchTodos = async () => {
      try {
        const response = await axios.get('http://localhost:8800/edificios');
        setEdificios(response.data);
        setLoading(false);
        console.log("resultado edificios", response.data);
      } catch (error) {
        setLoading(false);
        console.error('Error al obtener edificios:', error);
      }
    }
    fetchTodos();
  },[]);

  console.log("ListaEdificios 5");
  return (
    <section>
       <div className='px-[30px] py-6 max-auto flex flex-col lg:flex-row justify-center gap-6 relative lg:-top-4 lg:shadow-1 bg-white lg:bg-transparent lg:backdrop-blur'>
      <MenuEdificios />
      <button className='bg-sky-500 transition w-[162px] h-[64px] rounded-lg flex justify-center items-center text-white text-lg'>
        <RiSearch2Line />
      </button>
    </div>
       {loading ? 
        <div className="flex items-center justify-center text-3xl text-slate-600"><p>Cargando datos...</p><BiLoaderCircle /></div>
       : 
       <>
      <div>
        <div  className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-14 mb-4">
          {
            (edificios.length !== 0) ? 
            
            departamentos.map(departamento => (
              <div className="bg-white shadow-1 p-5 rounded-lg w-full mx-auto max-w-[360px] cursor-pointer hover:shadow-2xl transition" key={departamento.id}>
                    <div onClick={() => navigate(`/departamento/${departamento.id}`)}>
                      <img className="mb-8 rounded-lg max-h-[350px] rounded-tl-[40px] rounded-br-[40px]" src={`http://localhost:8800/edificios/${departamento.edificio_id}/imagen`} alt={`Imagen de ${departamento.edificio_id}`} />
                    </div>
                    <div>
                        <div className="mb-4 justify-between gap-x-2 text-sm" key={departamento.edificio_id}>
                          <div className="bg-sky-500 text-center w-[90px] rounded-full text-white px-3">
                            {edificios.filter(_edificio => _edificio.id === departamento.edificio_id)[0].comuna }
                          </div>
                          <div className="text-lg flex text-slate-600 font-semibold max-w-[260px] mb-2 mt-2">
                          <BiBarChartSquare  className=" flex text-2xl mr-2" />
                            {edificios.filter(_edificio => _edificio.id === departamento.edificio_id)[0].nombre_proyecto}
                          </div>
                          <div className="text-lg text-sky-600 flex font-medium max-w-[260px] mb-2">
                          <BiMap className=" flex text-2xl mr-2" />
                            {edificios.filter(_edificio => _edificio.id === departamento.edificio_id)[0].direccion } 
                            </div>
                          <div className="text-lg text-sky-600 flex font-medium max-w-[260px]">
                          <BiBuilding className=" flex text-2xl mr-2" />
                            {edificios.filter(_edificio => _edificio.id === departamento.edificio_id)[0].cantidad_deptos }
                            </div> 
                        </div>
                    </div>
              </div>
            )) : null
        }
        </div>
      </div>
      </>
      }
    </section>
  );
};

export default ListaEdificios;
