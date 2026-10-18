import mongoose from "mongoose";
const publicacionEsquema = new mongoose.Schema({

    codigo: {
        type: String,
        required: true, 
        unique: true, // para que el codigo sea unico y no se repita en otros productos
        trim: true
    },

    titulo: {
        type: String,
        required: true, // verifica que el dato sea obligaotorio
        maxlength: 200, // maximo 200 caracteres
        trim: true // limpia los espacios sobrantes de un texto del principio y del final para que no pase algo asi "   Taladro          "
    },

    descripcion: {
        type: String,
        required: true,
        minlength: 50, // verifica longitud minima
        maxlength: 1500,
        trim: true
    },

    categoria: {
        type: String,
        required: true,
        enum: [ // bloquea o restringe los valores permitidos para un campo 
            "camping",
            "musica",
            "foto-video",
            "jardineria",
            "herramientas",
            "diy"
        ],
        trim: true
    },

    precioPorDia: {
        type: Number,
        required: true,
        min: 500 // el precio minimo permitido es 500 por dia, osea que valida que el precio sea mayor o igual a 500
    },

    requiereDeposito: {
        type: Boolean, 
        default: false, // si al crear la publicacion, el usuario no especifica si requiere deposito, se le asigna false automaticammente
    }, 

    deposito: { 
        type: Number, 
        min: 0, // NO depositos negativos, +0
        default: 0 // si el usuario no indica monto, moongose asigna 0 
    }, 

    estado: {
        type: String, 
        enum: ["disponible", "alquilado"],
        default: "disponible",
        trim: true
    },

},  {
        timestamps: true, // guarda 2 fechas que serian createAt (cuando se creo la publicacion) updatedAt (ultima modificacion)
        toJSON: {
            versionKey: false,
            transform(documento, plano) {
                const { _id, ...resto } = plano; // separa el _id de los demas campos 
                return {id: _id.toString(), ...resto }; // devuelve el id como texto y tmb los demas campos 
            }
        }

});

const Publicacion = mongoose.model("Publicacion", publicacionEsquema, "publicaciones"); // le pedimos a mongoose que cree un modelo con moongoose.model, dandole el nombre "publicacion" y llamando al esquena que construimos
export default Publicacion; // exportamos asi otros archivos del proyecto pueden usar este modelo()
