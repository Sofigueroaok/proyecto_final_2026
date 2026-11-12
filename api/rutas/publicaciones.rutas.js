import { Router } from "express";
import * as controlador from "../controladores/publicaciones.controlador.js";
import { soloAdmin } from "../middlewares/soloAdmin.js"; // importamos el controlador aca
import { autenticado } from "../middlewares/autenticado.js";

export const rutasDePublicaciones = Router();

rutasDePublicaciones.get("/", controlador.listar);
rutasDePublicaciones.get("/:id", controlador.obtener); // recibe un get con un id y llama a 'obtener' del controlador
rutasDePublicaciones.post("/", autenticado, controlador.crear);
rutasDePublicaciones.patch("/:id", autenticado, controlador.modificar); // cuando llega un patch con un id, llama a 'modificar' del controlador
rutasDePublicaciones.post("/:id/alquilar", autenticado, controlador.alquilar); // cuando llega un post para alquilar, llama a 'alquilar ' del controlador
rutasDePublicaciones.delete("/:id", autenticado, soloAdmin, controlador.eliminar); // cuando llega un DELETE con un id, llama a 'eliminar' del controlador


