import { ErrorHttp } from '../errores/errorhttp.js';

export function soloAdmin(req, res, next) {
  const clave = process.env.CLAVE_ADMIN;
  if (!clave || req.get('X-Clave') !== clave) {
    return next(ErrorHttp.noAutorizado('Falta el encabezado X-Clave o es incorrecto'));
  }
  next();
}
