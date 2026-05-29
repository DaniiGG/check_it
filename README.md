Rutas que no pueden faltar
Crear cuenta Antes de hablar de tus jueguitos, tienes que registrarte. Sin cuenta no
hay servicio, campeón / campeona.

Hacer login Ya sabes cómo va esto: email, contraseña, y entras al mundillo. Si no
estás registrado, no puedes hacer nada.

Crear jueguito Sube los datos de cada título (nombre, categoría, etiquetas, horas que
requiere, puntuación en Metacritic, etc.).

Listar jueguitos Porque ver la lista sin sentido no tiene gracia, podrás:
- Ordenar por puntuación, terminados o en proceso.
- Filtrar por etiquetas, nombre o categoría.

Editar jueguito Cambias datos porque te equivocaste o porque el juego ahora te parece
menos épico.

Borrar jueguito Arrepentimientos o limpieza extrema. Tú decides.

Marcar jueguito como completado Una vez terminas un juego (o decides que ya tuviste suficiente), márcalo
como completado. Esto actualiza la fecha de finalización
automáticamente. Puedes añadir un comentario (opcional) y valoración
de 1-5 estrellas.

Datos para la cuenta
Email Tu identificador único.
Contraseña Protegida y bien encriptada, que aquí somos serios.
Alias Porque el email es aburrido y queremos algo con personalidad.

Datos para los jueguitos
Nombre El título, obvio.

Categoría ¿RPG? ¿Shooter? ¿Indie raro? Tú decides.

Etiquetas Palabras clave para buscarlo fácil (ej.: "acción", "zombies", "estrategia").

Puntuación Metacritic Porque no jugamos cosas sin reviews, ¿no?, puedes extraerla de la
puntuación de los usuarios (que se fastidien los críticos) en:
https://www.metacritic.com/game/

Horas de dedicación Cuánto tiempo necesitas para acabarlo según las referencias en:
https://howlongtobeat.com/

Completado Booleano, sí o no.

Fecha completado Una vez terminas un juego (o decides que ya tuviste suficiente), márcalo
como completado. Esto actualiza la fecha de finalización
automáticamente.

Notas al completarlo (opcional) Si te apetece dejar un mensaje épico o quejarte del final.

Valoración Porque no todos los juegazos son tan juegazos, y está bien dejar
constancia de cuándo te estafaron las expectativas o cuándo un indie de
2 euros te voló la cabeza.

Y aquí es donde la magia sucede. Nuestro servicio usa un algoritmo tan
absurdo como brillante para priorizar tus juegos.
Se trata de dividir la puntuación en Metacritic entre las horas necesarias para
completarlo.
Más puntuación, menos horas, y voilá: el juego se ve recompensado
asquerosamente. ¿Por qué? Porque lo que queremos es darle a tu cerebro una
sobredosis de dopamina instantánea.
Cero compromisos. Terminas rápido, te sientes un/una crack y pasas al
siguiente.

Ejemplo práctico
Juego A: 90 puntos en Metacritic / 10 horas = 9 puntos de "prioridad".
Juego B: 85 puntos en Metacritic / 5 horas = 17 puntos de "prioridad" (¡Este va
primero, obvio!).
Es simple, efectivo y, sobre todo, adictivo.
¡Prepárate para liquidar tu backlog con estilo y velocidad!

Sprint 1: API básica para un gamer

En este sprint, nos centramos en crear una API REST funcional pero sencilla, sin toda la
parte de usuarios. La app funcionará como si fuera para un único gamer.
Funcionalidades a desarrollar:
- Crear un jueguito.
- Listar juegos con orden y filtros.
- Editar juegos.
- Eliminar juegos.
- Marcar juegos como completados.
- Implementar el algoritmo de priorización.
Objetivo: Al final de este sprint, la API permitirá gestionar juegos y priorizarlos, aunque
solo podrá ser usada por un usuario único (sin autenticación).


Sprint 2: Soporte para múltiples gamers

En este sprint, llevaremos la API al siguiente nivel añadiendo la posibilidad de que varios
usuarios puedan registrarse y usarla de forma segura.
Funcionalidades a desarrollar:
- Registro de cuentas con email, contraseña y alias.
- Login para usuarios registrados.
- Protección de rutas relacionadas con juegos (solo usuarios logueados podrán
acceder).
- Asociar cada juego a su usuario correspondiente (cada gamer verá solo sus juegos).
Objetivo: Al final de este sprint, la API será capaz de manejar múltiples usuarios,
garantizando que cada uno pueda gestionar su propia lista de juegos de manera privada y
segura.





Home / - Breve introducción al propósito de la aplicación.
- Botones o enlaces para acceder a la lista de juegos o
crear uno nuevo.

Lista de juegos /juegos - Mostrar los juegos en un listado.
- Ordenación (puntuación , juegos terminados / en
proceso.
- Filtros (nombre, categoría, etiqueta(s)).
- Acciones disponibles (editar, borrar, marcar como
completado).

Creación de juego /juegos/nuevo - Formulario + botón crear

Edición de juego /juegos/edicion/:id - Formulario + botón guardar

Detalle de juego
(opcional)
/juegos/:id - Mostrar información detallada del juego



Registro /registro - Formulario para crear una cuenta (email, alias y
contraseña).

Login /login - Formulario para iniciar sesión con email y contraseña.
- Mostrar errores si las credenciales son incorrectas.

Home (Actualizada) / - Incluir enlace a registro / login y ocultar el que
corresponda según la sesión

Lista de juegos
(actualizada)
/juegos - Mostrar solo los juegos del usuario autenticado.

Creación de juego
(actualizada)
/juegos/nuevo - Asociar los juegos al usuario que los crea.

Pantalla de perfil
(opcional)
/perfil - Mostrar información básica del usuario logueado (alias
y email).

- Opción para cerrar sesión.