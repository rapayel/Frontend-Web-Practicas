# Práctica 07 - Módulo de Miembros

## 1. ¿Por qué la interfaz MiembroRepository no menciona Express, NestJS ni memoria?
Porque pertenece al **dominio**. Su función es definir el contrato de las operaciones de negocio sin acoplarse a frameworks web ni a formas de almacenamiento.

## 2. ¿Qué palabra de la clase MiembroMemoriaRepository promete cumplir la interfaz?
La palabra implements, que obliga a la clase a cumplir con la estructura definida en MiembroRepository.

## 3. ¿Por qué miembros.service.ts no sabe qué es una petición HTTP?
Porque pertenece a la capa de servicio/negocio. Maneja la lógica de la aplicación y se abstrae de detalles del protocolo web como `req`, `res` o decoradores HTTP.

## 4. ¿Por qué el Service se inyecta sin token en el Controller, y el repositorio sí necesita uno?
El servicio es una **clase concreta** y NestJS la reconoce por su tipo. El repositorio es una interfaz, la cual desaparece en JavaScript al compilar, requiriendo un token explícito (MIEMBRO_REPOSITORY) para su resolución.

## 5. ¿Qué prueba que agregar Miembros no rompió nada de Inscripciones?
Que los endpoints de Inscripciones (/inscripciones) siguen respondiendo correctamente a las peticiones HTTP, demostrando el desacoplamiento entre módulos.
