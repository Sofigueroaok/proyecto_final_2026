export class ErrorHttp extends Error {
    constructor(estado, mensaje, detalle) {
        super(mensaje);
        this.name = "ErrorHttp";
        this.estado = estado;
        this.detalle = detalle;
    }

    static noEncontrado(mensaje = "Recurso no encontrado", detalle) {
    return new ErrorHttp(404, mensaje, detalle);
}

}

