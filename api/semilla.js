import mongoose from "mongoose";
import Publicacion from "./modelos/publicacion.js";
import Usuario from "./modelos/usuario.js";

// conecta a la misma base que usa nuestra app
await mongoose.connect(process.env.MONGODB_URI, {
    dbName: "gatherly"
});

console.log("Semilla conectada a mongoDB");
// busca al USUARIO del ejemplo. si no existe, lo crea
let propietario = await Usuario.findOne({
    email: "usuario.semilla@gatherly.test"
});

if (!propietario) {
    propietario = await Usuario.create({
        nombre: "Usuario de ejemplo",
        email: "usuario.semilla@gatherly.test",
        clave: process.env.SEMILLA_CLAVE_USUARIO,
        rol: "usuario"
    });
}

// lo mismo pero ahora busca al ADMIN de ejemplo. si no existe, lo crea
let admin = await Usuario.findOne({
    email: "admin.semilla@gatherly.test"
});

if (!admin) {
    admin = await Usuario.create({
        nombre: "Admin de ejemplo",
        email: "admin.semilla@gatherly.test",
        clave: process.env.SEMILLA_CLAVE_ADMIN,
        rol: "admin"
    });
}


// datos de ejemplo para cargar en la base //

const publicaciones = [{

    propietario: propietario._id,
    codigo: "SEM-CAM-0001",
    titulo: "Cámara Analógica Kodak VR35",
    descripcion: "Alquilo cámara original de 1986. Perfecta para shootings con estetica granulada y colores autenticos. El alquiler NO incluye rollo ni revelado.",
    categoria: "foto-video",
    precioPorDia: 10000,
    requiereDeposito: true,
    deposito: 20000,
    estado: "disponible", 
}, 

{
    propietario: propietario._id,
    codigo: "SEM-MUS-0002",
    titulo: "Parlante potenciado JBL",
    descripcion: "Alquilo bafle portátil, sonido genial y graves potentes. Incluye luces LED rítmicas y micrófono para karaoke, ideal para tus juntadas de finde. Lo entrego con carga completa y cables en lugar a coordinar, devolver en mismas condiciones.",
    categoria: "musica",
    precioPorDia: 25000,
    requiereDeposito: true,
    deposito: 45000,
    estado: "disponible"
},

{
    propietario: propietario._id,
    codigo: "SEM-JAR-0003",
    titulo: "Hidrolavadora Karcher",
    descripcion: "Usala para limpiar a fondo las baldosas de tu patio, la vereda, saacar el musgo de las paredes o lavar el auto el fin de semana. Gran presión y bajo consumo de agua. Coordinamos el retiro en CABA y GBA Sur!",
    categoria: "jardineria",
    precioPorDia: 12000,
    requiereDeposito: false,
    deposito: 0,
    estado: "disponible"
}

];

let creadas = 0;

for (const datos of publicaciones) {
    const existente = await Publicacion.findOne({ codigo: datos.codigo });

    if (existente) {
        // si ya estaba guardada, le agrega el propietario que le faltaba
        if (!existente.propietario) {
            existente.propietario = propietario._id;
            await existente.save();
        }
    } else {
        // si no estaba guardada, la crea
        await Publicacion.create(datos);
        creadas += 1;
    }
}

console.log(`Se crearon ${creadas} publicaciones de ejemplo`);

// cierraconexion al terminar
await mongoose.disconnect();
