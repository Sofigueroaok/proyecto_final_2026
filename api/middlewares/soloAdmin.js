import { ErrorHttp } from "../errores/errorhttp.js";

export function soloAdmin(req, res, next) {
  if (!req.usuario) {
    return next(
      ErrorHttp.noAutorizado("Se requiere iniciar sesión")
    );
  }

  if (req.usuario.rol !== "admin") {
    return next(
      ErrorHttp.prohibido(
        "No tenés permisos para realizar esta acción"
      )
    );
  }

  next();
}
