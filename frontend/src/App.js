import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Login from "./pages/Login";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Register from "./pages/Register";
import Home from "./pages/Home";
import DetalleEdificios from "./pages/DetalleEdificios";
import Reservas from "./pages/Reservas";

import IngresarEdificio from "./pages/IngresarEdificio";
import LoginAgentes from "./pages/LoginAgentes";

function App() {
  
  let localLog = parseInt(localStorage.getItem('log')) > 0 ? true : false;

  const [isLoggedIn, setIsLoggedIn] = useState(localLog);



  return (
    <BrowserRouter>
      <div className="max-w-[1440px] min-h-screen mx-auto bg-white">
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/departamento/:id" element={<DetalleEdificios />} />
          <Route path="/reservarDepto/:depto" element={<Reservas />} />
          <Route path="/ingresarEdificio" element={<IngresarEdificio />} />
          <Route path="/loginAgentes" element={<LoginAgentes />} />
          
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
