// traemos la direccion para consultar nuestra api
import { API } from './direccion-api.js'
// useState guarda el estado y useEffect deja ejecutar la consulta a la api
import { useState, useEffect } from 'react'
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

// recibe una publicacion y muestra titulo y estado
function Tarjeta({ publicacion }) {
  return (
    <article className="tarjeta">
      <h2>{publicacion.titulo}</h2>
      <p className="estado">{publicacion.estado}</p>
    </article>
  )
}

function App() {
  // pagina guarda la vista elegida; arranca en 'inicio'
  // setPagina deja cambiarla y actualizar la pantalla
  const [pagina, setPagina] = useState('inicio')

    // Guarda la categoria elegida; vacio significa "todas".
  const [categoria, setCategoria] = useState('')

  // guarda las publicaciones que devuelve la api,, empieza como una lista vacia
  const [publicaciones, setPublicaciones] = useState([])

  // indica si estamos esperando la respuesta de la api
  const [cargando, setCargando] = useState(true)

  // gusrda el mensaje si ocurre un error null significa que no hubo error
  const [error, setError] = useState(null)


  // se ejecuta al abrir la pagina
  useEffect(() => {
        // funcion que va a traer las publicaciones
    async function traer() {
      // enmpezamos un pedido nuevo
      setCargando(true)
      setError(null)
            try {
        // aca se arma el filtro para la direccion del pedido
        const parametros = new URLSearchParams()
        if (categoria) parametros.set('categoria', categoria)
        const respuesta = await fetch(`${API}/publicaciones?${parametros}`)
        if (!respuesta.ok) {
           throw new Error(`La API respondio ${respuesta.status}`)
        }
        setPublicaciones(await respuesta.json())
            } catch (e) {
        setError(e.message)
      } finally {
        setCargando(false)
      }
    }

    traer()
    }, [categoria])

  return (
    <Diseno>
      {/* la funcion de onClick se ejecuta cuando se toca el boton */}
      <button onClick={() => setPagina('inicio')}>
        Inicio
      </button>

      <button onClick={() => setPagina('publicaciones')}>
        Publicaciones
      </button>

      {/* si se toca este boton se cambia la pagina a 'acerca' */}
      <button onClick={() => setPagina('acerca')}>
        Acerca de Gatherly
      </button>

      {/* ssi pagina 'inicio se muestra la bienvenida */}
      {pagina === 'inicio' && (
        <Seccion titulo="Bienvenidos a Gatherly">
          <p>Alquilá lo que necesitás, compartí lo que no usás.</p>
        </Seccion>
      )}

      {/* si pagina publicaciones mostramos esta seccion */}
      {pagina === 'publicaciones' && (
        <Seccion titulo="Publicaciones">
          <form onSubmit={(e) => e.preventDefault()}>
            <label>
            Categoria
            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            >
              <option value="">Todas</option>
              <option value="camping">Camping</option>
              <option value="musica">Música</option>
              <option value="foto-video">Foto y video</option>
              <option value="jardineria">Jardinería</option>
              <option value="herramientas">Herramientas</option>
              <option value="diy">Hacelo vos mismo</option>
              
            </select>
           </label>
              </form>
      {cargando && <p>Cargando...</p>}
      {error && <p>{error}</p>}
      {/* si no hay error mostramos cuantas publicaciones llegaron */}

      {/*si los datos llegan se muestra una tarjeta x publicacion */}
      {!cargando && !error && (
        <div className="grilla">
          <p>{publicaciones.length} publicaciones</p>
          {publicaciones.map((publicacion) => (
            <Tarjeta key={publicacion.id} publicacion={publicacion} />
          ))}
        </div>
      )}

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
