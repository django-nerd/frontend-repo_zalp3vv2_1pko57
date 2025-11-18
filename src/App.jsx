import { useEffect } from 'react'
import { Link, Routes, Route, useNavigate } from 'react-router-dom'
import { User, Calendar, LogIn, LogOut, Scissors, Phone, MapPin, Clock, Mail } from 'lucide-react'
import HomePage from './components/HomePage'
import PricesPage from './components/PricesPage'
import ContactPage from './components/ContactPage'
import AuthPage from './components/AuthPage'
import BookingPage from './components/BookingPage'
import ProfilePage from './components/ProfilePage'
import AdminPage from './components/AdminPage'

const BackendURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur bg-white/70 border-b border-black/5">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-black">
          <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center"><Scissors size={16} /></div>
          <span className="tracking-tight text-lg font-semibold">Atelier Salon</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm text-neutral-700">
          <Link to="/" className="hover:text-black">Inicio</Link>
          <Link to="/precios" className="hover:text-black">Precios</Link>
          <Link to="/contacto" className="hover:text-black">Contacto</Link>
          <Link to="/reservar" className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full hover:bg-neutral-800 transition"><Calendar size={16}/> Reservar</Link>
          <Link to="/auth" className="inline-flex items-center gap-2 text-black px-3 py-2 rounded-full border border-black/10 hover:bg-black/5"><LogIn size={16}/> Acceder</Link>
        </nav>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="border-t border-black/10 mt-20">
      <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10 text-sm text-neutral-600">
        <div>
          <div className="flex items-center gap-2 mb-4 text-black">
            <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center"><Scissors size={16} /></div>
            <span className="tracking-tight font-semibold">Atelier Salon</span>
          </div>
          <p>Estilo minimalista, resultados impecables. Cuidamos tu imagen con precisión.</p>
        </div>
        <div>
          <h4 className="text-black font-medium mb-3">Contacto</h4>
          <ul className="space-y-2">
            <li className="flex items-center gap-2"><Phone size={16}/> +34 600 000 000</li>
            <li className="flex items-center gap-2"><Mail size={16}/> hola@ateliersalon.com</li>
            <li className="flex items-center gap-2"><Clock size={16}/> Lun-Sáb, 10:00 - 20:00</li>
            <li className="flex items-center gap-2"><MapPin size={16}/> Calle Principal 123, Madrid</li>
          </ul>
        </div>
        <div>
          <h4 className="text-black font-medium mb-3">Reserva</h4>
          <p className="mb-3">Agenda tu cita en línea en pocos pasos.</p>
          <Link to="/reservar" className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full hover:bg-neutral-800 transition"><Calendar size={16}/> Reservar cita</Link>
        </div>
      </div>
      <div className="text-center text-neutral-500 text-xs pb-8">© {new Date().getFullYear()} Atelier Salon. Todos los derechos reservados.</div>
    </footer>
  )
}

function Layout() {
  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <Navbar />
      <main className="pt-20">
        <Routes>
          <Route index element={<HomePage backendUrl={BackendURL} />} />
          <Route path="/precios" element={<PricesPage />} />
          <Route path="/contacto" element={<ContactPage backendUrl={BackendURL} />} />
          <Route path="/auth" element={<AuthPage backendUrl={BackendURL} />} />
          <Route path="/reservar" element={<BookingPage backendUrl={BackendURL} />} />
          <Route path="/perfil" element={<ProfilePage backendUrl={BackendURL} />} />
          <Route path="/admin" element={<AdminPage backendUrl={BackendURL} />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default Layout
