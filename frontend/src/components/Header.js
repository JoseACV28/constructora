import React from 'react';

// link
import {Link} from 'react-router-dom';

// logo
import Logo from '../assets/img/logo3.png';


const Header = ({ isLoggedIn, setIsLoggedIn }) => {

  let localLog = parseInt(localStorage.getItem('log')) > 0 ? true : false;

  const handleLogout = (e) => {
    e.preventDefault();
    setIsLoggedIn(false);
      localStorage.setItem('log', "0");
  }

    return (
        <header className="py-6 mb-12 border-b justify-between p-8">
          <div className='container mx-auto flex justify-between items-center'>
            {/* Logo */}
            <Link to="/">
              <img src={Logo} alt='' />
            </Link>
            {/* Botones */}
            <div className='flex items-center gap-6'>
              {localLog ? (
                // Si el usuario ha iniciado sesión, muestra el botón de Cerrar Sesión
                <>
                <Link className='bg-sky-500 hover:bg-sky-600 text-white px-4 py-3 rounded-lg transition' onClick={handleLogout} to='/'>Cerrar Sesión</Link>
                <Link className='bg-sky-500 hover:bg-sky-600 text-white px-4 py-3 rounded-lg transition' to='/LoginAgentes'>Mis Reservas</Link>
                </>
                
              ) : (
                // Si el usuario no ha iniciado sesión, muestra los botones de Iniciar Sesión y Registrarse
                <>
                  <Link className='hover:text-sky-400 transition' to='/Login'>Iniciar Sesión</Link>
                  <Link className='bg-sky-500 hover:bg-sky-600 text-white px-4 py-3 rounded-lg transition' to='/Register'>Registrarse</Link>
                </>
              )}
            </div>
          </div>
        </header>
      );
    };

export default Header;