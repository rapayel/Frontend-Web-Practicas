import express from 'express';
import path from 'node:path';
import { InMemoryPrestamoRepository } from '../infra/in-memory-prestamo.repository.js';
import { PrestamoService } from '../servicios/prestamo.service.js';
import { aResponseDto } from '../contratos/prestamo.dto.js';
import { validarCrearPrestamo, manejarErrores } from './validar.js';

const app = express();
const repository = new InMemoryPrestamoRepository();
const service = new PrestamoService(repository);

app.use(express.json());
app.use(express.static(path.join(process.cwd(), 'publico')));
app.get('/api/prestamos', async (req, res, next) => {
  try {
    const libroId = req.query.libroId as string | undefined;

    if (!libroId || libroId.trim() === '') {
      res.status(400).json({ error: 'El parámetro query "libroId" es obligatorio.' });
      return;
    }

    const prestamos = await service.listarPorLibro(libroId);
    const dtos = prestamos.map(aResponseDto);
    res.status(200).json(dtos);
  } catch (error) {
    next(error);
  }
});

app.post('/api/prestamos', validarCrearPrestamo, async (req, res, next) => {
  try {
    const prestamoCreado = await service.crear(req.body);
    const dto = aResponseDto(prestamoCreado);

    res.setHeader('Location', `/api/prestamos/${dto.folio}`);
    res.status(201).json(dto);
  } catch (error) {
    next(error);
  }
});

app.use(manejarErrores);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});