import { ErrorHttp } from '../errores/errorHttp.js';

export function noEncontrado(req, res, next) {
  next(ErrorHttp.noEncontrado('Ruta no encontrada', { ruta: req.originalUrl }));
}
