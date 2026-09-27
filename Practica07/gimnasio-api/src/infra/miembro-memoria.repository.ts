import { Miembro } from '../dominio/entidades';
import { MiembroRepository } from '../dominio/miembro.repository';

export class MiembroMemoriaRepository implements MiembroRepository {
  private miembros: Miembro[] = [
    { id: 1, nombre: 'Juan Pérez', correo: 'juan@gmail.com', membresia: 'VIP', activo: true },
    { id: 2, nombre: 'Ana Gómez', correo: 'ana@gmail.com', membresia: 'Básica', activo: true },
    { id: 3, nombre: 'Carlos López', correo: 'carlos@gmail.com', membresia: 'Premium', activo: false },
  ];

  private siguienteId = 4;

  listar(): Miembro[] {
    return this.miembros;
  }

  buscarPorId(id: number): Miembro | undefined {
    return this.miembros.find((m) => m.id === id);
  }

  crear(datos: Omit<Miembro, 'id'>): Miembro {
    const nuevo: Miembro = {
      id: this.siguienteId++,
      ...datos,
    };
    this.miembros.push(nuevo);
    return nuevo;
  }

  actualizar(id: number, datos: Partial<Omit<Miembro, 'id'>>): Miembro | undefined {
    const index = this.miembros.findIndex((m) => m.id === id);
    if (index === -1) return undefined;

    this.miembros[index] = {
      ...this.miembros[index],
      ...datos,
    };
    return this.miembros[index];
  }

  eliminar(id: number): boolean {
    const index = this.miembros.findIndex((m) => m.id === id);
    if (index === -1) return false;

    this.miembros.splice(index, 1);
    return true;
  }
}