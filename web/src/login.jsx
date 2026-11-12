import { useState } from "react";
import { API } from "./direccion-api.js";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [clave, setClave] = useState("");
  const [error, setError] = useState("");

  async function ingresar(e) {
    e.preventDefault();

    setError("");

    const respuesta = await fetch(
      `${API}/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          clave
        })
      }
    );

    const datos = await respuesta.json();

    if (!respuesta.ok) {
      setError(datos.error);
      return;
    }

    localStorage.setItem(
      "token",
      datos.token
    );

    onLogin(datos.usuario);
  }

  return (
    <form onSubmit={ingresar}>
      <input
        type="email"
        placeholder="Email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Contraseña"
        required
        value={clave}
        onChange={(e) => setClave(e.target.value)}
      />

      <button type="submit">
        Ingresar
      </button>

      {error && <p>{error}</p>}
    </form>
  );
}

export default Login;
