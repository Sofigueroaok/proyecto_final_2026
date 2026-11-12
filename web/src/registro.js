import { useState } from "react";
import { API } from "./direccion-api.js";

function Registro() {
  const [formulario, setFormulario] = useState({
    nombre: "",
    email: "",
    password: ""
  });

  const [mensaje, setMensaje] = useState("");

  function cambiar(e) {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value
    });
  }

  async function registrar(e) {
    e.preventDefault();

    setMensaje("");

    const respuesta = await fetch(
      `${API}/auth/registro`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formulario)
      }
    );

    const datos = await respuesta.json();

    if (!respuesta.ok) {
      setMensaje(datos.error);
      return;
    }

    setMensaje("Usuario registrado correctamente");
  }

  return (
    <form onSubmit={registrar}>
      <h2>Crear cuenta</h2>

      <input
        name="nombre"
        placeholder="Nombre"
        value={formulario.nombre}
        onChange={cambiar}
      />

      <input
        name="email"
        type="email"
        placeholder="Email"
        value={formulario.email}
        onChange={cambiar}
      />

      <input
        name="password"
        type="password"
        placeholder="Contraseña"
        value={formulario.password}
        onChange={cambiar}
      />

      <button type="submit">
        Registrarme
      </button>

      {mensaje && <p>{mensaje}</p>}
    </form>
  );
}

export default Registro;