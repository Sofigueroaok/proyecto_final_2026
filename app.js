import express from 'express';
import { rutasDePublicaciones } from "./rutas/publicaciones.rutas.js"; //traemos al grupo de rutas q creamos

const app = express();

app.use(express.json());

app.get('/api/salud', (req, res) => {
    res.json({ estado: 'ok', hora: new Date().toISOString() });
});

app.use("/api/publicaciones", rutasDePublicaciones); // aca indicamos donde usar las rutas

export default app;

