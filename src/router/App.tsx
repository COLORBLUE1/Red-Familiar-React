import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SplashScreen } from "../components/SplasScreen";
import { Home } from "../components/Home.tsx";
import { Ajustecuenta } from "../components/Home/Ajustescuenta.tsx";
import { Buscar } from "../components/Home/Buscar.tsx";
import { Singing } from "../components/singin.tsx";
import { Signun } from "../components/singun.tsx";
import { Map } from "../components/Map.tsx";
import { Perfil } from "../components/Extra/Perfil.tsx";
import { Perfil_all } from "../components/Blocks/Perfil_all.tsx";
import { Notificaciones } from "../components/Extra/Notificaciones/Notificaciones.tsx";
import { Ajustesmap } from "../components/Home/Ajustesmap.tsx";
import { Landing } from "../components/Landing/Landing.tsx";
import { Newpost } from "../components/Extra/Newpost.tsx";
import { Error } from "../components/Blocks/Error.tsx";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/*Rutas antes del Home*/}
        <Route path="/" element={<SplashScreen />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/map" element={<Map />} />
        <Route path="/signin" element={<Singing />} />
        <Route path="/signun" element={<Signun />} />

        {/*Ruta de error
        <Route path="*" element={<Error />} />*/}

        {/*Ruta al home*/}
        <Route path="/home" element={<Home />} />
      </Routes>

      {/* Rutas del home */}
      <Routes>
        <Route path="/buscar" element={<Buscar />} />
        <Route path="/notificaciones" element={<Notificaciones />} />
        <Route path="/newpost" element={<Newpost />} />
      </Routes>
      {/*Rutas extra*/}
      <Routes>
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/perfil/:id" element={<Perfil_all />} />
        <Route path="/ajustesmap" element={<Ajustesmap />} />
        <Route path="/ajustecuenta" element={<Ajustecuenta />} />
      </Routes>
    </BrowserRouter>
  );
}
