# Gatherly

Gatherly es nuestro proyecto final de una app utilizada para publicar
y alquilar objetos de uso esporádico: cosas que una persona tiene, pero no usa
todos los días, y que pueden servirle a otra por un tiempo. Una publicación muestra que
objeto se ofrece, cuánto cuesta por día y si está disponible. La API permite
crear publicaciones, consultarlas, modificarlas, eliminarlas y marcarlas como alquiladas.

Las publicaciones se guardan en MongoDB. El listado se puede filtrar por categoría,
estado y necesidad de depósito, por separado o combinando los filtros.

## Tecnologías

- JavaScript con módulos ES y Node.js.
- Express 5.2.1 para el servidor y las rutas.
- MongoDB y Mongoose 9.11.1 para guardar y validar las publicaciones.
- Thunder Client para probar los pedidos HTTP.

## Requisitos e instalación

- Node.js 20.19 o superior y npm.
- Una base de MongoDB accesible, por ejemplo en MongoDB Atlas.

1. Clonar el repositorio y entrar en su carpeta.
2. Ejecutar `npm install`.
3. Copiar `.env.ejemplo` como `.env` y completar los valores:

   ```dotenv
   PUERTO=3000
   MONGODB_URI=mongodb+srv://USUARIO:CONTRASENA@SERVIDOR/
   CLAVE_ADMIN=REEMPLAZAR_POR_UNA_CLAVE_PRIVADA
   ```

   `PUERTO` es el puerto donde escuchará la API. `MONGODB_URI` es la dirección de conexión a MongoDB. `CLAVE_ADMIN` protege la eliminación de publicaciones y se envía en el encabezado `X-Clave`. El nombre de la base, `gatherly`, se indica en el código. El archivo `.env` es local y no debe subirse al repositorio.

4. Iniciar la aplicación con `npm start`. Para reiniciarla automáticamente al editar, usar `npm run dev`.
5. Comprobar que funciona con `GET http://localhost:3000/api/salud`. Si se usa otro puerto, cambiar `3000` en los ejemplos.

### Datos de ejemplo

Opcionalmente, ejecutar `npm run semilla` para agregar una cámara, un parlante y una hidrolavadora. La semilla se ejecuta por separado del servidor. Está pensada para una base que todavía no tenga esas publicaciones: si se vuelve a ejecutar sobre la misma base, los códigos únicos se repetirán y MongoDB rechazará la carga. No borra las publicaciones existentes.

## Rutas

En las rutas con `{id}`, reemplazarlo por el `id` real de una publicación devuelta por la API. Los ejemplos usan `http://localhost:3000`.

| Método | Ruta | Qué hace | Respuesta exitosa |
| --- | --- | --- | --- |
| GET | `/api/salud` | Comprueba que la API responde. | 200 y un objeto con `estado` y `hora`. |
| GET | `/api/publicaciones` | Lista publicaciones; admite filtros. | 200 y una lista. |
| GET | `/api/publicaciones/{id}` | Busca una publicación por ID. | 200 y la publicación. |
| POST | `/api/publicaciones` | Crea una publicación. | 201 y la publicación creada. |
| PATCH | `/api/publicaciones/{id}` | Modifica campos de una publicación. | 200 y la publicación actualizada. |
| POST | `/api/publicaciones/{id}/alquilar` | Cambia de disponible a alquilado. | 200 con `id`, `titulo` y `estado`. |
| DELETE | `/api/publicaciones/{id}` | Elimina una publicación con la clave de administrador. | 204, sin cuerpo de respuesta. |

### Ejemplos de pedidos

**Estado del servicio:**

```http
GET http://localhost:3000/api/salud
```

**Listar todas las publicaciones:**

```http
GET http://localhost:3000/api/publicaciones
```

Para filtrar se pueden agregar `categoria`, `estado` y `requiereDeposito` a la dirección. `requiereDeposito` acepta `true` o `false`. Los tres filtros pueden combinarse:

```http
GET http://localhost:3000/api/publicaciones?categoria=camping&estado=disponible&requiereDeposito=true
```

**Obtener una publicación:**

```http
GET http://localhost:3000/api/publicaciones/{id}
```

**Crear una publicación:** enviar el siguiente JSON en el cuerpo del pedido, con `Content-Type: application/json`.

```http
POST http://localhost:3000/api/publicaciones
Content-Type: application/json

{
  "codigo": "EJ-CAMP-001",
  "titulo": "Carpa para cuatro personas",
  "descripcion": "Carpa impermeable para cuatro personas, fácil de armar e ideal para una salida de fin de semana.",
  "categoria": "camping",
  "precioPorDia": 1500,
  "requiereDeposito": true,
  "deposito": 5000
}
```

La respuesta incluye el `id` generado. El estado inicial es `disponible` si no se envía otro valor. El `codigo` debe ser único.

**Modificar una publicación:** por ejemplo, cambiar su precio.

```http
PATCH http://localhost:3000/api/publicaciones/{id}
Content-Type: application/json

{
  "precioPorDia": 1800
}
```

**Alquilar una publicación disponible:** no necesita cuerpo.

```http
POST http://localhost:3000/api/publicaciones/{id}/alquilar
```

Si ya está alquilada, la API responde con el código 409. Si el ID no corresponde a ninguna publicación, responde con 404.

**Eliminar una publicación:**

```http
DELETE http://localhost:3000/api/publicaciones/{id}
X-Clave: VALOR_DE_CLAVE_ADMIN
```

Sin el encabezado correcto, la respuesta es 401.

La colección exportada de Thunder Client está en `pruebas/gatherly.pruebaspublicaciones.json` y permite repetir los pedidos desde la extensión. Para usar sus pedidos con `{id}`, hay que reemplazar los ID de ejemplo por uno devuelto por el listado. En el DELETE, sustituir `REEMPLAZAR_CON_CLAVE_ADMIN` por el valor de `CLAVE_ADMIN` del `.env` local solo al probar; nunca guardar la clave real en el repositorio. La prueba de código duplicado requiere haber ejecutado antes la semilla.

## Decisiones

1. **Guardar en MongoDB:** las publicaciones permanecen guardadas aunque se reinicie el servidor. Mongoose permite definir los campos y validar valores como la categoría, el estado y el precio mínimo.
2. **Separar rutas, controladores y servicios:** las rutas reciben los pedidos, los controladores preparan las respuestas y los servicios contienen las consultas y reglas de las publicaciones. Así se puede encontrar más fácilmente dónde hacer un cambio.
3. **Representar el alquiler con el estado:** cada publicación ofrece un objeto, sin cantidad de unidades. Por eso alquilar cambia `disponible` a `alquilado` en una sola operación de MongoDB. Si ya estaba alquilado, se informa un conflicto.
4. **Uso de inteligencia artificial:** se utilizó como apoyo para comprender conceptos, revisar ejemplos y preparar la documentación. El código y las decisiones del proyecto se revisaron y probaron para poder explicarlos en la defensa.

## Integrantes

- **Selena García:** modelo y operaciones de publicaciones, filtros, alquiler, pruebas y semilla.
- **Sofía Figueroa:** configuración inicial del servidor y conexión, middlewares y manejo de errores.
