# Práctica 08 - Respuestas de Reflexión

## ¿Por qué el paquete del adaptador se llama `adapter-mariadb` si usamos MySQL?
Porque MariaDB es un *fork* directo de MySQL y comparten el mismo protocolo de red. El adaptador mantenido por el equipo de MariaDB ofrece un alto rendimiento y soporte asíncrono para Node.js/TypeScript, por lo que Prisma lo utiliza indistintamente tanto para MariaDB como para MySQL.

## ¿Editar schema.prisma cambió algo en la base de datos antes de migrar?
No. El archivo `+schema.prisma es solo una declaración del esquema en código. MySQL no sufre cambios hasta que ejecutas npx prisma migrate dev, el cual genera y aplica el script .sql en la base de datos.

## ¿La carpeta de migraciones es una foto del esquema o un historial?
Es un **historial** incremental. Cada carpeta almacenada en prisma/migrations guarda un cambio incremental en scripts .sql, permitiendo reconstruir la base de datos paso a paso desde su origen hasta el estado actual.

## ¿Por qué Horario.clase sí crea columna y Clase.horarios no?
Porque en el modelo relacional ($1:N$), la clave foránea (*foreign key*) se almacena en la tabla del lado "Muchos" (horario), creando la columna clase_id. La propiedad horarios en Clase es una relación virtual de Prisma para navegar en el código TypeScript y no genera columna física en MySQL.

## ¿De dónde sale la relación de muchos a muchos entre Miembro y Horario, si nunca se declaró?
Surge de la tabla intermedia Inscripcion (modelo pivote Many-to-Many). Un miembro puede tener múltiples inscripciones a distintos horarios, y cada horario puede tener muchos miembros inscritos. Inscripcion actúa como puente conectando $1:N$ con Horario y $1:N$ con Miembro.