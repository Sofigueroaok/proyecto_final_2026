export function manejadorDeErrores(err, req, res, next) {
  if (res.headersSent) return next(err);

  let estado = err.estado ?? 500;
  let mensaje = err.message;
  let detalle = err.detalle;

  if (err.name === 'CastError') {
    estado = 400;
    mensaje = 'ID o dato con formato inválido';
  } else if (err.name === 'ValidationError') {
    estado = 422;
    mensaje = 'Los datos no cumplen las validaciones';
    detalle = Object.values(err.errors).map(error => error.message);
  } else if (err.code === 11000) {
    estado = 409;
    mensaje = 'Ya existe una publicación con ese código';
  }

  if (estado >= 500) {
    console.error(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    console.error(err.stack);
  }

  res.status(estado).json({
    error: estado >= 500 ? 'Error interno del servidor' : mensaje,
    ...(estado < 500 && detalle !== undefined ? { detalle } : {})
  });
}
