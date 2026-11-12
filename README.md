# Gatherly

Trabajo del segundo parcial de Aplicaciones Hibridas de ISEC.

Gatherly es un proyecto para publicar objetos que otras personas pueden alquilar. Cada publicacion tiene un precio por dia, una categoria y un estado que indica si esta disponible o alquilada.

## Como esta organizado

- `api/`: servidor con Express, MongoDB y Mongoose.
- `web/`: pagina hecha con React y Vite.
- `api/pruebas/`: pedidos de Thunder Client para comprobar que funciona.

## Como ponerlo en marcha

Se necesita Node.js, npm y una base de MongoDB. Hay que instalar las dependencias por separado en `api/` y `web/`.

1. En `api/`, copiar `.env.ejemplo` con el nombre `.env` y completar la conexion a MongoDB, el secreto del token, los origenes permitidos y las claves de la semilla.
2. En `web/`, copiar `.env.ejemplo` con el nombre `.env`. La direccion de la API es `VITE_API_URL=http://localhost:3000/api`.
3. Abrir una terminal en `api/` y ejecutar `npm install` y despues `npm start`.
4. Abrir otra terminal en `web/` y ejecutar `npm install` y despues `npm run dev`. Vite muestra la direccion para abrir la pagina.

En PowerShell usamos `npm.cmd` en lugar de `npm` si Windows bloquea los scripts. Por ejemplo: `npm.cmd start`.

Los archivos `.env` tienen datos privados y no se suben a GitHub. Los archivos `.env.ejemplo` muestran que variables hay que completar, sin incluir valores reales.

## Datos de ejemplo

Desde `api/` se puede ejecutar `npm run semilla`. La semilla crea un usuario comun, un administrador y tres publicaciones relacionadas con el usuario comun. Sus claves salen de `SEMILLA_CLAVE_USUARIO` y `SEMILLA_CLAVE_ADMIN`, que se completan en `api/.env`.

La semilla busca primero los datos por email o por codigo. Si ya existen, no los vuelve a crear. Si a una publicacion de ejemplo le falta propietario, se lo agrega.

Usuarios de ejemplo: `usuario.semilla@gatherly.test` y `admin.semilla@gatherly.test`. Las claves son las que se eligieron en el `.env` local.

## Publicaciones y usuarios

Cada publicacion guarda en `propietario` el identificador de un usuario. En el detalle de una publicacion usamos `populate` para traer el nombre de ese usuario. Asi podemos ver quien es el propietario sin guardar su nombre repetido en cada publicacion.

## Rutas principales

| Metodo | Direccion | Que hace |
| --- | --- | --- |
| GET | `/api/salud` | Comprueba que el servidor responde. |
| GET | `/api/publicaciones` | Lista las publicaciones. |
| GET | `/api/publicaciones/:id` | Muestra una publicacion y el nombre del propietario. |
| POST | `/api/auth/registro` | Registra un usuario comun. |
| POST | `/api/auth/login` | Inicia sesion y devuelve un token. |
| POST | `/api/publicaciones` | Crea una publicacion. Requiere sesion. |
| PATCH | `/api/publicaciones/:id` | Modifica una publicacion. Requiere sesion. |
| POST | `/api/publicaciones/:id/alquilar` | Marca una publicacion como alquilada. Requiere sesion. |
| DELETE | `/api/publicaciones/:id` | Elimina una publicacion. Requiere sesion y rol admin. |

El listado permite filtrar con `categoria`, `estado` y `requiereDeposito` en la direccion. Por ejemplo: `http://localhost:3000/api/publicaciones?categoria=camping`. Se pueden combinar varios filtros.

Para registrar un usuario se envian `nombre`, `email` y `clave` en formato JSON. Para iniciar sesion se envian `email` y `clave`. La clave se guarda protegida con sal y scrypt. La API usa JWT para reconocer la sesion.

En los pedidos que requieren sesion se envia el token como Bearer. Si falta o no es valido, la API responde 401. Si el usuario tiene sesion pero no tiene permiso de admin para borrar, responde 403.

## Pagina web

La pagina tiene Inicio, Publicaciones y Acerca de Gatherly. El menu cambia la vista con el estado de React. Tambien se puede registrar un usuario e iniciar sesion desde la pagina. La API devuelve el usuario y un token al iniciar sesion.

En Publicaciones, React pide los datos a nuestra API. Mientras espera muestra Cargando, y si falla muestra un mensaje de error. El selector de categoria guarda lo elegido en el estado y manda ese filtro a la API para hacer un pedido nuevo.

Usamos componentes que reciben datos por props, como Tarjeta, y componentes que reciben contenido con `children`, como `Diseno` y `Seccion`.

## Pruebas

En `api/pruebas/gatherly.pruebasusuariosparcial2.json` esta la coleccion de Thunder Client. Incluye pedidos para registro, login, lectura de publicaciones, filtros, una ruta con propietario, escritura con sesion y respuestas 401 y 403. Tambien probamos crear una publicacion temporal y borrarla con un usuario admin: la API respondio 201 al crear y 204 al borrar.

Los tokens y claves de esa coleccion se dejaron como variables `{{CLAVE_PRUEBA}}`, `{{CLAVE_ADMIN}}`, `{{TOKEN_USUARIO}}` y `{{TOKEN_ADMIN}}`. Antes de probar un pedido protegido hay que completar esos valores en Thunder Client con los datos locales. En otra base de datos tambien hay que cambiar los IDs de las publicaciones por IDs que devuelva el listado.

## Quienes hicimos cada parte

- Selena Garcia: publicaciones, relacion con usuario, populate, semilla, consultas y vistas de React, filtros y pruebas.
- Sofia Figueroa: registro, login, proteccion de claves, JWT, permisos y formularios de login y registro.
- Juntas: integracion y revision del proyecto.

## Uso de inteligencia artificial

Usamos inteligencia artificial para pedir explicaciones de temas que nos costaban y para ayudarnos a ordenar el trabajo y redactar este README. Revisamos el codigo con las clases y probamos las funciones en nuestra computadora.
