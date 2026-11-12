# Práctica 19: Componentes, Plantillas y Enlace en Angular

## Ejercicio 1: Proyecto Base, Datos Locales y Resumen

¿Por qué se usan señales (`signal` y `computed`) para los contadores del resumen en lugar de calcularlos manualmente cada vez?
  Porque `computed` crea un valor derivado reactivo que Angular actualiza de forma automática y eficiente únicamente cuando cambia la señal de origen (`clases`), manteniendo sincronizados los totales sin repetir lógica en la plantilla.

¿Por qué los archivos `app.css` y `tarjeta-clase.css` quedan vacíos?
  Porque la arquitectura del proyecto centraliza toda la hoja de estilos en `src/styles.css`[cite: 2], permitiendo reutilizar las clases globales en todos los componentes sin duplicar reglas CSS.


## Ejercicio 2: Componente Tarjeta de Clase (`<app-tarjeta-clase>`)

¿Cómo se comunican el componente padre (`App`) y el componente hijo (`TarjetaClase`)?
  El padre envía los datos de la clase y su estado activo hacia el hijo mediante propiedades de entrada (`@Input()`), mientras que el hijo notifica al padre cuando el usuario hace clic emitiendo un evento a través de `@Output()` y `EventEmitter`.

¿Para qué sirve la cláusula `track clase.id` dentro del bloque `@for`?
  Le indica a Angular cómo identificar de manera única cada elemento de la lista para que, si los datos cambian o se filtran, solo actualice los nodos del DOM necesarios en lugar de volver a renderizar toda la rejilla.


¿Por qué el filtro recibe la categoría activa desde el padre en lugar de guardar su propio estado interno?
  Para mantener una única fuente de la verdad en el componente padre (`App`), asegurando que tanto la lista filtrada de tarjetas, los botones activos del filtro y el panel lateral de detalle siempre estén sincronizados.