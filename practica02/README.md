# Práctica 2 – El mostrador de la biblioteca

## Paso 2: El dominio, antes que el programa
¿Por qué una unión de valores y no una enumeración (enum)?
* Cero sobrecoste en JS: Se elimina por completo en el código transpilado a JavaScript, evitando código extra.
* Simplicidad: Permite usar cadenas de texto directamente sin importar objetos adicionales.
* Compatibilidad: Coincide de forma natural con los valores de un archivo JSON.

## Paso 3: La aduana del archivo
¿Qué se gana con el tipo "unknown" en lugar del que acepta todo (any)?
* El tipo "any" anula la seguridad de TypeScript y permite errores en tiempo de ejecución. 
* El tipo "unknown" nos obliga a validar los tipos (*type narrowing*) mediante verificaciones de código antes de poder operar los datos.

## Paso 4: Las reglas del mostrador
¿Por qué la fecha entra como parámetro?
* Pruebas unitarias: Permite simular escenarios en pasado, presente o futuro sin alterar el reloj del sistema.
* Determinismo: Garantiza que a una fecha fija dada, las reglas y multas siempre devuelvan el mismo resultado exacto.

## Paso 5: La entrada por teclado y el menú
¿Por qué envolver la librería de teclado en tipos honestos?
* Las librerías que devuelven "any" enmascaran posibles fallos. 
* Envolver la entrada para devolver "string | undefined " obliga a manejar los casos donde el usuario no ingresa datos o interrumpe la ejecución.

## Paso 6: Transpilar no es verificar
* Transpilar (tsc): Convierte código de TypeScript a JavaScript sin importar si hay errores lógicos de tipos.
* Verificar (tsc --noEmit):** Valida las reglas de tipado estrictas sin generar archivos de salida.