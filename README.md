#Práctica 1 - Descubriendo TypeScript


# Paso 2: Escribir el error de JavaScript
¿Hubo algún error, alguna advertencia o algo en la consola que avisara?
No, porque JavaScript es de tipado dinámico y hace la concatenación de texto sin avisar.

# Paso 3: Anotar el tipo
Si el archivo tiene un error de tipos, ¿por qué Node lo ejecuta?
Porque Node ignora los tipos al ejecutar y solo corre el código JavaScript.

¿Cuál comando revisa y cuál ejecuta?
Revisa:"npx tsc --noEmit"
Ejecuta:"node multas.ts"

# Paso 4: Declarar variables
De las dos líneas que usan "const", ¿por qué sólo una falla?
Porque "const" permite modificar las propiedades de un objeto, pero no reasignar la variable completa.

Al asignarle texto a la variable con "let", ¿de dónde salió ese tipo?
De la inferencia de tipos de TypeScript, que detectó automáticamente que empezó siendo un número.
