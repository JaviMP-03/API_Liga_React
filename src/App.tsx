import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/navbar";
import ListaJugadores from "./components/ListaJugadores";
import ListaEquipos from "./components/ListaEquipos";
import FormularioJugador from "./components/FormularioJugador";
import FormularioEquipo from "./components/FormularioEquipos";

/**
 *   LINKEDIN: https://www.linkedin.com/in/javier-mart%C3%ADnez-p%C3%A9rez-7843451a4/
 *
 *   GITHUB: https://github.com/JaviMP-03
 */

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/jugadores" />} />
        <Route path="/jugadores" element={<ListaJugadores />} />
        <Route path="/equipos" element={<ListaEquipos />} />
        <Route path="/jugadores/nuevo" element={<FormularioJugador />} />
        <Route path="/jugadores/editar/:id" element={<FormularioJugador />} />
        <Route path="/equipos/nuevo" element={<FormularioEquipo />} />
        <Route path="/equipos/editar/:id" element={<FormularioEquipo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
