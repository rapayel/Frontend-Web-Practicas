import { cargarCatalogo } from "./datos/cargador.js";
import {
  prestarLibro,
  decidirEstadoPrestamo,
  calcularMulta,
  calcularEjemplaresLibres,
} from "./dominio/reglas.js";
import { preguntarOpcion, preguntar } from "./dominio/entrada.js";
import { Libro, Prestamo } from "./dominio/tipos.js";

const OPCION_MOSTRAR = "1";
const OPCION_PRESTAR = "2";
const OPCION_MULTA = "3";
const OPCION_SALIR = "4";

type OpcionMenu =
  | typeof OPCION_MOSTRAR
  | typeof OPCION_PRESTAR
  | typeof OPCION_MULTA
  | typeof OPCION_SALIR;

const { librosValidos: catalogo, descartados } = cargarCatalogo("./src/datos/catalogo.json");
const prestamos: Prestamo[] = [];

function ejecutarMenu(): void {
  console.log("=== SISTEMA DE BIBLIOTECA - MOSTRADOR ===");
  if (descartados > 0) {
    console.log(`[Aviso] Se descartaron ${descartados} registros mal formados del catálogo.\n`);
  }

  let ejecutando = true;

  while (ejecutando) {
    console.log("\n--- Menú Principal ---");
    console.log("1. Mostrar catálogo con ejemplares disponibles");
    console.log("2. Prestar un libro");
    console.log("3. Calcular multa de un préstamo");
    console.log("4. Salir");

    const seleccion = preguntarOpcion("\nSelecciona una opción: ");

    if (!seleccion) {
      console.log("Entrada no válida o cancelada. Intenta de nuevo.");
      continue;
    }

    const opcion = seleccion as OpcionMenu;
    try {
      switch (opcion) {
        case OPCION_MOSTRAR: {
          console.log("\n--- Catálogo de Libros Disponibles ---");
          catalogo.forEach((libro: Libro) => {
            const disponibles = calcularEjemplaresLibres(libro, prestamos);
            console.log(
              `ID: ${libro.id} | "${libro.titulo}" - ${libro.autor} (${libro.anio ?? "S/A"}) | Libres: ${disponibles}/${libro.ejemplares}`
            );
          });
          break;
        }

        case OPCION_PRESTAR: {
          const libroId = preguntar("Ingresa el ID del libro a prestar");
          if (!libroId) break;

          const nuevoPrestamo = prestarLibro(libroId, catalogo, prestamos);
          prestamos.push(nuevoPrestamo);
          console.log(`\n¡Préstamo registrado con éxito! ID del préstamo: ${nuevoPrestamo.id}`);
          break;
        }

        case OPCION_MULTA: {
          const prestamoId = preguntar("Ingresa el ID del préstamo a consultar: ");
          if (!prestamoId) break;

          const prestamo = prestamos.find((p) => p.id === prestamoId);
          if (!prestamo) {
            console.log(`Error: No se encontró ningún préstamo con el ID "${prestamoId}".`);
            break;
          }

          const estado = decidirEstadoPrestamo(prestamo);
          const multa = calcularMulta(prestamo);
          console.log(`\nEstado: ${estado.toUpperCase()} | Multa actual: $${multa} MXN`);
          break;
        }

        case OPCION_SALIR: {
          console.log("\nSaliendo del programa... ¡Hasta luego!");
          ejecutando = false;
          break;
        }

        default: {
          const _modoExhaustivo: never = opcion;
          console.log(`Opción desconocida: ${_modoExhaustivo}`);
          break;
        }
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(`\n[ERROR DE DOMINIO] ${error.message}`);
      } else {
        console.log("\n[ERROR DESCONOCIDO] Ocurrió un fallo no esperado.");
      }
    }
  }
}

ejecutarMenu();