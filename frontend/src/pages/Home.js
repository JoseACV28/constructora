import React from "react";

//components
import Banner from '../components/Banner';

import ListaEdificios from "../components/ListaEdificios";


const Home = () => {
  return (
    <div className="min-h-screen">
      <Banner />
      <ListaEdificios/>
    </div>
  );
}

export default Home;
