
import './styles/App.css'
import { BrowserRouter , Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Calendario from './pages/Calendario';
import Header from './components/Header';

function App() {
  return (
    <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Calendario/:id" element={<Calendario />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;