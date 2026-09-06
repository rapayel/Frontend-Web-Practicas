export type Libro = {
  readonly id: string;
  titulo: string;
  autor: string;
  anio?: number;
  ejemplares: number;
};
export type EstadoPrestamo = "activo" | "devuelto" | "vencido";
export type Prestamo = {
  readonly id: string;
  libroId: string;
  fechaPrestamo: Date;
  fechaDevolucionEsperada: Date;
  fechaDevolucionReal?: Date;
  estado: EstadoPrestamo;
};
export class LibroNoEncontradoError extends Error {
  constructor(libroId: string) {
    super(`El libro con ID "${libroId}" no existe en el catálogo.`);
    this.name = "LibroNoEncontradoError";
  }
}
export class SinEjemplaresDisponiblesError extends Error {
  constructor(titulo: string) {
    super(`No quedan ejemplares disponibles del libro "${titulo}".`);
    this.name = "SinEjemplaresDisponiblesError";
  }
}
export class PrestamoNoEncontradoError extends Error {
  constructor(prestamoId: string) {
    super(`El préstamo con ID "${prestamoId}" no fue encontrado.`);
    this.name = "PrestamoNoEncontradoError";
  }
}
export class PrestamoYaDevueltoError extends Error {
  constructor(prestamoId: string) {
    super(`El préstamo con ID "${prestamoId}" ya ha sido devuelto anteriormente.`);
    this.name = "PrestamoYaDevueltoError";
  }
}