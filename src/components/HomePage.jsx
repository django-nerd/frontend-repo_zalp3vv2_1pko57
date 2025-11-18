import { Link } from 'react-router-dom'
import { Calendar, ChevronRight, Star } from 'lucide-react'

const heroImg = 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=1600&auto=format&fit=crop'

export default function HomePage({ backendUrl }) {
  return (
    <div>
      {/* Hero */}
      <section className="relative">
        <img src={heroImg} alt="Salon" className="w-full h-[70vh] object-cover"/>
        <div className="absolute inset-0 bg-black/40"/>
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-6xl mx-auto px-6">
            <h1 className="text-white text-4xl md:text-6xl font-light tracking-tight mb-6">Tu estilo, nuestra pasión</h1>
            <p className="text-white/80 max-w-xl mb-8">Experiencia premium en peluquería y barbería con un enfoque minimalista y resultados impecables.</p>
            <Link to="/reservar" className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full hover:bg-neutral-200 transition">
              <Calendar size={18}/> Reservar cita
            </Link>
          </div>
        </div>
      </section>

      {/* Servicios destacados */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-semibold mb-8">Servicios destacados</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {title:'Corte de autor', desc:'Técnica precisa y personalizada.'},
            {title:'Coloración', desc:'Matices elegantes y naturales.'},
            {title:'Barbería', desc:'Afeitado tradicional y perfilado.'},
          ].map((s,i)=> (
            <div key={i} className="border border-black/10 rounded-xl p-6 hover:shadow-sm transition bg-white">
              <h3 className="font-medium mb-2">{s.title}</h3>
              <p className="text-sm text-neutral-600 mb-4">{s.desc}</p>
              <Link to="/reservar" className="inline-flex items-center gap-2 text-black/80 hover:text-black text-sm">Reservar <ChevronRight size={16}/></Link>
            </div>
          ))}
        </div>
      </section>

      {/* Sobre nosotros */}
      <section className="bg-neutral-50">
        <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Sobre nosotros</h2>
            <p className="text-neutral-700 mb-4">Somos un equipo de estilistas apasionados por la belleza minimalista y la excelencia técnica. Cuidamos cada detalle para que vivas una experiencia relajante y consigas un estilo que te represente.</p>
            <p className="text-neutral-700">Trabajamos con marcas de alta calidad y procesos sostenibles.</p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[1,2,3,4,5,6].map(i=> (
              <div key={i} className="aspect-square bg-white border border-black/10 rounded-lg"></div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-semibold mb-8">Testimonios</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {["Increíble atención y resultado perfecto.", "Detalles impecables, ambiente relajante.", "Mi peluquería de confianza."].map((t,i)=> (
            <div key={i} className="border border-black/10 rounded-xl p-6 bg-white">
              <div className="flex gap-1 mb-3">{[1,2,3,4,5].map(n=> <Star key={n} size={16} className="text-black" fill="black"/>)}</div>
              <p className="text-neutral-700">{t}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
