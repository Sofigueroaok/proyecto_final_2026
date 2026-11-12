import jwt from "jsonwebtoken";

import Usuario, { verificar } from "../modelos/usuario.js";
import { ErrorHttp } from "../errores/errorhttp.js";

export async function registrar({ nombre, email, clave }) {
  if (!nombre || !email || !clave) {
    throw ErrorHttp.peticionInvalida(
      "Nombre, email y contraseña son obligatorios"
    );
  }

  const emailNormalizado = email.trim().toLowerCase();

  const existente = await Usuario.findOne({
    email: emailNormalizado
  });

  if (existente) {
    throw ErrorHttp.conflicto(
      "Ya existe un usuario con ese email"
    );
  }

  const usuario = await Usuario.create({
    nombre: nombre.trim(),
    email: emailNormalizado,
    clave,
    rol: "usuario"
  });

  return {
    id: usuario.id,
    nombre: usuario.nombre,
    email: usuario.email,
    rol: usuario.rol
  };
}

export async function login({ email, clave }) {
  if (!email || !clave) {
    throw ErrorHttp.peticionInvalida(
      "Email y contraseña son obligatorios"
    );
  }

  const emailNormalizado = email.trim().toLowerCase();

  const usuario = await Usuario.findOne({
    email: emailNormalizado
  }).select("+clave");

  const valida = usuario !== null && await verificar(clave, usuario.clave);
  if (!valida) {
    throw ErrorHttp.noAutorizado(
      "Email o contraseña incorrectos"
    );
  }

  const token = jwt.sign(
    {
      sub: usuario.id,
      rol: usuario.rol
    },
    process.env.JWT_SECRETO,
    {
      expiresIn: "2h"
    }
  );

  return {
    token,
    usuario: {
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol
    }
  };
}
