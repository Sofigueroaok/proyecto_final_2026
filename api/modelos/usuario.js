import { randomBytes, scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import mongoose from "mongoose";

const scryptAsync = promisify(scrypt);

async function hashear(clave) {
    const sal = randomBytes(16);
    const derivada = await scryptAsync(clave, sal, 64);
    return `${sal.toString("hex")}:${derivada.toString("hex")}`;
}

export async function verificar(clave, guardado) {
    const [salHex, derivadaHex] = guardado.split(":");
    const sal = Buffer.from(salHex, "hex");
    const esperada = Buffer.from(derivadaHex, "hex");
    const calculada = await scryptAsync(clave, sal, 64);
    return timingSafeEqual(esperada, calculada);
}

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

    clave: {
        type: String,
        required: true,
        minlength: 8,
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
            const { _id, clave, ...resto } = plano;

            return {
                id: _id.toString(),
                ...resto
            };
        }
    }
});

usuarioEsquema.pre("save", async function () {
    if (!this.isModified("clave")) return;
    this.clave = await hashear(this.clave);
});

const Usuario = mongoose.model("Usuario", usuarioEsquema, "usuarios");


export default Usuario;
