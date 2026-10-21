import * as servicio from "../servicios/publicaciones.servicio.js";

export async function listar(req, res) {
    res.json(await servicio.listar(req.query));
}

export async function crear(req, res) {
    const nuevo = await servicio.crear(req.body ?? {});
    res.status(201).location(`/api/publicaciones/${nuevo.id}`).json(nuevo);
} // controlador recibe los datos del usuario, le pide al servicio que cree la publicación y cuando servicio responde, manda el resultado con el codigo 201

