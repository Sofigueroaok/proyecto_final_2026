import {producto} from '../datos.js';
export function manejadorDeErrores(err, req, res, next) {
  const estado = err.estado ?? 500;

  if (estado >= 500) {
    console.error(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    console.error(err.stack);
  }

  res.status(estado).json({
    error: estado >= 500 ? 'Error interno del servidor' : err.message,
    detalle: estado >= 500 ? undefined : err.detalle,
    stack: estado >= 500 && !esProduccion ? err.stack : undefined,
  });
}
