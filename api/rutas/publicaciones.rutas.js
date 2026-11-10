import { Router } from "express";
import * as controlador from "../controladores/publicaciones.controlador.js";
import { soloAdmin } from "../middlewares/soloAdmin.js"; // importamos el controlador aca

export const rutasDePublicaciones = Router();

rutasDePublicaciones.get("/", controlador.listar);
rutasDePublicaciones.get("/:id", controlador.obtener); // recibe un get con un id y llama a 'obtener' del controlador
rutasDePublicaciones.post("/", controlador.crear);
rutasDePublicaciones.patch("/:id", controlador.modificar); // cuando llega un patch con un id, llama a 'modificar' del controlador
rutasDePublicaciones.post("/:id/alquilar", controlador.alquilar); // cuando llega un post para alquilar, llama a 'alquilar ' del controlador
rutasDePublicaciones.delete("/:id", soloAdmin, controlador.eliminar); // cuando llega un DELETE con un id, llama a 'eliminar' del controlador


