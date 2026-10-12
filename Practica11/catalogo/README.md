# Práctica 11: Web Components y Shadow DOM

## ¿Por qué el nombre de una etiqueta propia (Custom Element) debe llevar guion?
El estándar de Web Components de W3C exige que los Custom Elements contengan al menos un guion (-) por dos razones clave:
1. **Prevención de conflictos de nombres:** Garantiza que los componentes creados por desarrolladores no colisionen con nuevas etiquetas nativas que la especificación HTML agregue en el futuro.
2. **Reconocimiento del analizador HTML (Parser):** Le permite al navegador detectar inmediatamente durante el parseo que se trata de un elemento personalizado y no de un elemento desconocido o mal escrito.

## 1. ¿Por qué se debe convertir el atributo de existencia a número?**
En la API del DOM, los valores recuperados de los atributos HTML (a través de getAttribute o observadores de atributos) son siempre cadenas de texto (string). Para realizar comparaciones numéricas, operaciones matemáticas o validar si la existencia es cero (existencia === 0), es necesario convertir la cadena explícitamente utilizando Number(valor) o parseInt(valor).

## ¿Qué sucede si el evento personalizado no incluye `composed: true`?
Si el evento agregar no tiene configurada la propiedad composed: true, el evento se detiene en la frontera del Shadow DOM donde fue emitido. Como consecuencia, el evento no puede ascender hacia el documento principal ni ser escuchado por elementos fuera del componente (como la <section class="rejilla">), lo que provoca que el contador del carrito no se actualice, aunque el código no lance ningún mensaje de error en la consola.