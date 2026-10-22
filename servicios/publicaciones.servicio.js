import Publicacion from "../modelos/publicacion.js";
import { ErrorHttp } from "../errores/ErrorHttp.js";

export async function listar({ categoria, estado, requiereDeposito } = {}) {
    
    const filtro = {}; // condiciones de la busqueda

    if (categoria) {
        filtro.categoria = categoria;
    } // si el usuario pido una categoria, busca solo publicaciones de esa categoria

     if (estado) {
        
        filtro.estado = estado;
    } // si pidieron un estado, busca solo eso si esta disponible o alquilado

    if (requiereDeposito === "true") {
        filtro.requiereDeposito = true;
    } // si filtraron por deposito busca las que lo requieren

    if (requiereDeposito === "false") {
        filtro.requiereDeposito = false;
    } // si filtraron sin deposito busca las que no lo requieren

    // le pide a mongodb las publicaciones que filtramos
    return Publicacion.find(filtro);
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

export async function alquilar(id) { // existe esta publicacion y esta diisponible para alquilar?
    // busca esa publicacion solo si esta disponible y la pasa a alquilada
    const publicacion = await Publicacion.findOneAndUpdate(
        { _id: id, estado: "disponible" },
        { estado: "alquilado" },
        { returnDocument: "after", runValidators: true }
    );

    if (!publicacion) {
        // comprueba si existe, 'obtener' ya avisa con 404 si no existe
        await obtener(id);

        // si existe pero ya no esta disponible, avisa con 409
        throw ErrorHttp.conflicto("Esta publicación ya está alquilada", { id });
    }

    // devuelve la publicacion con el estado actualizado
    return publicacion;
}