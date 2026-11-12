import jwt from "jsonwebtoken";
import { ErrorHttp } from "../errores/errorhttp.js";

export function autenticado(req, res, next) {
  const encabezado = req.get("Authorization");

  if (!encabezado) {
    return next(
      ErrorHttp.noAutorizado("Se requiere iniciar sesión")
    );
  }

  const [tipo, token] = encabezado.split(" ");

  if (tipo !== "Bearer" || !token) {
    return next(
      ErrorHttp.noAutorizado("Token inválido")
    );
  }

  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRETO
    );

    req.usuario = payload;

    next();
  } catch {
    next(
      ErrorHttp.noAutorizado("Token inválido o vencido")
    );
  }
}