import React from 'react';

//image
import Image from '../assets/img/house-banner.png';
import Menu from './Menu';

const Banner = () => {
    return <section className='h-full max-h-[640px] mb-8 xl:mb-24'>
        <div className='flex flex-col lg:flex-row'>
            <div className='lg:ml-8 xl:ml-[135px] flex flex-col items-center lg:items-start text-center lg:text-left justify-center flex-1 px-4 lg:px-0'>
                <h1 className='text-4x1 lg:text-[58px] font-semibold leading-none mb-6'>
                    <span className='text-sky-600 text-5xl'>Compra o Arrienda</span> <span className='text-5xl'>La Casa De Tus Sueños Con Nosotros.</span>
                </h1>
                <p className='max-w-[480px] mb-8'>
                "En <span className='text-sky-600'>Bosch & Bosch</span>, hacemos tus sueños realidad. Con un servicio excepcional y las mejores opciones de arriendo y compra, 
                te ofrecemos la llave a la casa de tus sueños. Descubre por qué somos la elección número uno para aquellos 
                que buscan calidad, comodidad y confiabilidad en cada paso del camino. ¡Bienvenido a tu nuevo hogar!"
                </p>
            </div>
            { /* image */}
            <div className='hidden flex-1 lg:flex justify-end'>
                <img src={Image} alt='' />
            </div>
        </div>
        <Menu />
    </section>;
}

export default Banner;
