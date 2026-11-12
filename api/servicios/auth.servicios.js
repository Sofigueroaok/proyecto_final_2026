import crypto from "node:crypto";
import { promisify } from "node:util";
import jwt from "jsonwebtoken";

import Usuario from "../modelos/usuario.js";
import { ErrorHttp } from "../errores/errorhttp.js";

const scrypt = promisify(crypto.scrypt);

const LONGITUD_SALT = 16;
const LONGITUD_HASH = 64;

async function generarHash(password, salt) {
  const resultado = await scrypt(
    password,
    salt,
    LONGITUD_HASH
  );

  return resultado.toString("hex");
}

export async function registrar({ nombre, email, password }) {
  if (!nombre || !email || !password) {
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

  const salt = crypto.randomBytes(LONGITUD_SALT).toString("hex");

  const passwordHash = await generarHash(
    password,
    salt
  );

  const usuario = await Usuario.create({
    nombre: nombre.trim(),
    email: emailNormalizado,
    passwordHash,
    salt,
    rol: "usuario"
  });

  return {
    id: usuario.id,
    nombre: usuario.nombre,
    email: usuario.email,
    rol: usuario.rol
  };
}

export async function login({ email, password }) {
  if (!email || !password) {
    throw ErrorHttp.peticionInvalida(
      "Email y contraseña son obligatorios"
    );
  }

  const emailNormalizado = email.trim().toLowerCase();

  const usuario = await Usuario.findOne({
    email: emailNormalizado
  }).select("+passwordHash +salt");

  if (!usuario) {
    throw ErrorHttp.noAutorizado(
      "Email o contraseña incorrectos"
    );
  }

  const hashCalculado = await generarHash(
    password,
    usuario.salt
  );

  const hashOriginal = Buffer.from(
    usuario.passwordHash,
    "hex"
  );

  const hashNuevo = Buffer.from(
    hashCalculado,
    "hex"
  );

  const coincide =
    hashOriginal.length === hashNuevo.length &&
    crypto.timingSafeEqual(
      hashOriginal,
      hashNuevo
    );

  if (!coincide) {
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