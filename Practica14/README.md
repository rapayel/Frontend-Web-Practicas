# Práctica 14: Conexión con API REST en React

## Ejercicio 1: Traer los productos de la API
¿Por qué en la pestaña Red salen dos peticiones al cargar?
  Por el uso de "<React.StrictMode>" en el entorno de desarrollo de React 18+. Este modo monta los componentes dos veces intencionalmente para detectar efectos secundarios indeseados, haciendo que el useEffect se ejecute dos veces al cargar la página.

¿Qué pasa si quitas el arreglo de dependencias del efecto?
  El useEffect se ejecutaría en cada renderizado de la aplicación, creando un bucle infinito de peticiones HTTP: cada respuesta actualiza el estado (setProducts), lo que provoca un nuevo renderizado y dispara la petición de nuevo indefinidamente.


## Ejercicio 2: El Pago Simulado

¿Qué hace e.preventDefault() y qué pasa si lo quitas? 
  Evita el comportamiento por defecto de los formularios HTML (que recargan toda la página al enviar los datos). Si se quita, la página se recargaría por completo, haciendo que React pierda su estado interno (se vaciaría el carrito y los datos en pantalla).

