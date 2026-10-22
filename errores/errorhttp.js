export class ErrorHttp extends Error {
    constructor(estado, mensaje, detalle) {
        super(mensaje);
        this.name = "ErrorHttp";
        this.estado = estado;
        this.detalle = detalle;
    }

    static noAutorizado(mensaje = 'No autorizado') {
        return new ErrorHttp(401, mensaje);
    }

    static noEncontrado(mensaje = "Recurso no encontrado", detalle) {
    return new ErrorHttp(404, mensaje, detalle);
}

    static peticionInvalida(mensaje, detalle) { // prepara un error 400 cuando el pedido está incompleto o mal armado (para put)
        return new ErrorHttp(400, mensaje, detalle);
}

    static conflicto(mensaje, detalle) { // error 409 cuando la accion no se permite por el estado actual
        return new ErrorHttp(409, mensaje, detalle); 
}


}