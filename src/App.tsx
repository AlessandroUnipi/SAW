import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './styles/App.css'
import PaginaCorsi from './components/PaginaCorsi'
import HomePage from './components/PaginaPrincipale'

function App() {
  //const [count, setCount] = useState(0)

  return (
    <div>
      <HomePage />
      <main className="pt-16">
        <h1 className="text-3xl font-bold text-center mt-8">Benvenuto su SAW</h1>
      </main>
    </div>
  );
}

export default App
