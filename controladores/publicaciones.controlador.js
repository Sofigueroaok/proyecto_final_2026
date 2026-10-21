import * as servicio from "../servicios/publicaciones.servicio.js";

export async function listar(req, res) {
    res.json(await servicio.listar(req.query));
}

export async function obtener(req, res) {
    res.json(await servicio.obtener(req.params.id));
} // pide al servicio una publicacion por su id y manda el resultado al usuario cuando lo obtiene

export async function crear(req, res) {
    const nuevo = await servicio.crear(req.body ?? {});
    res.status(201).location(`/api/publicaciones/${nuevo.id}`).json(nuevo); // 201 created
} // controlador recibe los datos del usuario, le pide al servicio que cree la publicación y cuando servicio responde, manda el resultado con el codigo 201

export async function modificar(req, res) {
    res.json(await servicio.modificar(req.params.id, req.body ?? {}));
} // recibe el id y los cambios, pide al servicio que modifique y despues envia el resultado

export async function eliminar(req, res) {
    await servicio.eliminar(req.params.id);
    res.status(204).end(); // 204 no content
} // pide al servicio que borre la publicación y responde sin enviar datos

