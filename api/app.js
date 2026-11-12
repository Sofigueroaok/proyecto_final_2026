import cors from 'cors';
import express from 'express';
import { rutasDePublicaciones } from "./rutas/publicaciones.rutas.js"; //traemos al grupo de rutas q creamos
import { rutasAuth } from "./rutas/auth.rutas.js";
import { registro } from './middlewares/registro.js';
import { noEncontrado } from './middlewares/noEncontrado.js';
import { manejadorDeErrores } from './middlewares/manejadorDeErrores.js';

const app = express();

app.use(registro);
//  permite que react lea la api desde las direcciones del .env
app.use(cors({ origin: process.env.ORIGENES_PERMITIDOS.split(',') }));
app.use(express.json());

app.get('/api/salud', (req, res) => {
    res.json({ estado: 'ok', hora: new Date().toISOString() });
});

app.use("/api/auth", rutasAuth);
app.use("/api/publicaciones", rutasDePublicaciones); // aca indicamos donde usar las rutas
app.use(noEncontrado);
app.use(manejadorDeErrores);

export default app;

