import Publicacion from "../modelos/publicacion.js";

export async function listar() { // function listar es la que busca todas las publicaciones y devuelve el resultado
    return Publicacion.find();
}

export async function crear(datos) { //recibe los datos, se fija si coinciden con nuestro esquema y guarda la nueva publi en mongo
    return Publicacion.create(datos);
}