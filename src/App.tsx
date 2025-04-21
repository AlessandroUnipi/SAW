import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './styles/App.css'
import Header from './components/Header'

function App() {
  //const [count, setCount] = useState(0)

  return (
    <div>
      <Header />
      <main className="pt-16">
        <h1 className="text-3xl font-bold text-center mt-8">Benvenuto su SAW</h1>
      </main>
    </div>
  );
}

export default App
