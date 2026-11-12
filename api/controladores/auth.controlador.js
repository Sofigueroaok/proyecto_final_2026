import * as servicioAuth from "../servicios/auth.servicios.js";

// crear un nuevo usuario
export async function registrar(req, res, next) {
  try {
    const usuario = await servicioAuth.registrar(req.body);
    res.status(201).json(usuario);
  } catch (error) {
    next(error);
  }
}

// buscar un usuario por su correo electrónico y contraseña
export async function login(req, res, next) {
  try {
    const resultado = await servicioAuth.login(req.body);
    res.json(resultado);
  } catch (error) {
    next(error);
  }
}