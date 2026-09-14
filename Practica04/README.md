# Práctica 4 - De la capa de dominio a una API HTTP

## 1. Express manda los rechazos de un handler async directo al middleware de errores, sin try/catch en cada ruta. ¿Qué tendrían que agregar en cada ruta si esto no fuera así?
Envolver todo el código de cada handler en un bloque "try/catch" manual y llamar a "next(error)" dentro del bloque "catch" para pasarle el error al middleware explícitamente.

## 2. ¿Por qué el servicio no lanza directamente un 409 en vez de EjemplarPrestadoError?
Porque la capa de servicio es independiente del protocolo HTTP. El servicio maneja errores de dominio/negocio; asignar códigos de estado HTTP (como el 409) es responsabilidad exclusiva de la capa web (controladores y middlewares).

## 3. Si mañana agregaran una app móvil que también consume esta API, ¿qué archivos de esta práctica tendrían que tocar?
Ninguno. La API REST ya expone los contratos HTTP (/api/prestamos). La app móvil simplemente consumiría los mismos endpoints y DTOs sin requerir cambios en el backend.