# Práctica 13: Tienda en Línea con React y TypeScript

## ¿Por qué el Layout no necesita saber que es una tienda?
Porque aplica el patrón de composición (Slots/Props de renderizado) y el principio de separación de responsabilidades. Su única función es definir la estructura o marco visual. Al recibir los componentes como parámetros, es agnóstico a la lógica de negocio y puede ser reutilizado en cualquier otro contexto de la aplicación.

## ¿Qué pasa si escribes onClick={onAgregar(producto)} sin la flecha?
La función se invocaría inmediatamente durante la fase de renderizado en lugar de esperar la interacción del usuario. Al modificar el estado en pleno render, React fuerza un re-renderizado continuo provocando un bucle infinito y rompe la aplicación. La función flecha  asegura que solo se ejecute al hacer clic.

## ¿Por qué con carrito.push(...) el contador no se mueve y no sale ningún error?
Porque push muta el arreglo existente en la misma dirección de memoria. React utiliza comparación superficial para detectar cambios en el estado; al no cambiar la referencia del arreglo, React asume que el estado sigue igual y no desencadena un nuevo renderizado de la interfaz. La forma correcta de preservar la inmutabilidad es crear una nueva copia con la sintaxis spread:[...anterior, producto].