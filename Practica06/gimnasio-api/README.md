# Práctica 6 – Conectar el dominio con la API

## ¿Qué pasaría si el módulo no quedara registrado en la raíz?
NestJS no reconocería las rutas del controlador ni podría resolver sus dependencias, por lo que cualquier petición a esas rutas respondería con un error "404 Not Found".

## ¿Por qué los métodos del repositorio devuelven promesas si los datos van a estar en memoria?**  
Porque la interfaz define un contrato asíncrono pensando en una base de datos real. Al usar promesas desde el inicio, se puede cambiar la implementación en memoria por una BD real en el futuro sin modificar la interfaz ni los servicios.

## ¿Qué error apareció al cambiar a la interfaz, y por qué la clase sí se había resuelto sola?**  
Apareció un error de inyección de dependencias (Nest can't resolve dependencies). Las interfaces desaparecen al compilar a JavaScript (borrado de tipos), por lo que NestJS no tiene un token de runtime para inyectar. La clase concreta sí existe en JS compilado como constructor, por lo que se resolvía automáticamente.

### ¿Por qué el servicio necesita un token para el repositorio, pero el controlador no lo necesita para el servicio?**  
El repositorio se inyecta mediante una interfaz (que desaparece en runtime), requiriendo un token explícito (@Inject) para indicarle a NestJS qué clase usar. En cambio, el servicio se inyecta como una clase concreta que sí existe en runtime y funciona como su propia llave.

## ¿Cuál es la diferencia entre un 400 y un 409?**  
400 Bad Request: La petición está mal formada o faltan campos obligatorios.  
409 Conflict: La petición es válida estructuralmente, pero entra en conflicto con las reglas del sistema (por ejemplo, cupo lleno o inscripción duplicada).

## ¿Por qué cambió el código de estado de esa última petición?
Al cancelar la inscripción previa, el cupo o el registro del miembro quedó liberado. La nueva petición dejó de generar un conflicto (409) y se procesó con éxito como una nueva creación (201).