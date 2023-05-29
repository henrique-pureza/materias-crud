import   ReactDOM                       from "react-dom/client";
import   Home                           from "./Home.tsx";
import   NewMateria                     from "./components/NewMateria/NewMateria.tsx";
import   HomeClass                      from "./HomeClass.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "bootstrap/scss/bootstrap.scss";
import "./App.sass";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <BrowserRouter>
        <Routes>
            <Route path="/materias-crud" element={<Home />} />
            <Route path="/materias-crud/new" element={<NewMateria />} />
        </Routes>
        <Routes>
            <Route path="/materias-crud/materia-desc" element={<Home materiaOrderDesc />} />
            <Route path="/materias-crud/tipo-desc" element={<Home tipoOrderDesc />} />
            <Route path="/materias-crud/tipo-asc" element={<Home tipoOrderAsc />} />
            <Route path="/materias-crud/materia-asc" element={<Home materiaOrderAsc />} />
        </Routes>
        <Routes>
            <Route path="/materias-crud/class" element={<HomeClass />} />
        </Routes>
    </BrowserRouter>
);
