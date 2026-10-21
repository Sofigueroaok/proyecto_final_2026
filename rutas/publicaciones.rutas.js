import { Router } from "express";
import * as controlador from "../controladores/publicaciones.controlador.js"; // exportamos el controlador aca

export const rutasDePublicaciones = Router();

rutasDePublicaciones.get("/", controlador.listar); 
rutasDePublicaciones.post("/", controlador.crear);
