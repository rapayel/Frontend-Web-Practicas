# Práctica 17: Rutas Protegidas y Gestión de Errores HTTP

## Ejercicio 1: Mis Inscripciones, Sólo con Sesión

¿La ruta protegida hace segura la aplicación? ¿Qué es lo que de verdad protege los datos?
  No, la ruta protegida en el frontend solo mejora la experiencia de usuario (UX) al redirigirlo de la interfaz. Lo que de verdad protege los datos son los guardias y verificaciones del servidor (backend) al validar el token JWT en cada petición.


## Ejercicio 2: Inscribirse y el 401

¿Por qué no se manda el miembroId al inscribirse?
  Porque el servidor obtiene la identidad del usuario directamente extrayéndola del token JWT recibido en el encabezado `Authorization`, evitando que un usuario pueda alterar la petición para inscribir a otra persona.

¿Qué diferencia hay entre un 401 y un 403?
  El error `401 Unauthorized` indica que el usuario no está autenticado o su token es inválido/expirado. El error `403 Forbidden` indica que el usuario sí está autenticado, pero no tiene los permisos suficientes (por ejemplo, el rol de miembro requerido) para realizar la acción.