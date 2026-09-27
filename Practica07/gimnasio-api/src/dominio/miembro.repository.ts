import { Miembro } from './entidades';

export interface MiembroRepository {
  listar(): Miembro[];
  buscarPorId(id: number): Miembro | undefined;
  crear(datos: Omit<Miembro, 'id'>): Miembro;
  actualizar(id: number, datos: Partial<Omit<Miembro, 'id'>>): Miembro | undefined;
  eliminar(id: number): boolean;
}