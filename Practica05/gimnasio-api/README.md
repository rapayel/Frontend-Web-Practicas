# Práctica 05 - API de Gimnasio (NestJS)

## 1. ¿Qué generó el comando `nest new`?
El comando "nest new" generó la estructura base de un proyecto NestJS en TypeScript. Creó la carpeta "src/" con los archivos principales (main.ts, app.module.ts, app.controller.ts, app.service.ts), la configuración de dependencias (package.json), TypeScript (tsconfig.json) y la carpeta "test/" para pruebas.

## 2. ¿Qué hace el AppService que ya viene generado?
El AppService encapsula la lógica de negocio básica de la aplicación. En el proyecto recién generado, contiene el método getHello(), cuya única responsabilidad es retornar la cadena de texto 'Hello World!' al controlador (AppController) para que este la envíe como respuesta al cliente HTTP.

## 3. ¿Por qué la ruta funciona sin declarar nada en `app.module.ts`?
Funciona porque AppController ya está registrado en la matriz controllers del módulo raíz (app.module.ts). Cualquier nuevo decorador de ruta (@Get('clases')) que se agregue dentro de un controlador registrado es detectado automáticamente por NestJS al iniciar la aplicación.

## 4. ¿Qué pasaría si el cuerpo de la petición viniera vacío?
Si el cuerpo viene vacío (o como {}), NestJS lo aceptará e insertará un valor vacío o undefined dentro del arreglo clases, ya que actualmente no se están utilizando DTOs ni tuberías de validación (ValidationPipe) para restringir los datos de entrada.

## 5. ¿En qué archivo vive hoy toda la lógica de la práctica?
Toda la lógica de la práctica (el almacenamiento del arreglo en memoria, la lectura del catálogo y la inserción de nuevas clases) vive en el archivo src/app.controller.ts.