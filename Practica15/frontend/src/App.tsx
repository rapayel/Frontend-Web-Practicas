import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './componentes/Layout';
import { NoEncontrado } from './componentes/NoEncontrado';
import { PaginaClases } from './paginas/PaginaClases';
import { PaginaDetalleClase } from './paginas/PaginaDetalleClase';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta principal con Layout compartido (Header y Footer) */}
        <Route path="/" element={<Layout />}>
          {/* La raíz redirige automáticamente a /clases */}
          <Route index element={<Navigate to="/clases" replace />} />
          
          {/* Catálogo de clases */}
          <Route path="clases" element={<PaginaClases />} />
          <Route path="clases/:id" element={<PaginaDetalleClase />} />

          {/* Ruta 404 para URLs no encontradas */}
          <Route path="*" element={<NoEncontrado />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;