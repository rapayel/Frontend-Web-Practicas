# Práctica 16: Sesión y JWT en React

## Ejercicio 1: El Contexto de Sesión

¿Por qué se usa un contexto y no props para la sesión?
Porque el estado de la sesión es global y se necesita en componentes lejanos en el árbol de la aplicación (como el encabezado o los interceptores). Usar props obligaría a pasarlos manualmente por todos los componentes intermedios (*prop drilling*).

¿Qué pasa si un componente usa la sesión fuera del proveedor?
El contexto devuelve undefined o null. Si el hook no valida esta condición lanzando un error explicativo, la aplicación fallará con un error de ejecución al intentar acceder a propiedades de un objeto inexistente.

## Ejercicio 2: Entrar y Mandar el Token

¿Dónde se guarda el token y qué riesgo tiene ese lugar?
El token se guarda en el localStorage del navegador. El riesgo principal es que cualquier script ejecutable en la página (vulnerabilidad de tipo XSS) puede leer el almacenamiento local y robar el token de autenticación del usuario.