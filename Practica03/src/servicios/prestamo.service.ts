// =====================================================================
//  CHECKPOINT 4  —  el Service: aqui y SOLO aqui viven las reglas
// =====================================================================
//  Regla de negocio de esta practica:
//    "no se puede prestar un ejemplar que ya esta prestado"
//
//  TODO 4:
//    1. Recibir el repositorio POR CONSTRUCTOR, tipado con la
//       INTERFAZ `PrestamoRepository`, nunca con la clase concreta.
//    2. Metodo `crear(dto: CrearPrestamoDto): Promise<Prestamo>`:
//         a. pedir al repositorio los prestamos de ese libro
//         b. juntar los ejemplares que ya estan fuera
//            (pista: `.filter(...)` por estado + `.flatMap(...)`)
//         c. si alguno de los solicitados choca, lanzar
//            `new EjemplarPrestadoError(numero)`
//         d. si no, guardar el prestamo nuevo y devolverlo
//    3. Metodo `listarPorLibro(libroId)` que solo delega al repositorio.
//
//  LA PRUEBA DE FUEGO de este archivo:
//    ¿aparece la palabra `InMemory` en algun import? Si aparece, el
//    Service quedo acoplado a la infraestructura y el patron se rompio.
// =====================================================================

import type { PrestamoRepository } from '../dominio/prestamo.repository.js';
import type { Prestamo } from '../dominio/prestamo.entity.js';
import { nuevoFolio } from '../dominio/prestamo.entity.js';
import type { CrearPrestamoDto } from '../dto/crear-prestamo.dto.js';
import { EjemplarPrestadoError } from '../errores/ejemplar-prestado.error.js';

export class PrestamoService {
  constructor(private readonly repository: PrestamoRepository) {}

  async crear(dto: CrearPrestamoDto): Promise<Prestamo> {
    const prestamosExistentes = await this.repository.findByLibro(dto.libroId);
    const ejemplaresPrestados = prestamosExistentes
      .filter(p => p.estado === 'activo')
      .flatMap(p => p.ejemplares);

    for (const ejemplar of dto.ejemplares) {
      if (ejemplaresPrestados.includes(ejemplar)) {
        throw new EjemplarPrestadoError(ejemplar);
      }
    }

    const nuevoPrestamo: Prestamo = {
      ...dto,
      folio: nuevoFolio(),
      estado: 'activo',
      creadoEn: new Date(),
      costoReposicion: 500 
    };

    return await this.repository.save(nuevoPrestamo);
  }

  async listarPorLibro(libroId: string): Promise<Prestamo[]> {
    return await this.repository.findByLibro(libroId);
  }
}