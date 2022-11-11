import './App.css'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import BarraDeNavegação from './Components/Navbar'
import Rodapé from'./Components/Footer'
import Home from './Routes/Home';
import Cadastro from './Routes/Cadastro';
import Listagem from './Routes/Listagem';
import Registro from './Routes/Registro';
import Login from './Routes/Login';
import ModificarCadastro from './Routes/ModificarCadastro'
import Denuncia from './Routes/Denuncia';


function App() {
  return (
    <Router>
    <BarraDeNavegação />
    <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/listagem" element={<Listagem />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/modificardenuncia" element={<ModificarCadastro />} />
      <Route path='/denuncia' element={<Denuncia />} />
    </Routes>


    <Rodapé />
    </Router>
  )
}

export default App
