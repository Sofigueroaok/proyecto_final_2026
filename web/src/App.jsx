// traemos useState de react para guardar y actualizar el estado
import { useState } from 'react'
import './App.css'

// diseno recibe en children el contenido q esta puesto entre sus etiquetas
function Diseno({ children }) {
  return (
    <div className="contenedor">
      <header>
        <h1>Gatherly</h1>
      </header>

      {/* aca aparece el contenido que recibe Diseno. */}
      <main>{children}</main>

      <footer>Gatherly · Aplicaciones Híbridas</footer>
    </div>
  )
}

// seccion recibe dos props, q serian el titulo y el contenido de adentro
function Seccion({ titulo, children }) {
  return (
    <section className="seccion">
      <h2>{titulo}</h2>
      {children}
    </section>
  )
}

function App() {
  // pagina guarda la vista elegida; arranca en 'inicio'
  // setPagina deja cambiarla y actualizar la pantalla
  const [pagina, setPagina] = useState('inicio')

  return (
    <Diseno>
      {/* la funcion de onClick se ejecuta cuando se toca el boton */}
      <button onClick={() => setPagina('inicio')}>
        Inicio
      </button>

      <button onClick={() => setPagina('publicaciones')}>
        Publicaciones
      </button>

      {/* si se toca este boton se cambia la pagina a 'acerca'. */}
      <button onClick={() => setPagina('acerca')}>
        Acerca de Gatherly
      </button>

      {/* ssi pagina 'inicio', se muestra la bienvenida */}
      {pagina === 'inicio' && (
        <Seccion titulo="Bienvenidos a Gatherly">
          <p>Alquilá lo que necesitás, compartí lo que no usás.</p>
        </Seccion>
      )}

      {/* si pagina 'publicaciones', mostramos esta seccion */}
      {pagina === 'publicaciones' && (
        <Seccion titulo="Publicaciones">
          <p>Aca vamos a mostrar los objetos para alquilar.</p>
        </Seccion>
      )}

      {/* esta parte solko aparece cuando se ve la pantalla 'acerca'. */}
      {pagina === 'acerca' && (
        <Seccion titulo="Acerca de Gatherly">
          <p>
          Gatherly conecta a personas que quieren prestar o alquilar objetos durante un tiempo.
          Encontrá lo que necesitás y compartí lo que ya tenés. 
          </p>
          <p>
            Proyecto de Selena García y Sofía Figueroa para
            Aplicaciones Hibridas de ISEC.
          </p>
        </Seccion>
      )}

      
    </Diseno>
  )
}

// hace que main.jsx importe y muestre App.
export default App
