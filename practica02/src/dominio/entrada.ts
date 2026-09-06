import readlineSync from "readline-sync";

export function preguntar(mensaje: string): string | undefined {
  try {
    const respuesta = readlineSync.question(mensaje);
    if (respuesta.trim() === "") {
      return undefined;
    }
    return respuesta.trim();
  } catch {
    console.log("\nOperación cancelada por el usuario.");
    return undefined;
  }
}

export function preguntarOpcion(mensaje: string): string | undefined {
  return preguntar(mensaje);
}