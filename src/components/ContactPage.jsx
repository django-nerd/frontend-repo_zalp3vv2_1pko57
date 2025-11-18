import { Phone, MapPin, Clock, Mail } from 'lucide-react'

export default function ContactPage(){
  return (
    <div className="max-w-5xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10">
      <div>
        <h1 className="text-3xl font-semibold mb-6">Contacto</h1>
        <form onSubmit={(e)=> e.preventDefault()} className="space-y-4">
          <input className="w-full border border-black/10 rounded-md px-4 py-3" placeholder="Nombre" required />
          <input type="email" className="w-full border border-black/10 rounded-md px-4 py-3" placeholder="Email" required />
          <textarea className="w-full border border-black/10 rounded-md px-4 py-3 h-32" placeholder="Mensaje" required />
          <button className="bg-black text-white px-5 py-3 rounded-full">Enviar</button>
        </form>
        <div className="mt-10 space-y-3 text-sm text-neutral-700">
          <div className="flex items-center gap-2"><Phone size={16}/> +34 600 000 000</div>
          <div className="flex items-center gap-2"><Mail size={16}/> hola@ateliersalon.com</div>
          <div className="flex items-center gap-2"><Clock size={16}/> Lun-Sáb, 10:00 - 20:00</div>
          <div className="flex items-center gap-2"><MapPin size={16}/> Calle Principal 123, Madrid</div>
        </div>
      </div>
      <div>
        <div className="w-full h-[400px] rounded-xl overflow-hidden border border-black/10">
          <iframe title="Mapa" src="https://maps.google.com/maps?q=Puerta%20del%20Sol%2C%20Madrid&t=&z=13&ie=UTF8&iwloc=&output=embed" className="w-full h-full"/>
        </div>
      </div>
    </div>
  )
}
