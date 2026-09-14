import type { Request, Response, NextFunction } from 'express';
import { EjemplarPrestadoError } from '../errores/ejemplar-prestado.error.js';

export function validarCrearPrestamo(req: Request, res: Response, next: NextFunction): void {
  const { libroId, ejemplares, socioId } = req.body as Record<string, unknown>;
  const errores: string[] = [];

  if (!libroId || typeof libroId !== 'string' || libroId.trim() === '') {
    errores.push('El campo "libroId" es obligatorio y debe ser un texto.');
  }

  if (!Array.isArray(ejemplares) || ejemplares.length === 0) {
    errores.push('El campo "ejemplares" debe ser un arreglo con al menos un elemento.');
  } else if (!ejemplares.every(e => typeof e === 'number' && Number.isInteger(e))) {
    errores.push('Todos los elementos de "ejemplares" deben ser números enteros.');
  }

  if (!socioId || typeof socioId !== 'string' || socioId.trim() === '') {
    errores.push('El campo "socioId" es obligatorio y debe ser un texto.');
  }

  if (errores.length > 0) {
    res.status(400).json({ error: 'Error de validación', detalles: errores });
    return;
  }

  next();
}

export function manejarErrores(err: unknown, req: Request, res: Response, _next: NextFunction): void {
  if (err instanceof EjemplarPrestadoError) {
    res.status(409).json({ error: err.message });
    return;
  }

  res.status(500).json({ error: 'Error interno del servidor' });
}