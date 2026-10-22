import { ErrorHttp } from '../errores/ErrorHttp.js';

export function soloAdmin(req, res, next) {
  if (req.get('X-Clave') !== config.claveAdmin) {
    return next(ErrorHttp.noAutorizado('Falta el encabezado X-Clave o es incorrecto'));
  }
  next();
}
