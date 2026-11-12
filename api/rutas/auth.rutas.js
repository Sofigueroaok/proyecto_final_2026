import { Router } from "express";
import * as controlador from "../controladores/auth.controlador.js";

export const rutasAuth = Router();

rutasAuth.post("/registro", controlador.registrar);
rutasAuth.post("/login", controlador.login);