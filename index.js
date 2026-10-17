import mongoose from "mongoose"; // biblioteca para que podamos comunicarnnos con mongodb
import app from "./app.js"; // traemos la app express

const puerto = Number(process.env.PUERTO); // lee el puerto desde archivo .env
try { // trata de conectar mongodb e iniciar el servidor

await mongoose.connect(process.env.MONGODB_URI, {
  dbName: "gatherly"
});  // no continuar con la siguiente instruccion 

console.log("Conectado a MongoDB Atlas"); 

app.listen(puerto, () => {
  console.log("Servidor funcionando");

});

} catch (error) { // si es que algo falla, va a mostrar el error
  console.error ("Error al iniciar:", error.message);
  process.exit(1); // cierra el programa xq encontro un error
}
