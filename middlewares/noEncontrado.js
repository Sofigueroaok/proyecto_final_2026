import { ErrorHttp } from '../errores/errorhttp.js';

export function noEncontrado(req, res, next) {
  next(ErrorHttp.noEncontrado('Ruta no encontrada', { ruta: req.originalUrl }));
}
