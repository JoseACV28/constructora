import React, { useState } from 'react';
import axios from 'axios';

function ReservaUsuario() {
  const [imagen, setImagen] = useState(null);
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [comuna, setComuna] = useState('');
  const [cantidadPisos, setCantidadPisos] = useState('');
  const [cantidadDeptos, setCantidadDeptos] = useState('');
  const [metrosCuadrados, setMetrosCuadrados] = useState('');
  const [habitaciones, setHabitaciones] = useState('');
  const [banos, setBanos] = useState('');
  const [precio, setPrecio] = useState('');
  const [precioUF, setPrecioUF] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagenDepto, setImagenDepto] = useState([]);
  const [formularioActual, setFormularioActual] = useState(1);

  const handleImagenChange = (e) => {
    setImagen(e.target.files[0]);
  };

  const handleImagenesChange = (e) => {
    setImagenDepto([...e.target.files]);
  };

  const handleSiguiente = () => {
    setFormularioActual(formularioActual + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    if (formularioActual === 1) {
      formData.append('imagen', imagen);
      formData.append('nombre_proyecto', nombre);
      formData.append('direccion', direccion);
      formData.append('comuna', comuna);
    } else if (formularioActual === 2) {
      formData.append('piso', cantidadPisos);
      formData.append('cantidad_deptos', cantidadDeptos);
      formData.append('metraje', metrosCuadrados);
      formData.append('habitaciones', habitaciones);
      formData.append('banos', banos);
      formData.append('precio', precio);
      formData.append('precio_uf', precioUF);
      formData.append('descripcion', descripcion);

      for (const img of imagenDepto) {
        formData.append('imagen_depto', img);
      }
    }

    try {
      // Obtener el token de autenticación (puedes manejar la autenticación de acuerdo a tu lógica)
      const token = localStorage.getItem('token');

      // Enviar los datos del edificio y del usuario al servidor
      await axios.post('/edificios', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Edificio registrado correctamente!');
      // Puedes redirigir al usuario a otra página o realizar otras acciones después de guardar en la base de datos.

      // Cambiar al siguiente formulario
      handleSiguiente();
    } catch (error) {
        console.error('Error detallado:', error.response);
      console.error('Error al registrar el edificio:', error);
    }
  };

  return (
    <section>
      <div>
        <div className='flex justify-between'>
          <div className="bg-white hover:shadow-2xl transition rounded-lg p-10 shadow-md w-96 ml-4">
            <h2 className="text-2xl font-semibold mb-4 text-center text-sky-600">
              {formularioActual === 1 ? 'Ingrese los datos del edificio' : 'Ingrese más detalles del edificio'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <div className='border rounded p-4'>
                  {formularioActual === 1 && (
                    <>
                      <div>
                        <label className="flex text-sky-500 text-sm font-bold mb-2" htmlFor="nombre_proyecto">Nombre del Proyecto Inmobiliario</label>
                        <input
                          className="border border-slate-300 focus:border-sky-600 outline-none rounded w-full px-4 h-10 text-sm mb-4"
                          name="nombre_proyecto"
                          value={nombre}
                          onChange={(e) => setNombre(e.target.value)}
                          placeholder=""
                        />
                      </div>
                      <div>
                        <label className="flex text-sky-500 text-sm font-bold mb-2" htmlFor="direccion">Direccion del Proyecto</label>
                        <input
                          className="border border-slate-300 focus:border-sky-600 outline-none rounded w-full px-4 h-10 text-sm mb-4"
                          name="direccion"
                          value={direccion}
                          onChange={(e) => setDireccion(e.target.value)}
                          placeholder=""
                        />
                      </div>
                      <div>
                        <label className="flex text-sky-500 text-sm font-bold mb-2" htmlFor="comuna">Comuna del Proyecto</label>
                        <input
                          className="border border-slate-300 focus:border-sky-600 outline-none rounded w-full px-4 h-10 text-sm mb-4"
                          name="comuna"
                          value={comuna}
                          onChange={(e) => setComuna(e.target.value)}
                          placeholder=""
                        />
                      </div>
                      <div>
                        <label className="flex text-sky-500 text-sm font-bold mb-2" htmlFor="imagen">Imagen del Proyecto Inmobiliario</label>
                        <input type="file" accept="image/*" onChange={handleImagenChange} className="m-4 pr-1 text-sm" />
                      </div>
                    </>
                  )}
                  {formularioActual === 2 && (
                    <>
                       <div>
                        <label className="flex text-sky-500 text-sm font-bold mb-2" htmlFor="cantidad_piso">Cantidad de Pisos</label>
                        <input
                          className="border border-slate-300 focus:border-sky-600 outline-none rounded w-full px-4 h-10 text-sm mb-4"
                          name="cantidad_pisos"
                          value={cantidadPisos}
                          onChange={(e) => setCantidadPisos(e.target.value)}
                          placeholder=""
                        />
                      </div>
                      <div>
                        <label className="flex text-sky-500 text-sm font-bold mb-2" htmlFor="cantidad_deptos">Cantidad de Departamentos</label>
                        <input
                          className="border border-slate-300 focus:border-sky-600 outline-none rounded w-full px-4 h-10 text-sm mb-4"
                          name="cantidad_deptos"
                          value={cantidadDeptos}
                          onChange={(e) => setCantidadDeptos(e.target.value)}
                          placeholder=""
                        />
                      </div>
                      <div>
                        <label className="flex text-sky-500 text-sm font-bold mb-2" htmlFor="metros_cuadrados">Metros cuadrados</label>
                        <input
                          className="border border-slate-300 focus:border-sky-600 outline-none rounded w-full px-4 h-10 text-sm mb-4"
                          name="metros_cuadrados"
                          value={metrosCuadrados}
                          onChange={(e) => setMetrosCuadrados(e.target.value)}
                          placeholder=""
                        />
                      </div>
                      <div>
                        <label className="flex text-sky-500 text-sm font-bold mb-2" htmlFor="habitaciones">Cantidad de Habitaciones</label>
                        <input
                          className="border border-slate-300 focus:border-sky-600 outline-none rounded w-full px-4 h-10 text-sm mb-4"
                          name="habitaciones"
                          value={habitaciones}
                          onChange={(e) => setHabitaciones(e.target.value)}
                          placeholder=""
                        />
                      </div>
                      <div>
                        <label className="flex text-sky-500 text-sm font-bold mb-2" htmlFor="banos">Cantidad de Baños</label>
                        <input
                          className="border border-slate-300 focus:border-sky-600 outline-none rounded w-full px-4 h-10 text-sm mb-4"
                          name="banos"
                          value={banos}
                          onChange={(e) => setBanos(e.target.value)}
                          placeholder=""
                        />
                      </div>
                      <div>
                        <label className="flex text-sky-500 text-sm font-bold mb-2" htmlFor="precio">Precio en CLP</label>
                        <input
                          className="border border-slate-300 focus:border-sky-600 outline-none rounded w-full px-4 h-10 text-sm mb-4"
                          name="precio"
                          value={precio}
                          onChange={(e) => setPrecio(e.target.value)}
                          placeholder=""
                        />
                      </div>
                      <div>
                        <label className="flex text-sky-500 text-sm font-bold mb-2" htmlFor="precio_uf">Precio en UF</label>
                        <input
                          className="border border-slate-300 focus:border-sky-600 outline-none rounded w-full px-4 h-10 text-sm mb-4"
                          name="precio_uf"
                          value={precioUF}
                          onChange={(e) => setPrecioUF(e.target.value)}
                          placeholder=""
                        />
                      </div>
                      <div>
                        <label className="flex text-sky-500 text-sm font-bold mb-2" htmlFor="descrpcion">Descripcion del Departamento</label>
                        <input
                          className="border border-slate-300 focus:border-sky-600 outline-none rounded w-full px-4 h-10 text-sm mb-4"
                          name="descripcion"
                          value={descripcion}
                          onChange={(e) => setDescripcion(e.target.value)}
                          placeholder=""
                        />
                      </div>
                      <div>
                        <label className="flex text-sky-500 text-sm font-bold mb-2" htmlFor="img">Imagenes del Departamento</label>
                        <input type="file" accept="image/*" onChange={handleImagenesChange} className="m-4 pr-1 text-sm" />
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-sky-500 hover:bg-sky-700 text-white rounded p-4 text-sm w-full transition"
                  type="submit"
                >
                  Finalizar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ReservaUsuario;
