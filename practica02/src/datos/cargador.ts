import fs from "node:fs";
import path from "node:path";
import { Libro } from "../dominio/tipos.js";

type CatalogoJSON = {
  biblioteca?: string;
  libros?: unknown[];
};

export type ResultadoCarga = {
  librosValidos: Libro[];
  descartados: number;
};

export function esLibroValido(valor: unknown): valor is Libro {
  if (typeof valor !== "object" || valor === null) {
    return false;
  }

  
  const obj = valor as Record<string, unknown>;
  const tieneIdValido = typeof obj.id === "string" && obj.id.trim() !== "";
  const tieneTituloValido = typeof obj.titulo === "string" && obj.titulo.trim() !== "";
  const tieneAutorValido = typeof obj.autor === "string" && obj.autor.trim() !== "";
  const tieneEjemplaresValidos = typeof obj.ejemplares === "number" && obj.ejemplares >= 0;
  const tieneAnioValido = obj.anio === undefined || typeof obj.anio === "number";

  return (
    tieneIdValido &&
    tieneTituloValido &&
    tieneAutorValido &&
    tieneEjemplaresValidos &&
    tieneAnioValido
  );
}

export function cargarCatalogo(rutaRelativa: string): ResultadoCarga {
  const rutaAbsoluta = path.resolve(rutaRelativa);
  const contenido = fs.readFileSync(rutaAbsoluta, "utf-8");
  const datosBrutos: unknown = JSON.parse(contenido);

  if (typeof datosBrutos !== "object" || datosBrutos === null) {
    return { librosValidos: [], descartados: 0 };
  }

  const catalogo = datosBrutos as CatalogoJSON;
  const listaLibrosBruta = Array.isArray(catalogo.libros) ? catalogo.libros : [];

  const librosValidos: Libro[] = [];
  let descartados = 0;

  for (const item of listaLibrosBruta) {
    if (esLibroValido(item)) {
      librosValidos.push(item);
    } else {
      descartados++;
    }
  }

  return { librosValidos, descartados };
}