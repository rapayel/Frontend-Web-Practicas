# Práctica 15: Rutas y Parámetros en React Router

## Ejercicio 1: El Router y el Catálogo

¿Por qué el 404 sí tiene encabezado y pie?
  Porque la ruta 404 está definida como una ruta hija dentro de la ruta principal del `<Layout />`. Al compartir esa estructura, React Router renderiza el encabezado y el pie del Layout junto con el contenido del componente de la página 404.

¿Qué cambia en la pestaña Red si usas `<a href>` en lugar de `Link`?
  Con `<a href>`, el navegador realiza una recarga completa de la página (descargando de nuevo el HTML y los assets). Con `<Link>`, React Router intercepta la navegación para realizar una transición del lado del cliente (SPA) sin recargar la página, pidiendo únicamente los datos JSON necesarios.


## Ejercicio 2: El Detalle de una Clase

¿En qué tipo de dato llega el id de la URL y qué pasa si no lo conviertes?
  El `id` obtenido con `useParams()` siempre llega como una cadena de texto (`string`). Si no se convierte a número (`Number`), las comparaciones estrictas (`===`) o las peticiones que requieran un valor numérico fallarán, provocando que no se encuentre la clase o se envíe un tipo de dato incorrecto al servidor.

¿Qué pasa al ir de /clases/1 a /clases/2 si el id no está en las dependencias del efecto?
  El `useEffect` no detectará el cambio en la URL y no ejecutará la petición para la nueva clase. Como resultado, la interfaz se quedará mostrando la información del primer `id` (`/clases/1`) aunque la dirección en la barra de navegación haya cambiado a `/clases/2`.