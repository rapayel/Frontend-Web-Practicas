# Práctica 09 - Respuestas de Reflexión

## ¿Qué línea del Service o del Controller tuvo que cambiar para que Clases hablara con MySQL?
Ninguna. Se aplicó el principio de inversión de dependencias: el Service y el Controller dependen de la interfaz del repositorio (ClaseRepository), no de la base de datos. Solo se cambió la clase concreta (ClasePrismaRepository) en el módulo de NestJS.

## ¿Por qué InscripcionesService no tuvo que cambiar ni una línea de las reglas de cupo y duplicados?
Porque las reglas de negocio viven en la capa del dominio y el servicio. Como InscripcionesService consulta los datos a través del token del repositorio (INSCRIPCION_REPOSITORY), la lógica para validar el cupo y evitar duplicados funciona exactamente igual sin importar si los datos vienen de memoria o de MySQL a través de Prisma.

## ¿Por qué una interfaz no puede validar nada en tiempo de ejecución?
Porque las interfaces de TypeScript existen únicamente en tiempo de compilación para verificar tipos. Durante la transpilación a JavaScript, las interfaces son completamente eliminadas (*type erasure*). Las clases, en cambio, sí existen en JavaScript en tiempo de ejecución, lo que permite a librerías como class-validator leer sus decoradores.

## ¿Qué código de estado responde y qué trae en el cuerpo?
Código de estado: 400 Bad Request.
Cuerpo: Devuelve un objeto JSON con statusCode: 400, error: "Bad Request", y un arreglo message que detalla los campos inválidos detectados por class-validator.
Opción indispensable:transform: true (junto con whitelist: true), ya que sin ella el tubo de validación no transforma las cargas recibidas ni filtra las propiedades desconocidas.

## ¿Cuántas líneas quedó más corto el controlador?
Quedó aproximadamente **22 líneas más corto**. Se eliminaron las validaciones manuales de tipos, las comprobaciones de respuesta nula y los bloques try/catch con excepciones HTTP creadas manualmente (NotFoundException, ConflictException, etc.), dejando toda la traducción de errores centralizada en el filtro.

## Si la respuesta llega en los dos casos, ¿quién bloquea realmente y a quién protege?
Quien bloquea es el navegador web del cliente al detectar que las cabeceras Access-Control-Allow-Origin no coinciden con el origen solicitante. Esta política protege al usuario final impidiendo que sitios web externos o maliciosos lean datos o ejecuten peticiones no autorizadas en su nombre.