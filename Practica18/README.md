# Práctica 18: Rendimiento, Lazy Loading y Estado Global con Zustand

## Ejercicio 1: Partir por Ruta y Medir

¿Cuánto se ahorró y por qué el ahorro es pequeño en esta aplicación?
  El ahorro de tamaño fue mínimo (unos pocos kilobytes) porque la aplicación es pequeña y no utiliza librerías pesadas. El código base compartido representa la mayor parte del peso total, por lo que separar las páginas en chunks individuales no impacta de forma significativa en el tamaño global en proyectos chicos.

¿Por qué falla la API si el preview corre en el puerto 4173?
  Falla por políticas de CORS (Cross-Origin Resource Sharing). El backend gimnasio-backend está configurado para permitir peticiones únicamente desde el origen del frontend en el puerto 5173 (http://localhost:5173). Al cambiar al puerto `4173`, el navegador bloquea las solicitudes por seguridad al ser considerado un origen no autorizado por la API.


## Ejercicio 2: Un Store para las Inscripciones

¿Cuándo conviene un contexto y cuándo un store?
  El contexto de React conviene para compartir datos globales que cambian con muy poca frecuencia y de los que depende casi toda la aplicación (como el tema visual o la sesión del usuario). Un store de Zustand conviene para manejar estados más dinámicos o compartidos entre componentes sin relación directa, ya que permite suscribirse a fragmentos específicos del estado, evitando re-renderizados innecesarios en toda la app.