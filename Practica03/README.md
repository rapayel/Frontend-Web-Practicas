# Práctica 3 - Respuestas de Reflexión

## 1. ¿Hizo falta una base de datos real para probar la regla de negocio? ¿Qué dice eso sobre el patrón Repository?
No. El patrón Repository sirve para desacoplar la lógica de negocio de la persistencia. La regla solo necesita consultar y guardar mediante una interfaz, sin importar si los datos están en un Map en memoria o en una base de datos real.

## 2. El Service recibe el repositorio como Repository "Prestamo", no InMemoryPrestamoRepository. ¿Qué se rompía si usaban la clase concreta?
Se violaría el principio de Inversión de Dependencias. El Service quedaría acoplado a la infraestructura en memoria, impidiendo cambiar a una BD real o usar mocks/dobles en pruebas sin modificar el código del Service.

## 3. Si cambiaran el Map en memoria por una base de datos real, ¿cuántos archivos tocarían? ¿Por qué tan pocos?
Se tocaría solo 1 archivo . Esto ocurre porque el Service depende de una interfaz genérica que actúa como contrato, así que los métodos que llama el Service siguen siendo exactamente los mismos.