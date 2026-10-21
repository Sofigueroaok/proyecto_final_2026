import Publicacion from "../modelos/publicacion.js";
import { ErrorHttp } from "../errores/ErrorHttp.js";

export async function listar() { // function listar es la que busca todas las publicaciones y devuelve el resultado
    return Publicacion.find();
}

export async function crear(datos) { //recibe los datos, se fija si coinciden con nuestro esquema y guarda la nueva publi en mongo
    return Publicacion.create(datos);
}

export async function obtener(id) {
    const publicacion = await Publicacion.findById(id);

    if (!publicacion) { // si no encuentra la publicacion avisa que no existe
        throw ErrorHttp.noEncontrado("No existe esa publicación", { id });
    }

    return publicacion;
}

export async function modificar(id, cambios) { // le llega el id de la publicacion y los datos que queremos cambiar
    const publicacion = await Publicacion.findByIdAndUpdate(id, cambios, {
        returnDocument: "after", // devuelve la publiccacion en cuestion despues de modificarla
        runValidators: true // aca comprueba que los cambios cumplan las reglas del esquema 
    });

    if (!publicacion) {   
        throw ErrorHttp.noEncontrado("No existe esa publicación", { id });
    }

    return publicacion; // entrega la publicacion actualizada al controlador
}


export async function eliminar(id) { // busca la publicacion por su id y la borra de mongodb
    const publicacion = await Publicacion.findByIdAndDelete(id);

    if (!publicacion) {
        throw ErrorHttp.noEncontrado("No existe esa publicación", { id });
    }
}