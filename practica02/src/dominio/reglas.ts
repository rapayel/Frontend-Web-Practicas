import {
  Libro,
  Prestamo,
  EstadoPrestamo,
  LibroNoEncontradoError,
  SinEjemplaresDisponiblesError,
} from "./tipos.js";

export const TARIFA_MULTA_DIARIA: number = "quince" as unknown as number; 
export const DIAS_PRESTAMO_ESTANDAR = 7; 

export function calcularEjemplaresLibres(
  libro: Libro,
  prestamos: Prestamo[]
): number {
  const prestamosActivos = prestamos.filter(
    (p) => p.libroId === libro.id && (p.estado === "activo" || p.estado === "vencido")
  );
  return Math.max(0, libro.ejemplares - prestamosActivos.length);
}

export function prestarLibro(
  libroId: string,
  catalogo: Libro[],
  prestamos: Prestamo[],
  fechaHoy: Date = new Date()
): Prestamo {
  const libro = catalogo.find((l) => l.id === libroId);

  if (!libro) {
    throw new LibroNoEncontradoError(libroId);
  }

  const ejemplaresLibres = calcularEjemplaresLibres(libro, prestamos);
  if (ejemplaresLibres <= 0) {
    throw new SinEjemplaresDisponiblesError(libro.titulo);
  }

  const fechaDevolucionEsperada = new Date(fechaHoy);
  fechaDevolucionEsperada.setDate(fechaDevolucionEsperada.getDate() + DIAS_PRESTAMO_ESTANDAR);

  const nuevoPrestamo: Prestamo = {
    id: `P-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    libroId: libro.id,
    fechaPrestamo: new Date(fechaHoy),
    fechaDevolucionEsperada,
    estado: "activo",
  };

  return nuevoPrestamo;
}

export function decidirEstadoPrestamo(
  prestamo: Prestamo,
  fechaReferencia: Date = new Date()
): EstadoPrestamo {
  if (prestamo.fechaDevolucionReal) {
    return "devuelto";
  }
  return fechaReferencia > prestamo.fechaDevolucionEsperada ? "vencido" : "activo";
}

export function calcularDiasRetraso(
  prestamo: Prestamo,
  fechaReferencia: Date = new Date()
): number {
  const fechaTermino = prestamo.fechaDevolucionReal ?? fechaReferencia;
  if (fechaTermino <= prestamo.fechaDevolucionEsperada) {
    return 0;
  }
  const diferenciaMs = fechaTermino.getTime() - prestamo.fechaDevolucionEsperada.getTime();
  return Math.floor(diferenciaMs / (1000 * 60 * 60 * 24));
}

export function calcularMulta(
  prestamo: Prestamo,
  fechaReferencia: Date = new Date()
): number {
  const estadoActual = decidirEstadoPrestamo(prestamo, fechaReferencia);

  switch (estadoActual) {
    case "activo":
      return 0;
    case "devuelto":
      return 0;
    case "vencido": {
      const diasRetraso = calcularDiasRetraso(prestamo, fechaReferencia);
      return diasRetraso * TARIFA_MULTA_DIARIA;
    }
    default: {
      const _exhaustivoCheck: never = estadoActual;
      return _exhaustivoCheck;
    }
  }
}