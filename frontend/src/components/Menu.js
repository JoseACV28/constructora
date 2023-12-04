import React from 'react';
import { RiSearch2Line } from 'react-icons/ri';
import MenuEdificios from './MenuEdificios';

function Menu() {
  return (
    <div className='px-[30px] py-6 max-auto flex flex-col lg:flex-row justify-center gap-6 relative lg:-top-4 lg:shadow-1 bg-white lg:bg-transparent lg:backdrop-blur'>
      <MenuEdificios />
      <button className='bg-sky-500 transition w-[162px] h-[64px] rounded-lg flex justify-center items-center text-white text-lg'>
        <RiSearch2Line />
      </button>
    </div>
  );
}

export default Menu;
