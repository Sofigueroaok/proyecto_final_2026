import mongoose from "mongoose";
import Publicacion from "./modelos/publicacion.js";

// conecta a la misma base que usa nuestra app
await mongoose.connect(process.env.MONGODB_URI, {
    dbName: "gatherly"
});

console.log("Semilla conectada a mongoDB");

// datos de ejemplo para cargar en la base //

const publicaciones = [{
    
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

// guarda las publi de la lista en mongoDB
const creadas = await Publicacion.insertMany(publicaciones);

// muestra cuantas publicaciones se guardaron
console.log(`Se crearon ${creadas.length} publicaciones de ejemplo`);

// cierraconexion al terminar
await mongoose.disconnect();
