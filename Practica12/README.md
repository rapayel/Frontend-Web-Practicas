# Práctica 12 - Introducción a React

## Paso 1: Ver qué hace el compilador con el JSX
¿En qué se convirtió cada etiqueta del JSX?
En modo clásico ("runtime": "classic") se convirtieron en llamadas a "React.createElement()". En modo automático ("runtime": "automatic") se convirtieron en llamadas a "_jsx()" importadas de "react/jsx-runtime".

Si React es «sólo una biblioteca», ¿quién traduce el JSX?
Un compilador o transpilador externo, como SWC, Babel u Oxc.

## Paso 2: Crear el proyecto con Vite
¿Dónde está el contenedor vacío en index.html y quién lo llena?
El contenedor es "<div id="root"></div>" en index.html y lo llena "src/main.tsx" usando "createRoot" y ".render()".

## Paso 3: «Hola mundo» sin JSX
¿Qué hace createRoot y qué hace render?
"createRoot" inicializa el nodo raíz de React sobre un elemento del DOM real.
"render" toma el árbol de elementos de React, calcula las diferencias con el DOM virtual y actualiza la pantalla.

## Paso 4: El primer componente
¿Qué error muestra el editor al quitar la prop obligatoria?
TS2741: Property 'nombre' is missing in type '{}' but required in type 'SaludoProps'.

¿Por qué el nombre de un componente empieza con mayúscula?
Porque React usa la mayúscula inicial para diferenciar los componentes personalizados de las etiquetas estándar de HTML.