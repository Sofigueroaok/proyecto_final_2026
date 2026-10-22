# PRIMER PARCIAL - APLICACIONES HIBRIDAS - ISEC - OPCION B.

# Gatherly

Gatherly es la API que hicimos para nuestro proyecto final. La idea de la app es que una persona pueda publicar un objeto que usa poco, como una cámara o una hidrolavadora, y otra pueda alquilarlo por un tiempo. En cada publicación se ve cuánto cuesta por día, si pide depósito y si está disponible.

Nuestra API permite crear publicaciones, verlas, modificar sus datos, eliminarlas y marcarlas como alquiladas. Las guardamos en MongoDB. También se pueden buscar por categoría, estado y depósito, usando un filtro o varios juntos.

## Tecnologías

- JavaScript con módulos ES y Node.js.
- Express 5.2.1 para el servidor y las rutas.
- MongoDB y Mongoose 9.11.1 para guardar y validar las publicaciones.
- Thunder Client para probar los pedidos HTTP.

## Requisitos e instalación

- Node.js 20.19 o superior y npm.
- Una base de MongoDB accesible, por ejemplo en MongoDB Atlas.

1. Clonar el repositorio y entrar en la carpeta.
2. Ejecutar `npm install`.
3. Copiar `.env.ejemplo` como `.env` y completar los valores:

   ```dotenv
   PUERTO=3000
   MONGODB_URI=mongodb+srv://USUARIO:CONTRASENA@SERVIDOR/
   CLAVE_ADMIN=REEMPLAZAR_POR_UNA_CLAVE_PRIVADA
   ```

   PUERTO es el puerto donde escuchara la API. MONGODB_URI es la dirección de conexión a MongoDB. CLAVE_ADMIN protege la eliminación de publicaciones y se envía en el encabezado X-Clave. El nombre de la base, gatherly, se indica en el código. El archivo `.env` es local y no se sube al repositorio.

4. Iniciar la aplicación con `npm start`. 
5. Comprobar que funciona con `GET http://localhost:3000/api/salud`. Si se usa otro puerto, cambiar `3000` en los ejemplos.

### Datos de ejemplo

Opcionalmente, ejecutar `npm run semilla` para agregar una cámara, un parlante y una hidrolavadora. Está pensada para una base que todavía no tenga esas publicaciones. No borra las publicaciones existentes.

## Rutas

En las rutas con `{id}`, reemplazarlo por el id real de una publicación devuelta por la API. Los ejemplos usan `http://localhost:3000`.

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

**Crear una publicación:** se puede enviar este JSON en el body del pedido,
con `Content-Type: application/json`.

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

**Alquilar una publicación disponible:** no necesita body.

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

La colección exportada de Thunder Client está en `pruebas/gatherly.pruebaspublicaciones.json` y permite repetir los pedidos desde la extensión. Para usar sus pedidos con `{id}`, hay que reemplazar los ID de ejemplo por uno devuelto por el listado. En el DELETE, sustituir `REEMPLAZAR_CON_CLAVE_ADMIN` por el valor de `CLAVE_ADMIN` del `.env` local solo al probar; nunca guardar la clave real en el repositorio.

## Decisiones

1. **Hacer opcional el depósito de garantía:** no todos los objetos tienen el mismo valor ni necesitan las mismas condiciones para alquilarlos. Por eso cada publicación puede indicar si pide depósito y cuál es el monto. Si no se indica nada, por default no lo pide y el monto es 0.
2. **Usar categorías predefinidas:** elegimos una lista de 5 categorías para que no se guarde una misma idea escrita de distintas formas. Esto también hace más útil el filtro por categoría.
3. **Cambiar el estado al alquilar:** cada publicación representa un objeto, así que no necesitamos llevar un stock. Al alquilarlo pasa de `disponible` a `alquilado`. Si alguien intenta alquilarlo otra vez, la API responde 409.

**Uso de inteligencia artificial:** sí usamos IA como ayuda para estudiar. Le pedimos explicaciones más sencillas de conceptos tecnicos que nos costaban mucho, ejemplos y orientación para pensar algunas decisiones y seguir avanzando con la organización el proyecto. También nos ayudó a redactar este README para que este completo y con el vocabulario preciso. Fuimos adaptando las respuestas a Gatherly y probando lo que hicimos para poder explicarlo.

## Integrantes

- **Selena García:** modelo y operaciones de publicaciones, filtros, alquiler, pruebas y semilla.
- **Sofía Figueroa:** configuración inicial del servidor y conexión, middlewares y manejo de errores.
