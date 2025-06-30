import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Login from './pages/login/login.jsx'
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom'
import Cadastro from './pages/register/register.jsx'
import Header from './components/header.jsx'
import MenuLateral from './components/menuLateral/menuLateral.jsx'
import Admin from './pages/dashboard/admin/admin.jsx'
import TabelaUsuarios from './components/tables/usuarios.jsx'
import Dashboard from './pages/dashboard/dashboard.jsx'
import Ask from './pages/gemini/gemini/gemini.jsx'
import Programacao from './pages/dashboard/instalacoes.jsx'
import Clientes from './pages/dashboard/clientes.jsx'
import Orcamentos from './pages/dashboard/orcamentos.jsx'
import Pedidos from './pages/dashboard/pedidos.jsx'
import Manutencoes from './pages/dashboard/manutencoes.jsx'


function App() {
  return (
    <Router>
      <Routes>
        {/* Rotas sem layout */}
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/ask" element={<Ask />} />

        {/* Rotas com layout */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/programacao" element={<Programacao />} />
          <Route path="/orcamentos" element={<Orcamentos />} />
          <Route path="/pedidos" element={<Pedidos />} />
          <Route path="/manutencao" element={<Manutencoes />} />
          <Route path="/clientes" element={<Clientes />} />
        
      


        </Route>
      </Routes>
    </Router>
  );
}

function Layout() {
  return (
     <div className="layout-container">
      <Header />
      <main className="layout-content-container">
        <MenuLateral />

        <Outlet />

      </main>
    </div>
  );
}



export default App;


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
