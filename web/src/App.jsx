import './App.css'

function Diseno({ children }) {
  return (
    <div className="contenedor">
      <header>
        <h1>Gatherly</h1>
      </header>

      <main>{children}</main>

      <footer>Gatherly · Aplicaciones Híbridas</footer>
    </div>
  )
}

function App() {
  return (
    <Diseno>
      <p>Alquilá lo que necesitás, compartí lo que no usás.</p>
    </Diseno>
  )
}

export default App