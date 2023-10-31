import './App.css'
import { Routes, Route, useLocation } from 'react-router-dom'
import Landing from './Views/Landing/Landing'
import Home from './Views/Home/Home'
import Detail from './Views/Details/Detail'
import Create from './Views/Create/Create'
import Navbar from './Components/Navbar/Navbar'
import Footer from './Components/Footer/Footer'

function App() {
  const location = useLocation();

  // Comprueba si la ruta actual es "/home"
  const isHomeRoute = location.pathname === '/home';

  return (
    <div>
      {!isHomeRoute && <Navbar />}
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/details/:id" element={<Detail />} />
        <Route path='/create' element={<Create />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

