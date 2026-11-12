import mongoose from "mongoose";
const usuarioEsquema = new mongoose.Schema({
    
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },

    contrasena: {
        type: String,
        required: true,
        select: false
    },

    salt: {
        type: String,
        select: false
    },

    rol: {
        type: String,
        enum: ["usuario", "admin"],
        default: "usuario"
    }
},
{
    timestamps: true,
    toJSON: {
        versionKey: false,
        transform: (doc, plano) => {
            const { _id, contrasena, salt, ...resto } = plano;

            return {
                id: _id.toString(),
                ...resto
            };
        }
    }
});

const Usuario = mongoose.model("Usuario", usuarioEsquema, "usuarios");


export default Usuario;