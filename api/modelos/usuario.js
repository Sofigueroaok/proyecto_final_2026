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
    rol: {
        type: String,
        enum: ["usuario", "admin"],
        default: "usuario"
    }
});

const Usuario = mongoose.model("Usuario", usuarioEsquema, "usuarios");
export default Usuario;